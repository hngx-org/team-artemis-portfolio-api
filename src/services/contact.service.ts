import { resolve } from "path";
import { connectionSource } from "../database/data-source";
import { SocialUser, SocialMedia } from "../database/entity/model";
import { User } from "../database/entity/user";
import { UpdateResult } from "typeorm"; // Import TypeORM's Result types

export const findUser = async (userId: string) => {
  const userRepository = connectionSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: userId },
  });

  return user;
};

const checkResourceAndPermission = async (socialId: number, userId: string) => {
  const socialRepository = connectionSource.getRepository(SocialUser);
  const findSocial = await socialRepository.findOne({
    where: { id: socialId },
  });

  if (!findSocial) {
    throw new Error("Resource not found");
  }

  if (findSocial.userId !== userId) {
    throw new Error(
      "Unauthorized access: You do not have permission to access this social contact."
    );
  }

  return findSocial; // Return null when there are no errors
};

// create contacts socials
export const createContact = async (
  socialMediaId: number,
  url: string,
  userId: string
) => {
  const socialRepository = connectionSource.getRepository(SocialUser);

  //const errorResponse = await checkResourceAndPermission(socialId, userId);

  // create the social contact
  try {
    const contactsRepo = connectionSource.getRepository(SocialUser);
    const contact = contactsRepo.create({
      url,
      userId: userId,
      socialMediaId: socialMediaId
      
    });
    const promise = new Promise(async (resolve, reject)=>{
      try{
        const data = await contactsRepo.save(contact)
        console.log(data)
        resolve(data)
      }catch(err){
        reject('failed to save')
      }
    })

      return promise;
    
  } catch (error) {
    throw new Error("Error creating contact: " + error);
  }
};

export const deleteContactService = async (
  id: number
) => {
  try {
    const socialUserRepo = connectionSource.getRepository(SocialUser);
    const contactToDelete = await socialUserRepo.findOne({ where: { id: id } });
    if (contactToDelete === null || contactToDelete === undefined) {
      const error = new Error(`SocialUser with ID ${id} not found`);
      return Promise.reject(error);
    }
  await socialUserRepo.remove(contactToDelete);
  } catch (error) {
    console.error("Error deleting skill: "+ error.message);
  }
}

export const updateContact = async (
  id: number,
  updatedData: { url?: string; socialMediaId?: number },
  userId: string 
) => {
  const contactsRepo = connectionSource.getRepository(SocialUser);
  const existingContact = await contactsRepo.findOne({
    where: { id: id, userId:userId },
  });

  if (!existingContact) {
    throw new Error('Contact not found or does not belong to the user.');
  }
  try {
    if (updatedData.url) {
      existingContact.url = updatedData.url;
    }

    if (updatedData.socialMediaId) {
      existingContact.socialMediaId = updatedData.socialMediaId;
    }
    const updatedContact = await contactsRepo.save(existingContact);
    console.log('Contact updated:', updatedContact);
    return updatedContact;
  } catch (error) {
    throw new Error('Error updating contact: ' + error);
  }
};
