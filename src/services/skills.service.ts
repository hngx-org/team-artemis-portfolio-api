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
    const skillexist = await skillsDetailRepository.find({
      where: { skills: data.skills },
    });

    if (skillexist.length == 0) {
      skills.push(newSkill);
    }
  }
  const savedskill = await skillsDetailRepository.save(skills);

  return { successful: true, message: "skills successfully saved" };
};
export const getSkillsService = async (userId: string): Promise<Skill[]> => {
  const skillsDetailRepository = connectionSource.getRepository(SkillsDetail);

  const savedskilldetials = await skillsDetailRepository.find({
    where: { userId: userId },
  });

  return savedskilldetials;
};

export const updateSkillsService = async (
  skillId: number,
  updatedSkillData: Partial<Skill>
): Promise<{ successful: boolean; message: string }> => {
  try {
    const skillsDetailRepository = connectionSource.getRepository(SkillsDetail);
    const skillToUpdate = await skillsDetailRepository.findOne({
      where: { id: skillId },
    });
    if (!skillToUpdate) {
      return { successful: false, message: "skill not found" };
    }
    if (updatedSkillData.skills) {
      skillToUpdate.skills = updatedSkillData.skills;
    }
    if (updatedSkillData.sectionId) {
      skillToUpdate.sectionId = updatedSkillData.sectionId;
    }
    if (updatedSkillData.userId) {
      skillToUpdate.userId = updatedSkillData.userId;
    }
    await skillsDetailRepository.save(skillToUpdate);
    return { successful: true, message: "skill updated successfully" };
  } catch (error) {
    console.error("Error updating skill:", error);
    return { successful: false, message: "Failed to update skill" };
  }
};

export const deleteSkillsService = async (
  skillId: number
): Promise<{ successful: boolean; message: string }> => {
  try {
    const skillsDetailRepository = connectionSource.getRepository(SkillsDetail);
    const skillToDelete = await skillsDetailRepository.findOne({
      where: { id: skillId },
    });

    if (!skillToDelete) {
      return { successful: false, message: "Skill not found" };
    }
    await skillsDetailRepository.remove(skillToDelete);

    return { successful: true, message: "Skill deleted successfully" };
  } catch (error) {
    console.error("Error deleting skill:", error);
    return { successful: false, message: "Failed to delete skill" };
  }
};
