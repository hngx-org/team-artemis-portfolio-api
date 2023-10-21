import express from "express";
import { getAllTracks, getTrackById, createUserTrack } from "../controllers/tracks.controller";

const router = express.Router();

/**
 * @swagger
 * /api/v1/tracks:
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
router.get("/tracks", getAllTracks)
    .get("/tracks/:id", getTrackById);

router.post("/tracks", createUserTrack);
module.exports = router;
