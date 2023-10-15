<<<<<<< HEAD
import { connectionSource } from '../database/data-source'
import { Award } from '../database/entities'
import { AwardData } from '../interfaces/'
=======
import { connectionSource } from "../database/data-source";
import { Award, User, Section } from "../database/entities";
import { AwardData } from "../interfaces/";
>>>>>>> 0c932f8cffc8479934ddf2bc3ac90f4ef2ad1490

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
      presentedBy: presented_by,
      description,
      url,
    });
    const createdAward = await awardRepository.save(newAward);

    return createdAward;
  } catch (error) {
    throw new Error("Error creating award");
  }
};
