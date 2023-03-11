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
const sendMessageEvent = (to, message, from) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("sendMessageEvent");
    try {
        const isExist = yield conversation_model_1.default.findOne({
            members: [from, to],
        });
        if (!isExist) {
            const newConversation = yield new conversation_model_1.default({
                members: [from, to],
            });
            const savedConversation = yield newConversation.save();
            console.log("saved conversation in db");
            const newMessage = yield new message_model_1.default({ conversationId: savedConversation._id, senderId: from, text: message });
            const savedMessage = yield newMessage.save();
            return {
                status: "OK",
                data: savedMessage,
            };
        }
        console.log("conversation exists in db");
        const newMessage = yield new message_model_1.default({ conversationId: isExist._id, senderId: from, text: message });
        const savedMessage = yield newMessage.save();
        return {
            status: "OK",
            data: savedMessage,
        };
    }
    catch (err) {
        return { status: "FAIL", data: "" };
    }
    //   try {
    //     const newMsgsent = { to: to, message: message };
    //     const newMsgReceived = { from: from, message: message };
    //     const senderUser = await User.findOneAndUpdate(
    //       { _id: from },
    //       {
    //         chat_message: newMsgsent,
    //         new: true,
    //       }
    //     );
    //     const receiverUser = await User.findOneAndUpdate(
    //       { _id: to },
    //       {
    //         chat_message: newMsgReceived,
    //         new: true,
    //       }
    //     );
    //     console.log("saved msg in db");
    //     return {
    //       status: "OK",
    //       data: newMsgsent,
    //       senderUser: senderUser,
    //       receiverUser: receiverUser,
    //     };
    //   } catch (err) {
    //     return { status: "FAIL", data: "" };
    //   }
});
module.exports = {
    sendMessageEvent,
};
//# sourceMappingURL=chat.js.map