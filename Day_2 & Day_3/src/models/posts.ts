import mongoose, { Types } from "mongoose";
import { IPostDocument } from "../types/posts";

const postSchema = new mongoose.Schema<IPostDocument>(
  {
    author: {
      type: Types.ObjectId,
      ref: "Post",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: false,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

postSchema.index({ author: 1 });
postSchema.index({ published: 1 });

const Post = mongoose.model<IPostDocument>("posts", postSchema);

export default Post;
