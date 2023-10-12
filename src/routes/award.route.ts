import express from 'express'
import { validateCreateAwardData } from '../middlewares/award.zod';
import { createAwardController,
        getAwardController,
        getAllAwardsController,
        deleteAwardController
} from '../controllers/award.controller'

const router = express.Router()


router.post('/award/:userId', validateCreateAwardData, createAwardController)
/**
 * @swagger
 * /api/award/:id:
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
 *         description: Award retrieved successfully.
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
router.get('/award/:id', getAwardController);


/**
 * @swagger
 * /api/awards:
 *   get:
 *     summary: Get the award detail of all users
 *     description: All awards retrieved successfully
 *     responses:
 *       200:
 *         description: Award retrieved successfully.
 *         awardDetails: Array of user award details.
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
router.get('/awards', getAllAwardsController);


/**
 * @swagger
 * /api/award/:id:
 *   delete:
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

router.delete('/award/:id', deleteAwardController)

module.exports = router