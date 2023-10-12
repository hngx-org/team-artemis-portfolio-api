import { NextFunction, Request, RequestHandler, Response } from 'express'
import { createAwardService } from '../services/award.service'
import { AwardData } from '../interfaces/'
import { User } from '../database/entity/user'
import { connectionSource } from '../database/data-source'
import { NotFoundError } from '../middlewares'
import { Award } from '../database/entity/model'
import { QueryFailedError } from 'typeorm'


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


// update award
const updateAwardController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const awardId = parseInt(req.params.awardId)

    const awardRepository = connectionSource.getRepository(Award)

    const award = await awardRepository.findOne({
      where: { id: awardId}
    })

    if (!award) {
      throw new NotFoundError('Award not found')
    }
    
    const updateAward = req.body;
    
    // fields that must be strings
    const stringFields = ['year', 'title', 'description', 'presented_by', 'url'];



    // update the award dynamically based on the data passed
    for (const key in updateAward) {
    if (updateAward.hasOwnProperty(key)) {
      if (stringFields.includes(key) && typeof updateAward[key] !== 'string') {
      return res.status(400).json({ 'Input Error': `Field '${key}' should be a string` });
    }
    award[key] = updateAward[key];
  }
}
    
    await awardRepository.save(award)

    console.log('Award updated successfully');

    res.status(200).json({
      message: 'Award updated successfully',
      award
    });
    
  } catch (error) {
    if(error instanceof QueryFailedError) {
      res.status(400).json({ 'Input Error': error.message})
    }
    console.error('Error updating award details:', error.message)
    next(error)
  }
}

export {
  createAwardController,
  updateAwardController,
}
