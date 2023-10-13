import express from "express";
import {
  createEducationDetailController,
  updateEducationDetail,
  getEducationDetailById,
  fetchUserEducationDetail,
  deleteEducationDetail,
} from "../controllers/education.controller";

import {
  validateCreateData,
  validateUpdateData,
} from "../middlewares/education.zod";

const router = express.Router();

/**
 * @swagger
 * /api/education/:id:
 *   get:
 *     summary: Get education detail(s) for a user who's id is in the params and returns an array of objects containing a user education details.
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
 *         educationDetails: Array of user education detail(s) or empty array if the user has no education detail.
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
router.get("/education/:id", fetchUserEducationDetail);

/**
 * @swagger
 * /api/education/{id}:
 *   post:
 *     summary: Create education details for a user with a specified ID.
 *     description: Create education details for a user.
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user for whom to create education details.
 *       - in: header
 *         name: Authorization
 *         type: string
 *         description: Optional authorization header
 *       - in: body
 *         name: educationDetails
 *         description: The data for the education details to be created.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
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
 *         example:
 *           sectionId: 1
 *           degreeId: 1
 *           fieldOfStudy: "Engineering"
 *           school: "Unilag"
 *           description: "Description"
 *           from: "2017"
 *           to: "2020"
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
router.post(
  "/education/:id",
  validateCreateData,
  createEducationDetailController
);

/**
 * @swagger
 * /api/education/{id}:
 *   get:
 *     summary: Get a single education detail by ID
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
router.get("/education/:id", getEducationDetailById);

/**
 * @swagger
 * /api/updateEducationDetail/{id}:
 *   patch:
 *     summary: Update education details for a user by its ID.
 *     description: Update education details for a user by its ID.
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the education detail to update.
 *         type: integer
 *         schema:
 *           type: integer
 *           properties:
 *             degreeId:
 *               type: number
 *         example:
 *           id: 1
 *       - in: body
 *         name: educationDetails
 *         description: New education detail data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
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
 *         example:
 *           degreeId: 1
 *           fieldOfStudy: "Engineering"
 *           school: "Unilag"
 *           description: "Description"
 *           from: "2023-10-12"
 *           to: "2023-10-12"
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
router.patch(
  "/updateEducationDetail/:id",
  validateUpdateData,
  updateEducationDetail
);

/**
 * @swagger
 * /api/educationDetail/{id}:
 *  get:
 *   summary: Get education detail by its ID
 *   description: Retrieve an education detail by its ID.
 *   tags: [Education]
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: The ID of the education detail to retrieve.
 *       schema:
 *         type: integer
 *   responses:
 *     200:
 *       description: Education detail retrieved successfully.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               successful:
 *                 type: boolean
 *               message:
 *                 type: string
 *               data:
 *                 type: object
 *                 properties:
 *                   educationDetail:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       sectionId:
 *                         type: number
 *                       degreeId:
 *                         type: number
 *                       fieldOfStudy:
 *                         type: string
 *                       school:
 *                         type: string
 *                       description:
 *                         type: string
 *                       from:
 *                         type: string
 *                       to:
 *                         type: string
 *                       userId:
 *                         type: string
 *     404:
 *       description: Education detail not found.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     500:
 *       description: Internal server error.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 */
router.get("/educationDetail/:id", getEducationDetailById);

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
router.delete("/education/:id", deleteEducationDetail);

module.exports = router;
