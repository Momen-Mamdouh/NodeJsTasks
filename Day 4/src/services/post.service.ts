import { Post } from "../models/post.model";
import APIError from "../utils/APIError";

export const createPost = async (data: any, userId: string) => {
  return await Post.create({ ...data, userId });
};

export const getAllPosts = async (userId?: string) => {
  const posts = await Post.find().populate("userId", "name email");

  return posts.map((post) => ({
    ...post.toObject(),
    isOwner: userId ? post.userId._id.toString() === userId : false,
  }));
};

export const getPostById = async (id: string, userId?: string) => {
  const post = await Post.findById(id).populate("userId", "name email");
  if (!post) return null;

  return {
    ...post.toObject(),
    isOwner: userId ? post.userId._id.toString() === userId : false,
  };
};

export const updatePostById = async (id: string, data: any, userId: string) => {
  const post = await Post.findById(id);
  if (!post) return null;

  if (post.userId.toString() !== userId) {
    throw new APIError("Forbidden", 403);
  }

  return await Post.findByIdAndUpdate(id, data, { new: true });
};

export const deletePostById = async (id: string, userId: string) => {
  const post = await Post.findById(id);
  if (!post) return null;

  if (post.userId.toString() !== userId) {
    throw new APIError("Forbidden", 403);
  }

  return await Post.findByIdAndDelete(id);
};
