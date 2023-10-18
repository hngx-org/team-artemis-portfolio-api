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
 *         description: Body of request takes a userId (uuid) and languages (array of strings) in the body
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               format: uuid
 *               example: "0c8c29f7-5baf-4d81-97ba-eaa992a8801b"
 *             languages:
 *               type: array
 *               items:
 *                type: string
 *               example: ["Python", "Javascript"]
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
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: success
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
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Not found
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
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Bad Request
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
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
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
 *           example: 0c8c29f7-5baf-4d81-97ba-eaa992a8801b
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
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: success
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
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Not found
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
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Bad Request
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
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 data:
 *                   type: object
 */
router.get('/language/:userId', languageController.getUserLanguages);

/**
 * @swagger
 * /api/language/{userId}:
 *   delete:
 *     summary: delete all languages owned by the user
 *     description: delete all the languages the requesting user owns
 *     tags: [Language]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Id of requesting user
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 0c8c29f7-5baf-4d81-97ba-eaa992a8801b
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
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: success
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
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Not found
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
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Bad Request
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
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 data:
 *                   type: object
 */
router.delete('/language/:userId', languageController.deleteAllUserLanguages);

module.exports = router;
