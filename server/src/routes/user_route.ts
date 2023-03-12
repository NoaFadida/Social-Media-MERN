/**
 * @swagger
 * tags:
 *   name: User
 *   description: User route
 */
import user from "../controllers/user";
import express from "express";
const router = express.Router();

/**
 * @swagger
 * /user:
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
router.get("/", user.getAllUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: get requsted user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: the requested user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *
 */

router.get("/:id", user.getUserById);

/**
 * @swagger
 * /user:
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
router.put("/", user.upadteUser);

export = router;
