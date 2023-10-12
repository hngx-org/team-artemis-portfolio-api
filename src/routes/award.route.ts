import express from 'express'
import { 
  createAwardController,
  updateAwardController,
} from '../controllers/award.controller'

const router = express.Router()

router.post('awards/:id', createAwardController)

router.put('/awards/:awardId', updateAwardController)

module.exports = router
