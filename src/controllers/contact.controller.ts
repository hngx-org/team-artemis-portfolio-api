import { updateContact, findUser } from '../services'
import { ContactBody } from '../interfaces'
import { Request, Response, RequestHandler, NextFunction } from 'express'
import { SocialUser } from '../database/entity/model'
import { createContact,deleteContactService } from '../services/contact.service'
import constant from '../constants/constant';
import {z} from 'zod';

// import { Request, Response } from 'express'
import { connectionSource as dataSource } from '../database/data-source'
import { SocialMedia } from '../database/entity/model'

const MESSAGES = constant.MESSAGES;
const contactsRepo = dataSource.getRepository(SocialUser)


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

// Protected endpoint!!! only user with admin privilegdes  can access this.
export const createSocials = async (req: Request, res: Response) => {
  try {
    const createSocialsSchema = z.object({
  name: z.string().min(1).max(50),
  }); 
    const validatedData = createSocialsSchema.parse(req.body);
    const { name } = validatedData;

    const contactsRepo = dataSource.getRepository(SocialMedia);
    const contact = contactsRepo.create({
      name
        
    });
    await contactsRepo.save(contact);
    return res.status(201).json({ message: "Social Media type created successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return res.status(400).json({ message: "Invalid input data", errors: fieldErrors });
    } else {
      console.error("Error creating contact:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  };
//delete Contact controller
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
// update Contact controller
export const updateContactController = async (req: Request, res: Response) => {
  const updateContactSchema = z.object({
    url: z.string().nonempty(),
    socialMediaId: z.number().int(),
    userId: z.string().nonempty(),
  });
 
  const id = parseInt(req.params.id);
  const { url, socialMediaId, userId } = req.body;
  console.log(id)
  if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
    return res.status(404).json("contact_Id invalid");
  }
   try {
    updateContactSchema.parse({ url, socialMediaId, userId });
  
    const updatedContact = await updateContact(id, { url, socialMediaId }, userId);
   res.json({
  message: 'Contact updated successfully',
  contact: {
    url: updatedContact.url,
    socialMediaId: updatedContact.socialMediaId,
  }
});
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(', ');
      return res.status(400).json({ error: errorMessage });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};