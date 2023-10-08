import { connectionSource } from "../database/data-source";
import { SocialUser } from "../database/entity/model";
import { error } from "../utils/response.util";
import { User } from "../database/entity/user";

export const findUser = async (userId: string) => {
  const userRepository = connectionSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: userId },
  });

  return user;
};

// Check if the resource exists and the user has permission
const checkResourceAndPermission = async (socialId: number, userId: string) => {
  const socialRepository = connectionSource.getRepository(SocialUser);
  const findSocial = await socialRepository.findOne({
    where: { id: socialId },
  });

  if (!findSocial) {
    return error({
      message: "Resource not found",
      statusCode: 404, // Use 404 for "Resource not found" errors
    });
  }

  if (findSocial.userId !== userId) {
    return error({
      message:
        "Unauthorized access: You do not have permission to access this social contact.",
      statusCode: 403, // 403 for unauthorized access
    });
  }

  return findSocial; // Return the found social contact for further processing
};

export const updateContact = async (
  socialMediaId: number,
  url: string,
  socialId: number,
  userId: string
) => {
  const socialRepository = connectionSource.getRepository(SocialUser);

  const findSocial = await checkResourceAndPermission(socialId, userId);

  // Return the error response
  if (findSocial.statusCode) {
    return findSocial; // Return the error response
  }

  // Update the social contact
  const updateSocial = await socialRepository
    .createQueryBuilder()
    .update(SocialUser)
    .set({
      socialMediaId,
      url: url,
    })
    .where("id = : socialId", { id: socialId })
    .execute();
  if (updateSocial.affected >= 1) {
    // Retrieve the updated social contact
    const updatedResult = await socialRepository.findOne({
      where: { id: socialId },
    });
    return updatedResult;
  } else {
    return null;
  }
};

export const deleteContact = async (socialId: number, userId: string) => {
  const socialRepository = connectionSource.getRepository(SocialUser);
  const findSocial = await checkResourceAndPermission(socialId, userId);

  // Return the error response
  if (findSocial.statusCode) {
    return findSocial; // Return the error response
  }

  const deleteContact = await socialRepository.delete(socialId);

  return deleteContact;
};
