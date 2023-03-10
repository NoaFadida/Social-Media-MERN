import ChatApi from "../api/ChatApi"

export type Conversation = {
  members: [String];
};

const getConversation = async (senderId: string, receiverId: string) => {
  try {
    const res: any = await ChatApi.getConversation(senderId, receiverId);
    const conversationId = JSON.stringify(res.data._id)
    return conversationId;
  } catch (err) {
    console.log("fail getting conversation id from db ");
  }
};

export default {
  getConversation,
};
