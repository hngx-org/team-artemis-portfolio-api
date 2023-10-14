import { connectionSource } from "../database/data-source";
import { CustomField, CustomUserSection } from "../database/entity/model";
import { ICustomSection } from "../interfaces";

export const deleteCustomSectionService = async (
  customSectionId: any,
  userId: any
): Promise<{ successful: boolean; message: string }> => {
  try {
    const customSectionRepository =
      connectionSource.getRepository(CustomUserSection);
    
      const customFieldRepository = connectionSource.getRepository(CustomField);


      const customFieldToBeDeleted =await customFieldRepository.find({where: {
        customUserSectionId: customSectionId     }})

      if (customFieldToBeDeleted) {
        await customFieldRepository.remove(customFieldToBeDeleted);
      }

    const sectionToBeDeleted = await customSectionRepository.findOne({
      where: { id: customSectionId, userId: userId },
    });

    if (!sectionToBeDeleted) {
      return {
        successful: false,
        message: "Custom Section not found for this user",
      };
    }

    await customSectionRepository.remove(sectionToBeDeleted);

    return {
      successful: true,
      message: "Custom Section deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting Custom Section:", error.message);
    throw new Error("Error deleting Custom Section");
  }
};
