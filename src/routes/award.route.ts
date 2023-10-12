import express from 'express'
import { createAwardController } from '../controllers/award.controller'

const router = express.Router()

router.post('/award/:userId', createAwardController)

module.exports = router
