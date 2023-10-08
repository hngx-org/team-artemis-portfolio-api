import { WorkExperienceDetail } from "../database/entity/model";
import { connectionSource } from "../database/data-source";

export const deleteWorkExperienceServise = async (id: number) => {
  const workExperienceRepository =
    connectionSource.getRepository(WorkExperienceDetail);

  const workExperienceToRemove = await workExperienceRepository.findOneBy({
    id: id,
  });

  if (!workExperienceToRemove) {
    throw new Error("Work Experience not found");
  }

  const deletedWorkExperience = await workExperienceRepository.remove(
    workExperienceToRemove
  );

  return deletedWorkExperience;
};
