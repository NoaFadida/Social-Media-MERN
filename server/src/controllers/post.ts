import { Request, Response } from "express";
import Post from "../models/post_model";

const getAllPostsEvent = async () => {
  console.log("");
  try {
    const posts = await Post.find();
    return { status: "OK", data: posts };
  } catch (err) {
    return { status: "FAIL", data: "" };
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    let posts = {};
    if (req.query.sender == null) {
      posts = await Post.find();
    } else {
      posts = await Post.find({ sender: req.query.sender });
    }
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send({ error: "Failed to get posts from DB" });
  }
};

const getPostsById = async (req: Request, res: Response) => {
  try {
    const post = await Post.find({ sender: req.params.id });
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send({ error: "Failed to get post from DB" })
  }
};

const addNewPost = async (req: Request, res: Response) => {
  if (!req.body.avatarUrl) {
    console.log("avatarUrl is required!");
    return res.status(400).send({ error: "avatarUrl is required!" });
  }
  let fixStr = req.body.avatarUrl.toString();
  let result = fixStr.replace("\\", "/");
  const post = new Post({
    message: req.body.message,
    sender: req.body.sender,
    avatarUrl: result,
  });
  try {
    console.log('post',post)
    const newPost = await post.save();
    console.log("post saved in DB");
    res.status(200).send(newPost);
  } catch (err) {
    console.log("failed to save post in DB");
    res.status(400).send({ error: "Failed add post to DB" });
  }
};

const updatePost = async (req: Request, res: Response) => {
  const message = req.body.message;
  const id = req.body.id;

  try {
    const post = await Post.findByIdAndUpdate(id, {
      $set: {
        message,
      },
    });

    await post.save();
    res.status(200).send({ msg: "Update succes", status: 200 });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const P = await Post.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "delete succes", status: 200 });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

export = {
  getAllPosts,
  addNewPost,
  getPostsById,
  getAllPostsEvent,
  updatePost,
  deletePost,
};
