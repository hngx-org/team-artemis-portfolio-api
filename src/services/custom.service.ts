import { connectionSource } from '../database/data-source'
import { CustomUserSection } from '../database/entity/model'

export const deleteCustomSectionService = async (
   id: any
   ): Promise<{ successful: boolean; message: string }> => {
   try {
      const customSectionRepository = connectionSource.getRepository(CustomUserSection)
      const sectionToBeDeleted = await customSectionRepository.findOne({ where: { id }})

      if (!sectionToBeDeleted) {
         return { successful: false, message: "Custom Section not found" };
      }
      
      await customSectionRepository.remove(sectionToBeDeleted);

      return { successful: true, message: "Custom Section deleted successfully." };
   } catch (error) {
      console.error('Error deleting Custom Section:', error.message)
      throw new Error('Error deleting Custom Section')
   }
}

