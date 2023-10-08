import express, { Router } from 'express'
import { updateEducationDetail } from '../controllers/education.controller' // Replace with the actual path to your controller function

const router: Router = express.Router()

/**
 * @swagger
 * /updateEducationDetail/{id}:
 *   put:
 *     summary: Update education detail by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the education detail to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: New education detail data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *               field2:
 *                 type: number
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
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *     tags:
 *       - Education
 */
router.put('/updateEducationDetail/:id', updateEducationDetail)

module.exports = router
