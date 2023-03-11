import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  message: {
    type: String,
    required: false,
  },
  sender: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
});

export = mongoose.model("Post", postSchema);
