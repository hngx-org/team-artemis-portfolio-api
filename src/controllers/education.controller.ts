import { Request, RequestHandler, Response, NextFunction } from 'express'
import { connectionSource } from '../database/data-source'
import { Degree, EducationDetail, Section } from '../database/entity/model'
import { createEducationDetail } from '../services/education.service'
import { EducationDetailData } from '../interfaces/education.interface'
import { User } from '../database/entity/user'

import {
  CustomError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  MethodNotAllowedError,
  errorHandler,
} from '../middlewares'
import {
  CreateEducationDetailDataSchema,
  validateCreateData,
} from '../middlewares/education.zod'
import { z } from 'zod'

// Custom function to validate date strings in "yy-mm-dd" format
function validateDateYYMMDD(dateString: string) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/
  return datePattern.test(dateString)
}

// Endpoint to fetch the education section
const fetchUserEducationDetail: RequestHandler = async (req, res, next) => {
  // Add 'next' parameter
  const educationRepository = connectionSource.getRepository(EducationDetail)
  const userRepository = connectionSource.getRepository(User)

  try {
    const id = req.params.id

    if (!id) {
      throw new BadRequestError('User ID is required')
    }

    const isUser = await userRepository.findOne({ where: { id } })

    if (!isUser) {
      const error = new NotFoundError('A user with this ID does not exist')
      throw error
    }

    const educationDetails = await educationRepository.find({
      where: { userId: id },
      relations: ['degree', 'section', 'user'],
    })

    if (!educationDetails) {
      const error = new InternalServerError(
        'An error occurred while fetching the education details, please try again'
      )
      throw error
    }

    // Send a success response
    res.status(200).json({ educationDetails })
  } catch (error) {
    // Handle errors
    if (error.message.includes('invalid input syntax for type uuid')) {
      error.message = 'Invalid UUID format. Please provide a valid UUID.'
    }
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || 'An unknown error occurred' })
    next(error)
  }
}

// Get the repository for the EducationDetail entity
const educationDetailRepository =
  connectionSource.getRepository(EducationDetail)

const createEducationDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id

    const { degreeId, fieldOfStudy, school, from, description, to, sectionId } =
      req.body as EducationDetailData

    const data = {
      degreeId,
      fieldOfStudy,
      school,
      from,
      description,
      to,
      sectionId,
    }

    // Validate date strings in "yy-mm-dd" format
    if (data.from && !validateDateYYMMDD(data.from)) {
      return res.status(400).json({ errors: "Invalid 'from' date format" })
      // throw new BadRequestError("Invalid 'from' date format")
    }

    if (data.to && !validateDateYYMMDD(data.to)) {
      // throw new BadRequestError("Invalid 'to' date format")
      return res.status(400).json({ errors: "Invalid 'to' date format" })
    }
    await validateCreateData(data, userId, res)

    // Define an array of required fields
    const requiredFields = [
      'degreeId',
      'fieldOfStudy',
      'school',
      'from',
      'description',
      'to',
      'sectionId',
    ]

    // Check for missing fields
    const missingFields = requiredFields.filter((field) => !req.body[field])

    if (missingFields.length > 0) {
      // Create a CustomError with a 400 status code
      throw new CustomError(`Missing fields: ${missingFields.join(', ')}`)
    }

    // Get the user by userId
    const userRepository = connectionSource.getRepository(User)
    const user = await userRepository.findOne({ where: { id: userId } })

    const sectionRepository = connectionSource.getRepository(Section)
    const degreeRepository = connectionSource.getRepository(Degree)
    const section = await sectionRepository.findOne({
      where: { id: sectionId },
    })
    const degree = await degreeRepository.findOne({ where: { id: degreeId } })

    if (!user) {
      // Create a CustomError with a 404 status code
      const err = new NotFoundError(
        'Error creating education detail: User not found'
      )
      return res.status(err.statusCode).json({ error: err.message })
    }
    if (!section) {
      // Create a CustomError with a 404 status code
      const err = new NotFoundError(
        'Error creating education detail: Section not found'
      )
      return res.status(err.statusCode).json({ error: err.message })
    }
    if (!degree) {
      // Create a CustomError with a 404 status code
      const err = new NotFoundError(
        'Error creating education detail: Degree not found'
      )
      return res.status(err.statusCode).json({ error: err.message })
    }

    // Call the service function to create an education detail
    const educationDetail = await createEducationDetail({
      degreeId,
      fieldOfStudy,
      school,
      from,
      description,
      to,
      userId,
      sectionId,
    })

    const response = {
      message: 'Successfully created education detail',
      status: 'success',
      statusCode: 201,
      educationDetail,
    }

    return res.status(201).json(response)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors })
    } else {
      console.error('An error occurred:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
    next(error)
  }
}

// get education detail by id
const getEducationDetailById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id) || id < 1) {
      throw new BadRequestError('Invalid ID Format')
    }

    // Attempt to fetch education details
    const educationDetail = await educationDetailRepository.findOne({
      where: { id },
    })

    // If the education detail is not found, you can throw a NotFoundError
    if (!educationDetail) {
      throw new NotFoundError('Education detail not found')
    }

    // Send a success response
    res.status(200).json({ educationDetail })
  } catch (error) {
    console.error('Error fetching education detail:', error.message)
    next(error)
  }
}

const updateEducationDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id) || id < 1) {
      throw new BadRequestError('Invalid ID Format')
    }

    // convert the date objects to date strings
    if (req.body.from && req.body.to) {
      req.body.from = new Date(req.body.from)
      req.body.to = new Date(req.body.to)
    }

    if (!req.body) {
      throw new BadRequestError('No data provided')
    }

    const educationDetail = await educationDetailRepository.findOne({
      where: { id },
    })

    if (!educationDetail) {
      throw new NotFoundError('Education detail not found')
    }

    const updateData = req.body

    // Dynamic updates based on the updateData object
    for (const key in updateData) {
      if (updateData.hasOwnProperty(key)) {
        educationDetail[key] = updateData[key]
      }
    }

    // Save the updated education detail
    await educationDetailRepository.save(educationDetail)

    console.log('Education detail updated successfully')

    res.status(200).json({
      message: 'Education detail updated successfully',
      educationDetail,
    })
  } catch (error) {
    console.error('Error updating education detail:', error.message)
    next(error)
  }
}

// Delete Education Controller
const deleteEducationDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id) || id < 1) {
      throw new BadRequestError('Invalid ID Format')
    }

    // Find the existing education detail by ID
    const educationDetail = await educationDetailRepository.findOne({
      where: { id },
    })

    if (!educationDetail) {
      throw new NotFoundError('Education detail not found')
    }

    await educationDetailRepository.remove(educationDetail)

    res.status(204).json({
      message: 'Education detail deleted successfully',
      educationDetail,
    })
    console.log('Education detail deleted successfully')
  } catch (error) {
    console.error('Error deleting education detail:', error)
    // errorHandler(error, req, res, next);
    next(error)
  }
}

export {
  createEducationDetailController,
  updateEducationDetail,
  getEducationDetailById,
  deleteEducationDetail,
  fetchUserEducationDetail,
}
