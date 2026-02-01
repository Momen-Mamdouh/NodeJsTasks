import { Response, NextFunction } from "express";
import * as PostService from "../services/post.service";
import { IAuthRequest } from "../types";
import APIError from "../utils/APIError";

export const createPost = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await PostService.createPost(req.body, req.user!.userId);
    res.status(201).json({ message: "Post created", data: post });
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const posts = await PostService.getAllPosts(req.user?.userId);
    res.status(200).json({ message: "Posts retrieved", data: posts });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const post = await PostService.getPostById(id, req.user?.userId);
    if (!post) throw new APIError("Post not found", 404);

    res.status(200).json({ message: "Post retrieved", data: post });
  } catch (error) {
    next(error);
  }
};

export const updatePostById = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const post = await PostService.updatePostById(
      id,
      req.body,
      req.user!.userId,
    );

    if (!post) throw new APIError("Post not found", 404);

    res.status(200).json({ message: "Post updated", data: post });
  } catch (error) {
    next(error);
  }
};

export const deletePostById = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const post = await PostService.deletePostById(id, req.user!.userId);
    if (!post) throw new APIError("Post not found", 404);

    res.status(200).json({ message: "Post deleted", data: post });
  } catch (error) {
    next(error);
  }
};
