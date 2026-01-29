import { Request, Response, NextFunction } from "express";
import { IParamsWithId } from "../types";
import PostService from "../services/post.service";

class PostsController {
  static async getAllPosts(req: Request, res: Response, next: NextFunction) {
    const posts = await PostService.getAllPosts();
    return res
      .status(200)
      .json({ message: "Posts fetched successfully", data: posts });
  }

  static async getPostById(
    req: Request<IParamsWithId>,
    res: Response,
    next: NextFunction,
  ) {
    const post = await PostService.getPostById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res
      .status(200)
      .json({ message: "Post fetched successfully", data: post });
  }

  static async createPost(req: Request, res: Response, next: NextFunction) {
    const post = await PostService.createPost(req.body);
    return res
      .status(201)
      .json({ message: "Post created successfully", data: post });
  }

  static async updatePost(
    req: Request<IParamsWithId>,
    res: Response,
    next: NextFunction,
  ) {
    const post = await PostService.updatePost(req.params.id, req.body);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res
      .status(200)
      .json({ message: "Post updated successfully", data: post });
  }

  static async deletePost(
    req: Request<IParamsWithId>,
    res: Response,
    next: NextFunction,
  ) {
    const post = await PostService.deletePost(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ message: "delete Post with id" });
  }
}

export default PostsController;
