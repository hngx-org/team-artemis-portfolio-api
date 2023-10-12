import express from 'express'
import { createAwardsController,
        getAwardController,
        deleteAwardController
} from '../controllers/award.controller'

const router = express.Router()

router.post('awards/:id', createAwardsController);

/**
 * @swagger
 * /api/awards/:id:
 *   get:
 *     summary: Get award detail(s) for a user who's id is in the params and returns an array of objects containing a user award details.
 *     description: Get award detail(s) for a user who's id is in the params and returns an array of objects containing a user award details.
 *     tags: [Award]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         description: Optional authorization header
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               title:
 *                 type: string
 *               year:
 *                 type: string
 *               presented_by:
 *                 type: string
 *               url:
 *                 type: string
 *               description:
 *                 type: string
 *               createdAt:
 *                 type: Date
 *               user:
 *                 type: user
 *               section:
 *                  type: section
 *
 *     responses:
 *       200:
 *         description: Award created successfully.
 *         educationDetails: Array of user awards detail(s).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     successful:
 *                       type: boolean
 *                     message:
 *                       type: string    
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
router.get('/awards/:id', getAwardController);

/**
 * @swagger
 * /api/awards/:id:
 *   get:
 *     summary: Delete award detail(s) of a user detail by ID
 *     description: Delete award detail(s) of a user detail by ID
 *     tags: [Award]
 *     parameters:
 *       in: path
 *         name: id
 *         required: true
 *         description: The ID of the award detail to delete.
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Award deleted successfully.
 *         Details: Array of user awards detail(s).   
 *  
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.delete('/awards/:id', deleteAwardController)

module.exports = router
