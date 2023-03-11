import FormData from "form-data";
import UserApi from "../api/UserApi";

export type User = {
  name: String;
  avatarUrl: String;
  id?: String;
};

export type Post = {
  message: String;
  sender: String;
  avatarUrl: String;
  id?: String;
};

export type PostUpdate = {
  message: String;
  sender: String;
  avatarUrl: String;
  id?: String;
};

export type UserUpdate = {
  id: String;
  name: String;
  avatarUrl: String;
};

const uploadImage = async (imageURI: String) => {
  var body = new FormData();
  body.append("file", { name: "name", type: "image/jpeg", uri: imageURI });
  try {
    const res = await UserApi.uploadImage(body);
    if (!res.ok) {
      console.log("save failed ");
    } else {
      if (res.data) {
        const d: any = res.data;
        return d.url;
      }
    }
  } catch (err) {
    console.log("save failed ");
  }
  return "";
};

const getUserById = async (id: string) => {
  try {
    const res: any = await UserApi.getUserById(id);
    return [res.data?.name, res.data?.avatarUrl];
  } catch (err) {
    console.log("fail getting user from db by ID ")
  }
};

const getAllUsers = async () => {
  const res: any = await UserApi.getAllUsers();
  let data = Array<User>();
  if (res.data) {
    res.data.forEach((obj: any) => {
      const user: User = {
        name: obj.name,
        id: obj._id,
        avatarUrl: obj.avatarUrl,
      };
      data.push(user);
    });
  }
  return data;
};

const addNewPost = async (post: Post) => {
  const data = {
    message: post.message,
    sender: post.sender,
    avatarUrl: post.avatarUrl,
  };
  try {
    const res = await UserApi.addNewPost(data);
    console.log("success add new post");
    return res;
  } catch (err) {
    console.log("add new post failed: ");
  }
};

const getAllPosts = async () => {
  const res: any = await UserApi.getAllPosts();
  let d = Array<Post>();
  if (res.data) {
    res.data.forEach((obj: any) => {
      const s = obj.avatarUrl;
      const p: Post = {
        message: obj.message,
        sender: obj.sender,
        avatarUrl: s,
      };
      d.push(p);
    });
  }
  return d;
};

const getPostsById = async (id: string) => {
  const res: any = await UserApi.getPostsById(id);
  let d = Array<Post>();
  if (res.data) {
    res.data.forEach((obj: any) => {
      const s = obj.avatarUrl;
      const p: Post = {
        message: obj.message,
        sender: obj.sender,
        avatarUrl: s,
        id: obj._id,
      };
      d.push(p);
    });
  }
  return d;
};

const updatePost = async (post_update: PostUpdate) => {
  const data = {
    message: post_update.message,
    sender: post_update.sender,
    avatarUrl: post_update.avatarUrl,
    id: post_update.id,
  };
  try {
    await UserApi.updatePost(data);
    console.log("success update post");
  } catch (err) {
    console.log("update post failed: ");
  }
};

const deletePost = async (post: Post) => {
  try {
    await UserApi.deletePost(String(post.id));
    console.log("success delete post");
  } catch (err) {
    console.log("delete post failed ");
  }
};

const upadteUser = async (user_update: UserUpdate) => {
  const data = {
    id: user_update.id,
    name: user_update.name,
    avatarUrl: user_update.avatarUrl,
  };
  try {
    await UserApi.upadteUser(data);
    console.log("success update user");
  } catch (err) {
    console.log("update user failed: ");
  }
};

export default {
  uploadImage,
  getUserById,
  addNewPost,
  getAllPosts,
  upadteUser,
  updatePost,
  getPostsById,
  deletePost,
  getAllUsers,
};
