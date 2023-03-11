"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const message_model_1 = __importDefault(require("../models/message_model"));
const conversation_model_1 = __importDefault(require("../models/conversation_model"));
const addNewMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { conversationId, senderId, text } = req.body;
    try {
        const message = yield new message_model_1.default({
            conversationId,
            senderId,
            text,
        });
        const savedMessage = yield message.save();
        console.log("saved a new message in db");
        res.status(200).send(savedMessage);
    }
    catch (err) {
        res.status(400).send({ error: "Failed to get user from DB" });
    }
});
// get user messages
const getConversationrMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conversationId = req.params.conversationId;
    try {
        let isExist = yield conversation_model_1.default.findOne({
            _id: JSON.parse(conversationId),
        });
        if (isExist) {
            const messages = yield message_model_1.default.find({ conversationId });
            res.status(200).send(messages);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ error: "Failed to get user  message from DB" });
    }
});
module.exports = {
    addNewMessage,
    getConversationrMessages,
};
//# sourceMappingURL=message.js.map