import express from 'express'
import {
  createDegreeController
} from '../controllers/degree.controller'

const router = express.Router()

router.post('/degree', createDegreeController)

module.exports = router
