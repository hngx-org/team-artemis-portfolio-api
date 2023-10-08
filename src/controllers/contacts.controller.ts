import {Request, Response} from 'express';
import {connectionSource as dataSource} from '../database/data-source';
import { SocialUser } from '../database/entity/model';


//CREATES A NEW CONTACTS SECTION USING SOCIAL HANDLES
export const createContacts = async (req:Request, res:Response)=>{
     const {url, user_id, social_media_id} = req.body;
      const contactsRepo = dataSource.getRepository(SocialUser)
      const contact = contactsRepo.create({
       url,
       userId:user_id,
       socialMediaId : social_media_id
      })
     try{
        await  contactsRepo.save(contact);
        return   res.status(201).json({"message":"Contact created successfully"})
     }catch(err){
        console.log(err);
        return res.sendStatus(503)
     }
}



// GET ALL CONTACTS OF A USER USING THE USER ID as request parameter
export const getContacts = async (req:Request, res:Response)=>{
        const {user_id} = req.params;
      const contactsRepo = dataSource.getRepository(SocialUser)
     
     try{
              let contacts=await contactsRepo.find({where: {userId: String(user_id) }})
        return   res.status(200).json(contacts)
     }catch(err){   
        console.log(err);
        return    res.json({status:409, message:'OOps! an error occured' })
     }
}

