import express from 'express';
import languageController from '../controllers/language.controller';
import { validateSchema } from '../middlewares/language.zod';
import {
  postLanguageSchema,
  updatelanguageSchema,
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
 *             language:
 *               type: string
 *           required:
 *             - userId
 *             - language
 *     responses:
 *       200:
 *         description: Success.
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error.
 */
router.post(
  '/language',
  validateSchema(postLanguageSchema),
  languageController.addLanguage
);

/**
 * @swagger
 * /api/language:
 *   put:
 *     summary: Update a users language
 *     description: Update one of the user's language
 *     tags: [Language]
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Body of request
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             userId:
 *               type: string
 *               format: uuid
 *             preferred:
 *               type: boolean
 *             language:
 *               type: string
 *           required:
 *             - id
 *             - userId
 *             - language
 *             - preferred
 *     responses:
 *       200:
 *         description: Success.
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error.
 */
router.put(
  '/language',
  validateSchema(updatelanguageSchema),
  languageController.updateLanguage
);

/**
 * @swagger
 * /api/all-languages:
 *   get:
 *     summary: Get all languages that can be selected
 *     description: Returns a list of all the languages that can be selected
 *     tags: [Language]
 *     responses:
 *       200:
 *         description: Success.
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error.
 */
router.get('/all-languages', languageController.getLanguages);

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
 *         description: Success.
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error.
 */
router.get('/language/:userId', languageController.getUserLanguages);

/**
 * @swagger
 * /api/language-preferred/{userId}:
 *   get:
 *     summary: Get preferred language owned by the user
 *     description: Get user's preffered language
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
 *         description: Success.
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/language-preferred/:userId',
  languageController.getPreferredUserLanguage
);

/**
 * @swagger
 * /api/language/{id}:
 *   delete:
 *     summary: Delete given language for a user
 *     description: Deletes the given language for the user
 *     tags: [Language]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Body of request
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Success.
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error.
 */
router.delete('/language/:id', languageController.deleteUserLanguage);

module.exports = router;
