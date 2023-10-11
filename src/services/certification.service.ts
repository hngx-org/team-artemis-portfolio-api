import { connectionSource } from '../database/data-source'
import { Certification } from '../database/entity/model'
import { CertificationInterface } from '../interfaces/cerification.interface'

export const updateACertification = async (
   id: number,
   userId: string,
   payload: CertificationInterface
) => {
   try {
      const certificationRepository = connectionSource.getRepository(Certification)

      let certificateToUpdate = await certificationRepository.findOne({
         where: {id, userId}
      })

      if (!certificateToUpdate) {
         return { successful: false, message: "Certification not found" };
      }

      const {title, year, organization, url, description} = payload
      if (!title || !year || !organization || !url || !description) {
         return { successful: false, message: "Missing required field" }
      }

      certificateToUpdate = {...payload, id, userId}
      await certificationRepository.save(certificateToUpdate);
      return { successful: true, message: "Certification updated successfully" };
   } catch (error) {
      console.error('Error updating Certification', error.message)
      throw new Error('Error updating Certification')
   }
}