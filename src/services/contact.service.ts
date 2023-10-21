import { resolve } from "path";
import { connectionSource } from "../database/data-source";
import { SocialUser, SocialMedia, User } from "../database/entities";
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
    where: { Id: socialId },
  });

  if (!findSocial) {
    throw new Error("Resource not found");
  }


  if (findSocial.user !== await findUser(userId)) {
    throw new Error(
      "Unauthorized access: You do not have permission to access this social contact."
    );
  }

  return findSocial; // Return null when there are no errors
};

export const updateContact = async (
  id: number,
  updatedData: { url?: string; socialMediaId?: number },
  userId: string
) => {
  const contactsRepo = connectionSource.getRepository(SocialUser);

  // Check if the contact with the given ID exists and belongs to the user
  const existingContact = await contactsRepo.findOne({
    where: { Id: id, user_id: userId },
  });

  if (!existingContact) {
    throw new Error('Contact not found or does not belong to the user.');
  }
  try {
    if (updatedData.url) {
      existingContact.url = updatedData.url;
    }
    if (updatedData.socialMediaId) {
      existingContact.socialMedia.Id = updatedData.socialMediaId;
    }
    const updatedContact = await contactsRepo.save(existingContact);
    return updatedContact;
  } catch (error) {
    throw new Error('Error updating contact: ' + error.message);
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
    const contact = contactsRepo.save({
      url,
      user: { id: userId },
      socialMedia: { Id: socialMediaId }

    });
    const promise = new Promise(async (resolve, reject) => {
      try {
        const data = await contactsRepo.findOne({ where: { Id: (await contact).Id } })
        console.log(data)
        resolve(data)
      } catch (err) {
        console.log(err)
        reject('failed to save')
      }
    })

    return promise;

  } catch (error) {
    throw new Error("Error creating contact: " + error);
  }
};

export class SocialUserService {
  async deleteContact(socialUserId: number) {
    const socialUserRepository = connectionSource.getRepository(SocialUser);
    const socialMediaRepository = connectionSource.getRepository(SocialMedia);

    console.log(typeof socialUserId);

    const socialUser = await socialUserRepository.findOne({
      where: { Id: socialUserId },
    });

    if (!socialUser) {
      throw new Error("Social User not found");
    }

    const socialMedia = socialUser.socialMedia;
    console.log(socialMedia);

    await socialUserRepository.remove(socialUser);

    const usersCount = await socialMediaRepository.count({
      where: { Id: socialMedia.Id },
    });

    if (usersCount === 0) {
      //await socialMediaRepository.remove({ where : { socialMedia } });
    }
  }
}
