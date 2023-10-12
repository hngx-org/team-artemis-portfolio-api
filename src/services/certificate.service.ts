import { connectionSource } from '../database/data-source'
import { Certificate } from '../database/entity/model'
import { UpdateCertificateInterface } from '../interfaces/certification.interface'

const certificationRepository = connectionSource.getRepository(Certificate)

export const updateACertificate = async (
   id: number,
   userId: string,
   payload: UpdateCertificateInterface
) => {
   try {
      let certificateToUpdate = await certificationRepository.findOne({
         where: {id, userId}
      })

      if (!certificateToUpdate) {
         return { successful: false, message: "Certificate not found for this user" };
      }

      const {title, year, organization, url, description} = payload
      const { created_at, user, section, sectionId } = certificateToUpdate
      if (!title || !year || !organization || !url || !description) {
         return { successful: false, message: "Missing required field" }
      }

      certificateToUpdate = {...payload, id, userId, created_at, section, user, sectionId}
      await certificationRepository.save(certificateToUpdate);
      const data = await certificationRepository.find({ where : {id, userId}})
      return { successful: true, data};
   } catch (error) {
      console.error('Error updating certificate', error.message)
      throw new Error('Error updating certificate')
   }
}

