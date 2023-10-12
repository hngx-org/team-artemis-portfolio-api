import express from 'express'
import { 
  createAwardsController,
  updateAwardsController,
  } from '../controllers/award.controller'

const router = express.Router()

router.post('awards/:id', createAwardsController)

router.put('/updateAward/:awardId', updateAwardsController)

module.exports = router
