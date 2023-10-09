import express from "express";
import {
  createEducationDetailController,
  updateEducationDetail,
  getEducationDetailById,
  getAllEducationDetails,
  deleteEducationDetail,
} from "../controllers/education.controller";
import {
  createEducationDetailController,
  fetchEducationDetail,
  updateEducationDetail,
} from "../controllers/education.controller";

const router = express.Router();

/**
 * @swagger
 * /api/education/:id:
 *   get:
 *     summary: Get education detail(s) by ID
 *     description: Get education detail(s) for a user who's id is in the params and returns an array of objects containing a user education details.
 *     tags: [Education]
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
 *               sectionId:
 *                 type: number
 *               degreeId:
 *                 type: number
 *               fieldOfStudy:
 *                 type: string
 *               school:
 *                 type: string
 *               description:
 *                 type: string
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *
 *     responses:
 *       200:
 *         educationDetails: Array of user education detail(s).
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
 *         description: Failed to fetch education detail(s).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "invalid input syntax for type integer: \"\""
 *                 data:
 *                   type: null
 */
router.get("/education/:id", fetchEducationDetail);

/**
 * @swagger
 * /api/education:
 *   post:
 *     summary: Create education details
 *     description: Create education details for a user.
 *     tags: [Education]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         description: Optional authorization header
 *       - in: body
 *         name: educationDetails
 *         description: The data for the education details to be created.
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               sectionId:
 *                 type: number
 *               degreeId:
 *                 type: number
 *               fieldOfStudy:
 *                 type: string
 *               school:
 *                 type: string
 *               description:
 *                 type: string
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: Education details successfully created.
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
 *       500:
 *         description: Failed to create education details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "invalid input syntax for type integer: \"\""
 *                 data:
 *                   type: null
 */
router.post("/api/education", createEducationDetailController);

/**
 * @swagger
 * /api/education/{id}:
 *   get:
 *     summary: Get education detail by ID
 *     description: Get an education detail by its ID.
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the education detail to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Education detail retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 educationDetail:
 *                   type: object
 *       404:
 *         description: Education detail not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/api/education/:id", getEducationDetailById);

/**
 * @swagger
 * /api/education/{id}:
 *   put:
 *     summary: Update education detail by ID
 *     description: Update education details for a user by its ID.
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the education detail to update.
 *         type: integer
 *       - in: body
 *         name: educationDetails
 *         description: New education detail data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *             sectionId:
 *               type: number
 *             degreeId:
 *               type: number
 *             fieldOfStudy:
 *               type: string
 *             school:
 *               type: string
 *             description:
 *               type: string
 *             from:
 *               type: string
 *             to:
 *               type: string
 *     responses:
 *       200:
 *         description: Education details successfully updated.
 *         schema:
 *           type: object
 *           properties:
 *             successful:
 *               type: boolean
 *             message:
 *               type: string
 *       400:
 *         description: Bad request
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */

router.patch("/api/education/:id", updateEducationDetail);

/**
 * @swagger
 * /api/education/user/{userId}:
 *   get:
 *     summary: Get all education details for a user
 *     description: Get all education details associated with a specific user.
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to retrieve education details for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Education details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 educationDetails:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: User has no educational details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/api/education/user/:userId", getAllEducationDetails);

/**
 * @swagger
 * /api/education/{id}:
 *   delete:
 *     summary: Delete education detail by ID
 *     description: Delete an education detail by its ID.
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the education detail to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Education detail deleted successfully.
 *       404:
 *         description: Education detail not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put("/updateEducationDetail/:id", updateEducationDetail);
router.delete("/api/education/:id", deleteEducationDetail);

module.exports = router;
