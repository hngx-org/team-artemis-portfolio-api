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

export const updateContact = async (
  socialMediaId: number,
  url: string,
  socialId: number,
  userId: string
) => {
  const socialRepository = connectionSource.getRepository(SocialUser);

  const errorResponse = await checkResourceAndPermission(socialId, userId);

  // Update the social contact
  try {
    const updateResult: UpdateResult = await socialRepository
      .createQueryBuilder()
      .update(SocialUser)
      .set({
        socialMediaId,
        url: url,
      })
      .where("id = :socialId", { socialId })
      .execute();

    if (updateResult.affected >= 1) {
      // Retrieve the updated social contact
      const updatedResult = await socialRepository.findOne({
        where: { id: socialId },
      });
      return updatedResult;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Error updating contact: " + error);
  }
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