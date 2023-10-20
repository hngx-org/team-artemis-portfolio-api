import { Skill } from "../interfaces";
import { SkillsDetail, Section, User } from "../database/entities";
import { connectionSource } from "../database/data-source";

const skillsDetailRepository = connectionSource.getRepository(SkillsDetail);
const sectionRepository = connectionSource.getRepository(Section);
const userRepository = connectionSource.getRepository(User);

export const createSkillsService = async (
  skillData: Skill[]
): Promise<{ successful: boolean; message: string }> => {
  try {
    const newSkills = [];
    for (const data of skillData) {
      const { skills, sectionId, userId } = data;

      const section = await sectionRepository.findOneBy({ id: sectionId });
      const user = await userRepository.findOneBy({ id: userId });

      if (!section || !user) {
        return { successful: false, message: "section or user not found" };
      }

      const skillsDetailData = new SkillsDetail();
      skillsDetailData.skills = skills;
      skillsDetailData.section = section;
      skillsDetailData.user = user;

      newSkills.push(skillsDetailData);
    }

    await skillsDetailRepository.save(newSkills);

    return { successful: true, message: "skills successfully saved" };
  } catch (error) {
    console.error("Error creating skills:", error);
    return { successful: false, message: "Failed to create skills" };
  }
};
export const getSkillsService = async (userId: string
) => {
  const user = await userRepository.findOneBy({ id: userId });
  const savedskilldetails = await skillsDetailRepository.find({where:{ user: {id: user.id} }});

  return savedskilldetails;
};


export const updateSkillsService = async (
  skillId: number,
  updatedSkillData: Partial<Skill>
): Promise<{ successful: boolean; message: string }> => {
  try {
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
      skillToUpdate.section = await sectionRepository.findOneBy({ id: updatedSkillData.sectionId });
    }
    if (updatedSkillData.userId) {
      skillToUpdate.user = await userRepository.findOneBy({ id: updatedSkillData.userId });
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
    const skillToDelete = await skillsDetailRepository.findOne({ where: { id: skillId } });

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
