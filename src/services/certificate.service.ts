import { connectionSource } from '../database/data-source'
import { Section, User } from '../database/entities'
import { Certificate }  from '../database/entities/Certificate'
import { UpdateCertificateInterface } from '../interfaces/certification.interface'

const certificationRepository = connectionSource.getRepository(Certificate)
const userRepository = connectionSource.getRepository(User)
const sectionRepository = connectionSource.getRepository(Section)

export const updateACertificate = async (
   id: number,
   user_id: string,
   section_id: number,
   payload: UpdateCertificateInterface
) => {
   try {

      const user = await userRepository.findOne({ where: { id: user_id }})

      if(!user){
         return { successful: false, message: "User not found" };
      }

      let certificateToUpdate = await certificationRepository.findOne({
         where:{id, user: {id: user_id}}
      })

      if (!certificateToUpdate) {
         return { successful: false, message: "Certificate not found for this user" };
      }

      const section = await sectionRepository.findOne({ where: { id: section_id}});
      if(!section){
         return { successful: false, message: "Section not found" };
      }


      const {title, year, organization, url, description} = payload
      const { createdAt, updatedAt  } = certificateToUpdate
      if (!title || !year || !organization || !url || !description) {
         return { successful: false, message: "Missing required field" }
      }

      certificateToUpdate = {...payload, id, user, section, createdAt, updatedAt }
      await certificationRepository.save(certificateToUpdate);
      const data = await certificationRepository.find({ where : {id, user }})
      return { successful: true, data};
   } catch (error) {
      console.error('Error updating certificate', error.message)
      throw new Error('Error updating certificate')
   }
}

