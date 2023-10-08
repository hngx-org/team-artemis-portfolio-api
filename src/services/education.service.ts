import { connectionSource } from '../database/data-source'
import { EducationDetail } from '../database/entity/model'
import { EducationDetailData } from '../interfaces'

const createEducationDetail = async (data: EducationDetailData) => {
  try {
    // Get the education detail repository
    const educationDetailRepository =
      connectionSource.getRepository(EducationDetail)

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
