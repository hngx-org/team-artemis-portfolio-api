import {
  getAllUsers,
  getUserById,
  retrievePortfolioController,
} from '../controllers/portfolio.controller'
// import { retrievePortfolioController } from '../controllers/retrieve-portfolio.controller'
import { Router } from 'express'

const router = Router()

router.get('/portfolio', getAllUsers)

/**
 * @swagger
 * /portfolio/{id}:
 *   get:
 *     summary: Get user portfolio details by ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Requested user not found
 *     tags:
 *       - User
 *       - User Portfolio Details
 */
router.get('/portfolio/:id', getUserById)

/**
 * @swagger
 * /retrieve-portfolio/{userId}:
 *   get:
 *     summary: Get all portfolio details including sections
 *     description: Get request to retrieve all portfolio details
 *     parameters:
 *       - in: path
 *         name: userId
 *         type: string
 *         description: userId of the user requesting portfolio
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 data:
 *                   type: object
 *                   description: portfolio details
 *                 successful:
 *                   type: boolean
 *                   description: true
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                 successful:
 *                   type: boolean
 *                   description: false
 *                 data:
 *                   type: string
 *                   description: null
 *     tags:
 *       - Portfolio
 */
router.get('/retrieve-portfolio/:userId', retrievePortfolioController)

module.exports = router
