import { updateContact, findUser } from '../services'
import { ContactBody } from '../interfaces'
import { Request, Response, RequestHandler, NextFunction } from 'express'
import { SocialUser } from '../database/entity/model'
import { SocialUserService, createContact } from '../services/contact.service'
import constant from '../constants/constant';
import {z} from 'zod';

// import { Request, Response } from 'express'
import { connectionSource as dataSource } from '../database/data-source'
import { SocialMedia } from '../database/entity/model'

const MESSAGES = constant.MESSAGES;
const contactsRepo = dataSource.getRepository(SocialUser)

const socialUserService = new SocialUserService()

export const createSocials = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    const contactsRepo = dataSource.getRepository(SocialMedia)
    const contact = contactsRepo.create({
      name,
    })
    await contactsRepo.save(contact)
    return res
      .status(201)
      .json({ message: 'Social Media type created successfully' })
  } catch (error) {
    console.error('Error creating contact:', error)
    return res.status(400).json({ message: 'Invalid input data' })
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
    const socialUserIdString = req.params.id
    const socialUserId = parseInt(socialUserIdString, 10)

    if (isNaN(socialUserId)) {
      return res.status(400).json({ message: 'Invalid socialUserId' })
    }

    await socialUserService.deleteContact(socialUserId)

    return res.status(200).json({ message: 'Contact deleted successfully' })
  } catch (error) {
    console.error('Error deleting contact:', error)

    if (error.message === 'Social User not found') {
      return res.status(404).json({ message: 'Social User not found' })
    }

    return res.status(500).json({ message: 'Internal server error' })
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
