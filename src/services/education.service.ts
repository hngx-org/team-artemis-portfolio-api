import { connectionSource } from '../database/data-source'
import { EducationDetail } from '../database/entity/model'
import { EducationDetailData } from '../interfaces'
import { User } from '../database/entity/user'

const createEducationDetail = async (data: EducationDetailData) => {
  try {
    const { userId } = data

    // Get the education detail repository
    const educationDetailRepository =
      connectionSource.getRepository(EducationDetail)

    // Check if the user exists
    const userRepository = connectionSource.getRepository(User)
    const user = await userRepository.findOne({ where: { id: userId } })

    if (!user) {
      return ('User not found')
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
