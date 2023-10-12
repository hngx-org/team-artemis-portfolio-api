import { Request, Response } from 'express'
import { connectionSource as dataSource } from '../database/data-source'
import { TreeRepository } from 'typeorm'

const createAwardsController = () => {

}

const updateAwardsController = async (req: Request, res: Response, next) => {
  try {
    const awardId = parseInt(req.params.awardId)

    // check if the award with id exists
    
  } catch (error) {
    
  }
}

export { 
  createAwardsController,
  updateAwardsController
 }
