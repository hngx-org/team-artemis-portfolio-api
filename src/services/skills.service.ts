import { Skill } from "../interfaces";
import { SkillsDetail } from "../database/entity/model";
import { connectionSource } from "../database/data-source";
export const createSkillsService = async (
  skillData: Skill[]
): Promise<{ successful: boolean; message: string }> => {
  const skillsDetailRepository = connectionSource.getRepository(SkillsDetail);
  const skills = [];

  for (const data of skillData) {
    const newSkill = skillsDetailRepository.create(data);
    skills.push(newSkill);
  }

  const savedskill = await skillsDetailRepository.save(skills);

  return { successful: true, message: "skills successfully saved" };
};


export const getSkillsService = async (userId: string
): Promise<Skill[]> => {
  const skillsDetailRepository = connectionSource.getRepository(SkillsDetail);

  const savedskilldetials = await skillsDetailRepository.find({where:{userId: userId}});

  return savedskilldetials;
};

