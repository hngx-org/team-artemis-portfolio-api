import express from 'express';
import { z } from 'zod';
import { 
    createAboutMe,
    getAboutMe,
    updateAboutMe,
    deleteAboutMe
} from '../controllers/aboutme.controller';
import { 
    createAboutMeSchema,
    updateAboutMeSchema,
    validateCreateAboutMeSchema, 
    validateUpdateAboutMe, 
    validateUser_id 
} from '../middlewares/aboutme.zod';

const router = express.Router();

// Create an About Me

/**
 * @swagger
 * /api/about-me:
 *   post:
 *     summary: Create "About Me" entry
 *     tags: [AboutMe]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AboutMeRequest'
 *     responses:
 *       201:
 *         description: About Me entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AboutMeResponse'
 *       400:
 *         $ref: '#/components/schemas/ErrorResponse'
 */

router.post(
    "/about-me",
    validateCreateAboutMeSchema(createAboutMeSchema),
    createAboutMe
);

//Fetch About Me

/**
 * @swagger
 * /api/about-me/{user_id}:
 *   get:
 *     summary: Get "About Me" information
 *     tags: [AboutMe]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: About Me information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AboutMeResponse'
 *       404:
 *         $ref: '#/components/schemas/ErrorResponse'
 */

router.get(
    "/about-me/:user_id",
    validateUser_id(z.string().uuid({ message: 'userId must be a valid uuid' })),
     getAboutMe
);

// Update About Me

/**
 * @swagger
 * /api/about-me/{user_id}:
 *   put:
 *     summary: Update "About Me" information
 *     tags: [AboutMe]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AboutMeRequest'
 *     responses:
 *       200:
 *         description: About Me information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AboutMeResponse'
 *       400:
 *         $ref: '#/components/schemas/ErrorResponse'
 */

router.put(
    "/about-me/:user_id",
    validateUpdateAboutMe(updateAboutMeSchema),
    updateAboutMe
);

// Delete About Me

/**
 * @swagger
 * /api/about-me/{user_id}:
 *   delete:
 *     summary: Delete "About Me" information
 *     tags: [AboutMe]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: About Me information deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AboutMeResponse'
 *       404:
 *         $ref: '#/components/schemas/ErrorResponse'
 */

router.delete(
    "/about-me/:user_id",
    validateUser_id(z.string().uuid({ message: 'userId must be a valid uuid' })),
    deleteAboutMe
);


module.exports = router;
