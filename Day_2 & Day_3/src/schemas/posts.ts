import { z } from "zod";
import { IGenralSchema } from "../types";

export const createPostchema: IGenralSchema = {
  body: z.object({
    author: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid author ID"),
    title: z
      .string()
      .min(3, "Title must be at least 3 characters long")
      .max(200, "Title must be at max 200 characters long"),
    content: z.string().min(10, "Content must be at least 10 characters long"),
    tags: z.array(z.string()).optional(),
    published: z.boolean().default(false),
  }),
};

export const updatePostSchema: IGenralSchema = {
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid author ID"),
  }),
  body: z
    .object({
      author: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid author ID"),
      title: z
        .string()
        .min(3, "Title must be at least 3 characters long")
        .max(200, "Title must be at max 200 characters long"),
      content: z
        .string()
        .min(10, "Content must be at least 10 characters long"),
      tags: z.array(z.string()).optional(),
      published: z.boolean().default(false),
    })
    .optional(),
};

export const getPostByIdSchema: IGenralSchema = {
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid author ID"),
  }),
};

export const deletePostSchema: IGenralSchema = {
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid author ID"),
  }),
};
