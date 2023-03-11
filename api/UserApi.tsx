import apiClient from "./ClientApi";

const uploadImage = async (image: any) => {
  return apiClient.post("/file/file", image);
};

const getUserById = async (userId: string) => {
  return apiClient.get("user/" + userId);
};
const getAllUsers = async () => {
  return apiClient.get("/user");
};

const addNewPost = async (postJson: any) => {
  return apiClient.post("post/", postJson);
};

const getAllPosts = async () => {
  return apiClient.get("post/");
};

const getPostsById = async (id: string) => {
  return apiClient.get("post/userId/" + id);
};

const updatePost = async (postUpdatJson: any) => {
  return apiClient.put("post/", postUpdatJson);
};

const deletePost = async (id: string) => {
  return apiClient.delete("post/" + id);
};

const upadteUser = async (userUpdatJson: any) => {
  return apiClient.put("user/", userUpdatJson);
};

export default {
  uploadImage,
  getUserById,
  addNewPost,
  getAllPosts,
  updatePost,
  upadteUser,
  getPostsById,
  deletePost,
  getAllUsers,
};
