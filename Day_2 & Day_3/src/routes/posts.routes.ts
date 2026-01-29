import { Router } from "express";
import validateSchema from "../middlewares/validator";
import {
  createPostchema,
  updatePostSchema,
  getPostByIdSchema,
  deletePostSchema,
} from "../schemas/posts";
import PostsController from "../controllers/posts.controller";
import { IParamsWithId } from "../types";

const router = Router();

// get all posts
router.get("/", PostsController.getAllPosts);

// get with id
router.get<IParamsWithId>(
  "/:id",
  validateSchema(getPostByIdSchema),
  PostsController.getPostById,
);

// create a new post
router.post("/", validateSchema(createPostchema), PostsController.createPost);

// update with id
router.patch<IParamsWithId>(
  "/:id",
  validateSchema(updatePostSchema),
  PostsController.updatePost,
);

// delete with id
router.delete<IParamsWithId>(
  "/:id",
  validateSchema(deletePostSchema),
  PostsController.deletePost,
);

export default router;
