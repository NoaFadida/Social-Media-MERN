/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat route
 */

import express from "express";
import message from "../controllers/message";
import conversation from "../controllers/conversation";
const router = express.Router();

/**
 * @swagger
 * /chat/conversation/{senserId}/{receiverId}:
 *   get:
 *     summary: get conversation by id
 *     tags: [Conversation]
 *     parameters:
 *       - in: path
 *         senderId: id
 *         receiverId: id
 *         requiered: true
 *         schema:
 *           type: string
 *           description: the requested users id
 *     responses:
 *       200:
 *         description: the requested conversation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/conversation'
 *
 */
router.get("/conversation/:senderId/:receiverId", conversation.getConversation);
// get user messages

/**
 * @swagger
 * /chat/message/{conversationId}
 *   get:
 *     summary: get messages by conversation id
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         conversationId: id
 *         requiered: true
 *         schema:
 *           type: string
 *           description: the requested conversationId
 *     responses:
 *       200:
 *         description: the requested messages
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/message'
 *
 */
router.get("/message/:conversationId", message.getConversationrMessages);

/**
 * @swagger
 * /chat/message
 *   post:
 *     summary: send new message
 *     tags: [Message]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: success to send new message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/message'
 */

router.post("/message", message.addNewMessage);

export = router;
