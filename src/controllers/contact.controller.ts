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
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Invalid input data" });
    }
    const contactsRepo = dataSource.getRepository(SocialMedia);
    const contact = new SocialMedia();
    contact.name = name;
    await contactsRepo.save(contact);
    return res
      .status(201)
      .json({ message: "Social Media type created successfully" });
  } catch (error) {
    console.error("Error creating contact:", error);
    return res.status(400).json({ message: "Invalid input data" });
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
    return res
      .status(200)
      .json({
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
  const { url, user_id, social_media_id }: Icontacts = req.body;
  const formattedId = Number(social_media_id);
  console.log(typeof formattedId === 'number')
  const isValid = schema.safeParse({
    url,
    user_id,
    social_media_id: formattedId,
  });
  console.log(isValid)
  
  try {
    const user = await userRepository.find({where:{id:user_id}});
    console.log(user.length)
    if(user.length < 1){
      return res.json({message:"user does not exist"})
    }
    if (isValid.success) {
      // check if request body details is a valid data
      await createContact(social_media_id, url, user_id);
      return res.status(201).json({ message: MESSAGES.CREATED });
    } else {
      return res.status(400).json({ message: MESSAGES.INVALID_INPUT });
    }
  } catch (error) {
    return res.status(500).json({ message:"invalid user or social media id"});
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
      return res.status(400).json({ message: MESSAGES.INVALID_INPUT });
    }
    const user = await userRepository.findOne({
      where: { id: user_id },
    });
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: MESSAGES.NOT_FOUND });
    }
    console.log(user_id)
    const contacts = await contactsRepo.find({
      where: { user_id },
    });
    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Error getting contacts:", error);
    return res.status(404).json({ message: MESSAGES.NOT_FOUND });
  }
};

//deleteContact controller
export const deleteContact = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const contact_id = parseInt(id);
    console.log(contact_id);
    // const userIdRegex = /^[A-Fa-f0-9\-]+$/
    const contacts = await contactsRepo.delete(contact_id);
    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Error getting contacts:", error);
    return res.status(404).json({ message: MESSAGES.NOT_FOUND });
  }
};

//update Contact controller
export const updateContactController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { socialMediaId, url, userId }: ContactBody = req.body;
    const socialId: number = Number(req.params.Id);

    const user = await findUser(userId);

    if (!user) {
      return res.status(404).json("user not found");
    }

    const contact = await updateContact(socialMediaId, url, socialId, userId);

    if (!contact) {
      return res.status(404).json("can not update contact");
    }

    return res.status(200).json({
      message: "new contact updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to update contact" });
  }
};
