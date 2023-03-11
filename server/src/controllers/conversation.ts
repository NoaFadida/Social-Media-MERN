import Conversation from "../models/conversation_model"
import { Request, Response } from "express";

const getConversation = async (req: Request, res: Response) => {
  const senderId = req.params.senderId;
  const receiverId = req.params.receiverId;
  try {
    let isExist = await Conversation.findOne({
      members: [senderId, receiverId],
    });
    if (!isExist) {
      isExist = await Conversation.findOne({
        members: [receiverId, senderId],
      })
    }
    //new conversation
    
    if (!isExist) {
      const newConversation = await new Conversation({
        members: [senderId, receiverId],
      });
      const savedConversation = await newConversation.save();
      res.status(200).send(savedConversation);
    } else {
      //exist conversation
      console.log("conversation exists in db");
      res.status(200).send(isExist);
    }
  } catch (err) {
    res.status(400).send({ error: "Failed " });
  }
};

export = {
  getConversation,
};
