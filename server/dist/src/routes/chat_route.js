"use strict";
/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat route
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const message_1 = __importDefault(require("../controllers/message"));
const conversation_1 = __importDefault(require("../controllers/conversation"));
const router = express_1.default.Router();
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
router.get("/conversation/:senderId/:receiverId", conversation_1.default.getConversation);
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
router.get("/message/:conversationId", message_1.default.getConversationrMessages);
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
router.post("/message", message_1.default.addNewMessage);
module.exports = router;
//# sourceMappingURL=chat_route.js.map