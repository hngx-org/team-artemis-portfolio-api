import { updateContact, findUser } from '../services'
import { ContactBody } from '../interfaces'
import { Request, Response, RequestHandler, NextFunction } from 'express'
import { SocialUser } from '../database/entity/model'
import { deleteContactService, createContact } from '../services/contact.service'
import constant from '../constants/constant';
import {z} from 'zod';

// import { Request, Response } from 'express'
import { connectionSource as dataSource } from '../database/data-source'
import { SocialMedia } from '../database/entity/model'

const MESSAGES = constant.MESSAGES;
const contactsRepo = dataSource.getRepository(SocialUser)

import {
  CustomError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  MethodNotAllowedError,
} from "../middlewares";



// Protected endpoint!!! only user with admin privilegdes  can access this.
export const createSocials = async (req: Request, res: Response) => {
  const createSocialsSchema = z.object({
  name: z.string().min(1).max(50),
  });

  try {
    const validatedData = createSocialsSchema.parse(req.body);
    const { name } = validatedData;

    if (!name) {
      throw new BadRequestError("Social media name is required");
    }
     const response = {
      message: 'Social Media type created successfully',
      status: "success",
      statusCode: 201,
    };
       return res
      .status(201)
      .json(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
        
      return res.status(400).json({ message: "Invalid input data", errors: fieldErrors });
    }
    else {
      console.error("Error creating contact:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    }
}



// creates new contacts socials
export const createContacts = async (req: Request, res: Response, next:NextFunction) => {
  interface Icontacts {
   url: string,
   user_id: string,
   social_media_id:number|number
  }
  const schema= z.object({url: z.string(),user_id: z.string().uuid(),social_media_id:z.number()})
  const { url, user_id, social_media_id }:Icontacts = req.body;
  const formattedId = Number(social_media_id);
   const isValid = schema.safeParse({url,user_id,social_media_id:formattedId})
   console.log(isValid)
  try {
    if(isValid.success){// check if request body details is a valid data
      await createContact(social_media_id, url, user_id);
      return res.status(201).json({ message:MESSAGES.CREATED });

    }else{
      return res.status(400).json({ message: MESSAGES.INVALID_INPUT })
    }
  } catch (error) {
    console.error("Error creating contact:", error);
    next(error)
  }
};



//gets all contact socials controller
export const getContacts = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params
    const schema = z.object({user_id:z.string().uuid()})
    const parsedUserId = schema.safeParse({user_id})
    console.log(parsedUserId)
   // const userIdRegex = /^[A-Fa-f0-9\-]+$/
    if ( !parsedUserId.success) {
      console.log('in')
      return res.status(400).json({ message: MESSAGES.INVALID_INPUT })
    }

    const contacts = await contactsRepo.find({
      where: { userId: String(user_id) },
    })
    console.log(contacts)
    return res.status(200).json(contacts)
  } catch (error) {
    console.error('Error getting contacts:', error)
    return res.status(404).json({ message: MESSAGES.NOT_FOUND })
  }
}


//deleteContact controller
export const deleteContact = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
   
    if (isNaN(id) || !id) {
      throw new BadRequestError("Social user id is required or invalid");
    }
      await deleteContactService(id);
      return res.status(200).json({ message: 'Contact deleted successfully' });
    }
   catch (error) {
    if (error.message.includes("SocialUser with ID")) {
      return res.status(404).json({ message: error.message });
    }

    // Handle other errors, including those from the service
    console.error("Error deleting contact: " + error.message);
    return res.status(500).json({ message: 'Internal server error' });
         
  }
}
  //update Contact controller
  export const updateContactController: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { socialMediaId, url, userId }: ContactBody = req.body
      const socialId: number = Number(req.params.Id)

      const user = await findUser(userId)

      if (!user) {
        return res.status(404).json('user not found')
      }

      const contact = await updateContact(socialMediaId, url, socialId, userId)

      if (!contact) {
        return res.status(404).json('can not update contact')
      }

      return res.status(200).json({
        message: 'new contact updated',
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json('internal server error')
    }
  }
