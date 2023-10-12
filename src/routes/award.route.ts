import express from 'express'
import { createAwardController } from '../controllers/award.controller'
import { validateCreateAwardData } from '../middlewares/award.zod'

const router = express.Router()

router.post('/award/:userId', validateCreateAwardData, createAwardController)

module.exports = router
