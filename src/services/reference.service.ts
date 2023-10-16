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

    const user = await userRepository.findOne({ where: { id: user_id } });

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
