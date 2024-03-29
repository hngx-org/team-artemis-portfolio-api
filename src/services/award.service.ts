import { connectionSource } from "../database/data-source";
import { Award, User, Section } from "../database/entities";
import { AwardData } from "../interfaces/";

// Service function to create an award
export const createAwardService = async (award: AwardData) => {
  try {
    const { section_id, user_id, title, year, presented_by, description, url } =
      award;

    const userRepository = connectionSource.getRepository(User);
    const sectionRepository = connectionSource.getRepository(Section);
    const awardRepository = connectionSource.getRepository(Award);

    const user = await userRepository.findOne({ where: { id: user_id } });
    const section = await sectionRepository.findOne({
      where: { id: section_id },
    });

    const newAward = awardRepository.create({
      user,
      section,
      title,
      year,
      presented_by,
      description,
      url,
    });
    const createdAward = await awardRepository.save(newAward);

    return createdAward;
  } catch (error) {
    throw new Error("Error creating award");
  }
};
