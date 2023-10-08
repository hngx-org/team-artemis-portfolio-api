import { Skill } from "../interfaces";
import { SkillsDetail } from "../entity/model";
import { AppDataSource } from "../data-source";

export const createSkillsService = async (
  skillData: Skill
): Promise<SkillsDetail> => {
  const skillsDetailRepository = AppDataSource.getRepository(SkillsDetail);
  const newSkill = skillsDetailRepository.create(skillData);

  return await skillsDetailRepository.save(newSkill);
};
