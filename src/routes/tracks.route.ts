import express from "express";
import { getAllTracks } from "../controllers/tracks.controller";

const router = express.Router();

/**
 * @swagger
 * /tracks:
 *   get:
 *     summary: Get all the tracks
 *     description: Retrieve all tracks using a GET request.
 *     tags: [Tracks]
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
 */
router.get("/tracks", getAllTracks);

module.exports = router;
