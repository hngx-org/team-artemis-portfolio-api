import { connectionSource } from '../database/data-source'
import { Degree, EducationDetail, Section } from '../database/entity/model'
import { EducationDetailData } from '../interfaces'
import { User } from '../database/entity/user'

const createEducationDetail = async (data: EducationDetailData) => {
  try {
    const { userId, degreeId, sectionId } = data

    // Get the education detail repository
    const educationDetailRepository =
      connectionSource.getRepository(EducationDetail)

    // Check if the user exists
    const userRepository = connectionSource.getRepository(User)
    const sectionRepository = connectionSource.getRepository(Section)
    const degreeRepository = connectionSource.getRepository(Degree)
    const user = await userRepository.findOne({ where: { id: userId } })
    const section = await sectionRepository.findOne({
      where: { id: sectionId },
    })
    const degree = await degreeRepository.findOne({ where: { id: degreeId } })

    if (!user) {
      return 'User not found'
    }
    if (!section) {
      throw new Error('Section not found')
    }
    if (!degree) {
      throw new Error('Degree not found')
    }

    // Create a new education detail instance
    const educationDetail = educationDetailRepository.create(data)

    // Save the education detail to the database
    const createdEducationDetail = await educationDetailRepository.save(
      educationDetail
    )

    return createdEducationDetail
  } catch (error) {
    console.error('Error creating education detail:', error.message)
    throw new Error('Error creating education detail')
  }
}

export { createEducationDetail }
