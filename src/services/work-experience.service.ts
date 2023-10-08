import { WorkExperienceDetail } from "../entity/model";
import { AppDataSource } from "../data-source";

export const deleteWorkExperienceServise = async (id: number) => {
  const workExperienceRepository =
    AppDataSource.getRepository(WorkExperienceDetail);

  const workExperienceToRemove = await workExperienceRepository.findOneBy({
    id: id,
  });

  if (!workExperienceToRemove) {
    throw new Error("Work Experience not found");
  }

  await workExperienceRepository.remove(workExperienceToRemove);
};
