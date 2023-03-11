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
const conversation_1 = __importDefault(require("../controllers/conversation"));
const message_1 = __importDefault(require("../controllers/message"));
const router = express_1.default.Router();
router.get("/conversation/:senderId/:receiverId", conversation_1.default.getConversation);
// get user messages
router.get("/message/:conversationId", message_1.default.getConversationrMessages);
router.post("/message", message_1.default.addNewMessage);
module.exports = router;
//# sourceMappingURL=chat_route.js.map