import { v4 as uuidv4, validate as isUUID } from "uuid";
import { connectionSource } from "../database/data-source";
import { ReferenceDetail, Section, User } from "../database/entities";
import { IReference } from "../interfaces";
import { NotFoundError } from "../middlewares";

const referenceRepository = connectionSource.getRepository(ReferenceDetail);
const userRepository = connectionSource.getRepository(User);
const sectionRepository = connectionSource.getRepository(Section);

export const createReferenceService = async (
  user_id: string,
  section_id: number,
  payload: IReference
) => {
  try {
    if (!user_id) {
      throw new BadRequestError("User ID is required");
    }

    let user: User;

    if (isUUID(user_id)) {
      user = await userRepository.findOne({ where: { id: user_id } });
    } else {
      user = await userRepository.findOne({ where: { slug: user_id } });
    }

    if (!user) {
      const error = new NotFoundError("A user with this ID does not exist");
      throw error;
    }

    const section = await sectionRepository.findOne({
      where: { id: section_id },
    });

    if (!section) {
      // Create a CustomError with a 404 status code
      throw new NotFoundError(
        "Error creating reference detail: Section not found"
      );
    }

    const { referer, company, position, email, phoneNumber, sectionId } =
      payload;

    if (!referer || !company || !position || !email || !phoneNumber) {
      return { successful: false, message: "Missing required field" };
    }

    const ref = referenceRepository.create({
      referer,
      company,
      position,
      phone_number: phoneNumber,
      email,
      section,
      user,
    });

    await referenceRepository.save(ref);

    const mappedData = {
      user_id: ref.user.id,
      section_id: ref.section.id,
      referer: ref.referer,
      company: ref.company,
      position: ref.position,
      phone_number: ref.phone_number,
      email: ref.email,
      id: ref.id,
    };

    return {
      successful: true,
      data: mappedData,
      message: "Reference created successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllUserReferenceService = async (
  userId: string
): Promise<{ successful: boolean; data: any; message: string }> => {
  try {
    let user: User;

    if (isUUID(userId)) {
      user = await userRepository.findOne({
        where: { id: userId },
        relations: ["references"],
      });
    } else {
      user = await userRepository.findOne({
        where: { slug: userId },
        relations: ["references"],
      });
    }

    // let user = await userRepository.findOne({
    //   where: { id: userId },
    //   relations: ["references"],
    // });

    if (!user) {
      return { successful: false, message: "User not found", data: null }; // User not found.
    }

    return {
      data: user.references,
      successful: true,
      message: "user's references retrieved successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteReferenceDetailService = async (
  id: number
): Promise<{ successful: boolean; data: any; message: string }> => {
  try {
    if (isNaN(id) || id < 1) {
      throw new BadRequestError("Invalid ID Format");
    }

    // Find the existing reference detail by ID
    const referenceDetail = await referenceRepository.findOne({
      where: { id },
    });

    if (!referenceDetail) {
      throw new NotFoundError("Reference detail not found");
    }

    await referenceRepository.remove(referenceDetail);

    return {
      data: null,
      successful: true,
      message: "user's references deleted successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateReferenced = async (id, data) => {
  await referenceRepository.update({ id }, data);
  let d = await referenceRepository.findOne({ where: { id } });
  return d;
};
