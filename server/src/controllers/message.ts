import Message from "../models/message_model";
import Conversation from "../models/conversation_model";
import { Request, Response } from "express";

const addNewMessage = async (req: Request, res: Response) => {
  const { conversationId, senderId, text } = req.body;
  try {
    const message = await new Message({
      conversationId,
      senderId,
      text,
    });
    const savedMessage = await message.save();
    console.log("saved a new message in db");
    res.status(200).send(savedMessage);
  } catch (err) {
    res.status(400).send({ error: "Failed to get user from DB" });
  }
};

// get user messages
const getConversationrMessages = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId;
  try {
    let isExist = await Conversation.findOne({
      _id: JSON.parse(conversationId),
    });
    if (isExist) {
      const messages = await Message.find({ conversationId });
      res.status(200).send(messages);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Failed to get user  message from DB" });
  }
};

export = {
  addNewMessage,
  getConversationrMessages,
};
