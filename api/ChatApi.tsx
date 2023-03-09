import apiClient from "./ClientApi";

const getConversation = async (senderId: string, receiverId: string) => {
  return apiClient.get(
    "chatRouter/conversation/" + senderId + "/" + receiverId
  );
};

const addNewMsg = async (message: any) => {
  return apiClient.post("chatRouter/message/", message);
};

const getConversationrMessages = async (conversationId: string) => {
  return apiClient.get("chatRouter/message/" + conversationId);
};

export default {
  getConversation,
  getConversationrMessages,
  addNewMsg,
};
