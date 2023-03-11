/**
 * @swagger
 * tags:
 *   name: User
 *   description: User route
 */
import user from "../controllers/user"
import express from "express";
const router = express.Router();

router.get("/", user.getAllUsers);

router.get("/:id", user.getUserById);

router.put("/", user.upadteUser)

export = router;
