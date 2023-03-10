import apiClient from "./ClientApi"

const getConversation = async (senderId: string, receiverId: string) => {
  return apiClient.get(
    "chat/conversation/" + senderId + "/" + receiverId
  );
};

const addNewMsg = async (message: any) => {
  return apiClient.post("chat/message/", message);
};

const getConversationrMessages = async (conversationId: string) => {
  return apiClient.get("chat/message/" + conversationId);
};

export default {
  getConversation,
  getConversationrMessages,
  addNewMsg,
};
