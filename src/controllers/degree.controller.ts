import { Request, Response, NextFunction } from 'express'
import { connectionSource } from '../database/data-source'
import { Degree } from '../database/entity/model'
import { DegreeData } from '../interfaces'

// Controller function to create a degree
const createDegreeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { type } = req.body as DegreeData

    const { type }: DegreeData = req.body

    // Create a new degree instance and save it to the database
    const degreeRepository = connectionSource.getRepository(Degree)
    const degree = degreeRepository.create({ type })
    const createdDegree = await degreeRepository.save(degree)

    return res.status(201).json(createdDegree)
  } catch (error) {
    console.error('Error creating degree:', error.message)
    return res.status(500).json({ error: 'Error creating degree' })
  }
}

export { createDegreeController }
