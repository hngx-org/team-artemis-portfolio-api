import express from "express";
import {
  createAbout,
  getAboutByID,
  updateAbout,
  deleteAbout,
} from "../controllers/about.controller";

const router = express.Router();

/**
 * @swagger
 * /api/v1/about/{userId}:
 *   post:
 *      tags:
 *        - About
 *     summary: Create About
 *     description: Create a new About entry.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: About entry created successfully
 *       400:
 *         description: Bad request, check your request data
 *       500:
 *         description: Internal server error
 */
router.post("/about/:userId", createAbout);

/**
 * @swagger
 * /api/v1/about/{id}:
 *   get:
 *     tags:
 *       - About
 *     summary: Get About by ID
 *     description: Retrieve an About entry by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: About entry retrieved successfully
 *       404:
 *         description: About entry not found
 *       500:
 *         description: Internal server error
 */
router.get("/about/:id", getAboutByID);

/**
 * @swagger
 * /api/v1/about/{id}:
 *   put:
 *     tags:
 *       - About
 *     summary: Update About
 *     description: Update an existing About entry by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: About entry updated successfully
 *       400:
 *         description: Bad request, check your request data
 *       404:
 *         description: About entry not found
 *       500:
 *         description: Internal server error
 */
router.put("/about/:id", updateAbout);



/**
 * @swagger
 * /api/v1/about/{id}:
 *   delete:
 *     tags:
 *       - About
 *     summary: Delete About
 *     description: Delete an About entry by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: About entry deleted successfully
 *       404:
 *         description: About entry not found
 *       500:
 *         description: Internal server error
 */
router.delete("/about/:id", deleteAbout);

module.exports = router;
