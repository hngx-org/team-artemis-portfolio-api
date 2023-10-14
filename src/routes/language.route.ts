import express from 'express';
import languageController from '../controllers/language.controller';
import {
  postLanguageSchema,
  validateSchema,
} from '../middlewares/language.zod';

const router = express.Router();

/**
 * @swagger
 * /api/language:
 *   post:
 *     summary: Create a new language for user
 *     description: Adds a language as one of the user languages
 *     tags: [Language]
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Body of request
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               format: uuid
 *             languages:
 *               type: array
 *           required:
 *             - userId
 *             - languages
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.post(
  '/language',
  validateSchema(postLanguageSchema),
  languageController.addLanguage
);

/**
 * @swagger
 * /api/language/{userId}:
 *   get:
 *     summary: Get all languages owned by the user
 *     description: Get all the languages the requesting user owns
 *     tags: [Language]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Id of requesting user
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 */
router.get('/language/:userId', languageController.getUserLanguages);

module.exports = router;
