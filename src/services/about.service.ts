import { AboutDetail, User, Section } from "../database/entities";
import { connectionSource } from "../database/data-source";
import { NotFoundError, BadRequestError } from "../middlewares";

const aboutRepository = connectionSource.getRepository(AboutDetail);
const userRepository = connectionSource.getRepository(User);
const sectionRepository = connectionSource.getRepository(Section);

export const createAboutService = async (
  userId: string,
  section_id: number,
  bio: string
) => {
  try {
    if (!userId) {
      throw new BadRequestError("User id is required");
    }
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundError("User not found");
    }
    const section = await sectionRepository.findOne({
      where: { id: section_id },
    });

    if (!section) {
      throw new NotFoundError("Section not found");
    }

    const existingAbout = await aboutRepository.findOne({
      where: { user: { id: userId } },
    });

    if (existingAbout) {
      throw new BadRequestError("About details already exist for this user");
    }

    let createdAbout: AboutDetail;
    createdAbout = await aboutRepository.save({
      bio: bio,
      section: section,
      user: user,
    });

    const mappedData = {
      user_id: createdAbout.user.id,
      section_id: createdAbout.section.id,
      bio: createdAbout.bio,
      id: createdAbout.id,
    };

    return mappedData;
  } catch (error) {
    console.log("final", error);
    throw error;
  }
};

export const updateAboutService = async (
  id: number,
  section_id: number,
  bio: string
) => {
  try {
    const section = await sectionRepository.findOne({
      where: { id: section_id },
    });

    if (!section) {
      throw new NotFoundError("Section not found");
    }

    const existingAbout = await aboutRepository.findOne({
      where: { id: id },
    });

    if (!existingAbout) {
      throw new NotFoundError("About details not found");
    } else {
      // If existing about details found, update it

      existingAbout.bio = bio;
      existingAbout.section = section;
    }

    console.log("Saving updated about...");
    const updatedAbout = await aboutRepository.save(existingAbout);

    console.log("Fetching updated about detail...");
    const aboutDetail = await aboutRepository.findOne({ where: { id: id } });
    console.log("Almost done");

    return aboutDetail;
  } catch (error) {
    console.log("final", error);
    throw error;
  }
};

export const getAboutByIdService = async (userId: string) => {
  try {
    const about = await aboutRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!about) {
      throw new NotFoundError(`Cannot find about details for the id ${userId}`);
    }
    return about;
  } catch (error) {
    throw error;
  }
};

export const deleteAboutService = async (id: number) => {
  try {
    const about = await aboutRepository.findOne({ where: { id: id } });

    if (!about) {
      throw new NotFoundError(`Cannot find about details for the id ${id}`);
    }
    await aboutRepository.remove(about);
  } catch (error) {
    throw error;
  }
};
