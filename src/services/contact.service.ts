import { connectionSource } from "../database/data-source";
import { SocialUser } from "../database/entity/model";
import { User } from "../database/entity/user";
import { UpdateResult, DeleteResult } from "typeorm"; // Import TypeORM's Result types

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
      .where("id = :socialId", { id: socialId })
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
    throw new Error("Error updating contact: " + error.message);
  }
};

export const deleteContact = async (socialId: number, userId: string) => {
  const socialRepository = connectionSource.getRepository(SocialUser);

  const errorResponse = await checkResourceAndPermission(socialId, userId);
  if (errorResponse) {
    return errorResponse; // Return the error response
  }

  try {
    // Use delete method from TypeORM
    const deleteResult: DeleteResult = await socialRepository.delete(socialId);

    if (deleteResult.affected && deleteResult.affected >= 1) {
      return "Contact deleted successfully";
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Error deleting contact: " + error.message);
  }
};
