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
    where: { id: socialId },
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
        socialMedia: {
          Id: socialMediaId,
        },
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
    const contact = contactsRepo.save({
      url,
      user: { id: userId },
      socialMedia: {Id: socialMediaId}

    });
    const promise = new Promise(async (resolve, reject) => {
      try {
        const data = await contactsRepo.findOneBy({ Id: (await contact).Id })
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
      where: { id: socialUserId },
    });

    if (!socialUser) {
      throw new Error("Social User not found");
    }

    const socialMedia = socialUser.socialMedia;
    console.log(socialMedia);

    await socialUserRepository.remove(socialUser);

    const usersCount = await socialMediaRepository.count({
      where: { id: socialMedia.id },
    });

    if (usersCount === 0) {
      //await socialMediaRepository.remove({ where : { socialMedia } });
    }
  }
}
