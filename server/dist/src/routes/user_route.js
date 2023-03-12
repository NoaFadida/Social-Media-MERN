"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User route
 */
const user_1 = __importDefault(require("../controllers/user"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/**
 * @swagger
 * /user
 *   get:
 *     summary: get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: the requested users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *
 */
router.get("/", user_1.default.getAllUsers);
/**
 * @swagger
 * /user/{id}
 *   get:
 *     summary: get requsted user
 *     tags: [User]
 *  *     parameters:
 *       - in: path
 *         id: id
 *         requiered: true
 *         schema:
 *           type: string
 *           description: the requested user

 *     responses:
 *       200:
 *         description: the requested user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *
 */
router.get("/:id", user_1.default.getUserById);
/**
 * @swagger
 * /user
 *   put:
 *     summary: update user details
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: update user success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *
 */
router.put("/", user_1.default.upadteUser);
module.exports = router;
//# sourceMappingURL=user_route.js.map