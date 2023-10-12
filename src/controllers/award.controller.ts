import { NextFunction, Request, Response } from 'express'
import { createAwardService } from '../services/award.service'
import { AwardData } from '../interfaces/'
import { User } from '../database/entity/user'
import { connectionSource } from '../database/data-source'
import { NotFoundError } from '../middlewares'

// Controller function to create an award
const createAwardController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const award: AwardData = req.body
    award.user_id = userId

    // Define an array of required fields
    const requiredFields = [
      'title',
      'year',
      'user_id',
      'presented_by',
      'url',
      'description',
    ]

    // Check for missing fields
    const missingFields = requiredFields.filter((field) => !req.body[field])

    if (missingFields.length > 0) {
      // Create a CustomError with a 400 status code
      const err = new CustomError(
        `Missing fields: ${missingFields.join(', ')}`,
        400
      )
      res.status(err.statusCode).json({ err: err.message })
    }

    const userRepository = connectionSource.getRepository(User)
    const user = await userRepository.findOne({ where: { id: userId } })

    if (!user) {
      // Create a CustomError with a 404 status code
      const err = new NotFoundError('Error creating award: User not found')
      res.status(err.statusCode).json({ err: err.message })
    }
    console.log(award)

    const createdAward = await createAwardService(award)

    const response = {
      message: 'Successfully created award',
      status: 'success',
      statusCode: 201,
      createdAward,
    }

    res.status(201).json(response)
    return res.status(201).json(response)
  } catch (error) {
    console.error('Error creating award:', error.message)
    next(error)
  }
}

export { createAwardController }
