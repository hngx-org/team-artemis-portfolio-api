import express from 'express';
import { retrievePortfolioController } from '../controllers/retrieve-portfolio.controller';

const router = express.Router();

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
router.get('/retrieve-portfolio/:userId', retrievePortfolioController);

module.exports = router;
