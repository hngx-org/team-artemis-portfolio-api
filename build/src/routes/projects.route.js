"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.memoryStorage();
var uploads = (0, multer_1.default)({ storage: storage }).array("images", 10);
var projects_controller_1 = require("../controllers/projects.controller");
/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update project by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the project for update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Update details for the project
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               year:
 *                 type: number
 *               url:
 *                  type: string
 *               tags:
 *                   type: string
 *               description:
 *                    type: string
 *               userId:
 *
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
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *     tags:
 *       - Education
 */
router.get("/projects", projects_controller_1.getAllProjects);
router.get("/projects/:id", projects_controller_1.getProjectById);
router.post("/projects", uploads, projects_controller_1.createProject);
router.put("/projects/:id", projects_controller_1.updateProjectById);
router.delete("/projects/:id", projects_controller_1.deleteProjectById);
module.exports = router;
//# sourceMappingURL=projects.route.js.map