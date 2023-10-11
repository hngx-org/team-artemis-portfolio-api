import express from 'express'
import { createAwardsController } from '../controllers/award.controller'

const router = express.Router()

router.post('awards/:id', createAwardsController)

module.exports = router
