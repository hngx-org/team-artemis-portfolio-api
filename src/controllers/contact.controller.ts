import { updateContact, findUser } from "../services";
import { ContactBody } from "../interfaces";
import { Request, Response, RequestHandler, NextFunction } from "express";
import { SocialUserService, createContact } from "../services/contact.service";
import constant from "../constants/constant";
import { z } from "zod";
// import { Request, Response } from 'express'
import { connectionSource as dataSource } from "../database/data-source";
import { SocialMedia, SocialUser, User } from "../database/entities";
import { parse } from "path";

const MESSAGES = constant.MESSAGES;
const contactsRepo = dataSource.getRepository(SocialUser);
const userRepository = dataSource.getRepository(User);
const socialUserService = new SocialUserService();

export const createSocials = async (req: Request, res: Response) => {
  const createSocialsSchema = z.object({
    name: z
      .string()
      .min(1)
      .max(50)
      .refine((name) => {
        const forbiddenChars = ['*', '?', '+', '-', '_',
          '<', '>', '!', ',', '.', '[', ']', ';', '=', '|',
          '&', '#', '(', ')', '\'', '\n', '\r', '\t', '\b',
          '\f', '\v'];
        return !forbiddenChars.some(char => name.includes(char));
      }, {
        message: 'Forbidden characters are not allowed in the name field',
      })
      .refine((name) => !name.includes('*'), {
        message: 'Asterisk (*) is not allowed in the name field',
      })
      .refine((name) => !/\d/.test(name), {
        message: 'Numbers are not allowed in the name field',
      })
      .refine((name) => !name.includes('?'), {
        message: 'Question mark (?) is not allowed in the name field',
      }),
  });

  try {
    const validatedData = createSocialsSchema.parse(req.body);
    const { name } = validatedData;

    const contactsRepo = dataSource.getRepository(SocialMedia);
    const contact = contactsRepo.create({
      name,
    });
    await contactsRepo.save(contact);

    const response = {
      message: 'Social Media type created successfully',
      status: 'success',
      statusCode: 201,
    };
    return res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.map((err) => ({
        message: err.message,
      }));

      return res.status(400).json({ error: fieldErrors });
    } else {
      console.error('Error creating contact:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};
// get all social media types
export const getSocials = async (req: Request, res: Response) => {
  try {
    const socialsRepo = dataSource.getRepository(SocialMedia);


    const data = await socialsRepo.find();
    const response = {
      status: "success",
      statusCode: 200,
      data: data,
    };
    if (response.data.length > 0) {
      return res.status(200).json(response);
    }
    return res.status(200).json({
      statusCode: 200,
      status: "No social media type found",
      data: [],
    });
  } catch (error) {
    return res.status(500).json({ message: "Oops something happened" });
  }
};

// creates new contacts socials
export const createContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  interface Icontacts {
    url: string;
    user_id: string;
    social_media_id: number | number;
  }
  const schema = z.object({
    url: z.string(),
    user_id: z.string().uuid(),
    social_media_id: z.number(),
  });
  let { url, user_id, social_media_id }: Icontacts = req.body;

  url = url.trim().toLocaleLowerCase(); //convert to lowercae
  user_id = user_id.trim().toLocaleLowerCase(); //convert to lowercase and trim

  const formattedId = Number(social_media_id); // convert social media id to number

  const isValid = schema.safeParse({
    url,
    user_id,
    social_media_id: formattedId,
  }); // checks if parse data is valid

  const socialsRepo = dataSource.getRepository(SocialMedia);

  try {
    let social = await socialsRepo.find({ where: { id: social_media_id } });
    console.log(social);

    if (social.length < 1) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "BadRequest Error",
        message: "Social media Id does not exist",
      });
    }

    if (!url.includes(social[0].name.toLocaleLowerCase()) && social[0].name.toLocaleLowerCase() !== 'other') {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "BadRequest Error",
        message: "Social media Id does not match provided social link. please provide correct link",
      });
    }

    // check if social url is valid url
    let urlArr;
    let validStart = true;
    let validEnd = true;
    let validname = true;
    let validend = true;

    if (social[0].name.toLocaleLowerCase() !== 'other') {
      urlArr = url.split(social[0].name.toLocaleLowerCase()); //facebook.com
      validStart =
        urlArr[0].endsWith("ttp://") ||
        urlArr[0].endsWith("ttps://") ||
        urlArr[0].endsWith("www.");

      validEnd = urlArr[1].startsWith(".");

      validname = url
        .toLocaleLowerCase()
        .includes(social[0].name.toLocaleLowerCase());
      validend =
        url.includes(".com") ||
        url.includes(".net") ||
        url.includes(".ng") ||
        url.includes(".uk") ||
        url.includes(".app");
    }
    let validprotocol =
      url.startsWith("https://") ||
      url.startsWith("http://") ||
      url.toLocaleLowerCase().startsWith("www.");
    let invalidChar =
      url.includes("*") || url.includes("+") || url.includes(",");

    if (
      validStart === false ||
      validEnd === false ||
      validname === false ||
      validend === false ||
      validprotocol === false ||
      invalidChar
    ) {
      // checks if social url is valid
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: "BadRequest Error",
        message: "invalid url please provide valid url link",
      });
    }

    if (isValid.success) {
      const user = await userRepository.find({ where: { id: user_id } });
      console.log(user.length);
      if (user.length < 1) {
        return res.status(404).json({
          statusCode: 404,
          success: false,
          error: "not found error",
          message: "user does not exist",
        });
      }
      const contact = await contactsRepo.find({ where: { user_id, url } });
      if (contact.length > 0) {
        return res.status(409).json({
          success: false,
          statusCode: 409,
          message: "contact already exists",
        });
      }
      // check if request body details is a valid data
      await createContact(social_media_id, url, user_id);
      return res
        .status(201)
        .json({ statusCode: 201, success: true, message: MESSAGES.CREATED });
    } else {
      return res.status(400).json({
        statusCode: 400,
        error: "Bad Request Error",
        success: false,
        message: " User id is not valid",
      });
    }
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({
        statusCode: 500,
        error: "Internal server Error",
        message: " error creating contacts",
      });
  }
};

//gets all contact socials controller
export const getContacts = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const schema = z.object({ user_id: z.string().uuid() });
    const parsedUserId = schema.safeParse({ user_id });
    // const userIdRegex = /^[A-Fa-f0-9\-]+$/
    if (!parsedUserId.success) {
      return res
        .status(400)
        .json({ statusCode: 400, success: false, message: "invalid User Id" });
    }
    const user = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      return res
        .status(404)
        .json({ statusCode: 404, success: false, message: "No such user" });
    }
    console.log(user.email);
    const contacts = await contactsRepo.find({
      where: { user_id }, relations: ['socialMedia']
    });
    return res.status(200).json({
      success: true,
      statusCode: 200,
      payload: [{ email: user.email }, ...contacts],
    });
  } catch (error) {
    console.error("Error getting contacts:", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: "could not fetch contacts" });
  }
};

//deleteContact controller
export const deleteContact = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const contact_id = parseInt(id);
    if (isNaN(contact_id) || contact_id <= 0) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    console.log(contact_id);
    // const userIdRegex = /^[A-Fa-f0-9\-]+$/
    const result = await contactsRepo.delete(contact_id);
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    return res.status(204).json({ message: `Contact with ID ${contact_id} deleted successfully` });
  } catch (error) {
    console.error("Error getting contacts:", error);
    return res.status(404).json({ message: MESSAGES.NOT_FOUND });
  }
};

//update Contact controller
export const updateContactController = async (req: Request, res: Response) => {
  const updateContactSchema = z.object({
    url: z.string().min(1),
    socialMediaId: z.number(),
    userId: z.string().min(1),
  });

  const { url, socialMediaId, userId } = req.body;

  try {
    const formattedId = parseInt(socialMediaId);
    if (isNaN(formattedId) || formattedId <= 0 || !Number.isInteger(formattedId)) {
      return res.status(404).json({
        success: false,
        statusCode: 400,
        error: "BadRequest Error",
        message: "socialMediaId is invalid"
      });
    }

    const isValid = updateContactSchema.safeParse({
      url,
      userId,
      socialMediaId: formattedId,
    });
    const socialsRepo = dataSource.getRepository(SocialMedia);

    try {
      let social = await socialsRepo.find({ where: { id: socialMediaId } });
      console.log(social);

      if (social.length < 1) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          error: "BadRequest Error",
          message: "Social media Id does not exist",
        });
      }
      console.log(!url.includes(social[0].name.toLocaleLowerCase()))
      if (!url.includes(social[0].name.toLocaleLowerCase())) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          error: "BadRequest Error",
          message: "Social media Id does not match provided social link. please provide correct link",
        });
      }

      if (isValid.success) {
        const Id = parseInt(req.params.id);
        if (isNaN(Id) || Id <= 0 || !Number.isInteger(Id)) {
          return res.status(404).json({
            success: false,
            statusCode: 400,
            error: "Bad Request Error",
            message: "contact_Id is invalid"
          });
        }

        const updatedContact = await updateContact(Id, { url, socialMediaId: formattedId }, userId);

        res.status(200).json({
          success: true,
          statusCode: 200,
          url: updatedContact.url,
          socialMediaId: updatedContact.socialMedia,
        });
      } else {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          error: "Bad Request Error",
          message: "Invalid input",
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(', ');
        return res.status(400).json({
          success: false,
          statusCode: 400,
          error: "Bad Request Error",
          message: errorMessage
        });
      }

    }
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      error: "Internal Server Error",
      message: error.message
    });
  }
};
