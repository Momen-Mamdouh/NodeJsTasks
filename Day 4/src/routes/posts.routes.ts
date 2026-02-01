import { Router } from "express";
import * as postsController from "../controllers/posts.controller";

import { auth } from "../middlewares/auth";

import { validate } from "../middlewares/validate.middleware";
import { createPostSchema, updatePostSchema } from "../schemas/posts";

const router = Router();

router.use(auth);

router.post("/", validate(createPostSchema), postsController.createPost);
router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.patch(
  "/:id",
  validate(updatePostSchema),
  postsController.updatePostById,
);
router.delete("/:id", postsController.deletePostById);

export default router;
