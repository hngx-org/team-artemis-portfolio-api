import { connectionSource } from '../database/data-source'
import { CustomUserSection, CustomField } from '../database/entity/model'

export const deleteCustomSectionService = async (id: string) => {
   try {
      // Get the custom section repository
      const customSectionRepository =
         connectionSource.getRepository(CustomUserSection)

      // Delete custom section
      const customSection = customSectionRepository.delete(id)

      return customSection
   } catch (error) {
      console.error('Error creating portfolio section:', error.message)
      throw new Error('Error creating portfolio section')
   }
}

