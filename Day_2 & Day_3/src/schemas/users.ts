import { z } from "zod";
import { IGenralSchema, Role } from "../types";

export const createUserSchema: IGenralSchema = {
  body: z
    .object({
      name: z.string().min(3),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
      email: z.string().email("Invalid email address"),
      repeatPassword: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
      age: z.number().min(18).max(100),
    })
    .refine((data) => data.password === data.repeatPassword, {
      path: ["repeatPassword"],
      message: "Passwords do not match",
    }),
};

export const getUserByIdSchema: IGenralSchema = {
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
  }),
};

export const updateUserSchema: IGenralSchema = {
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
  }),
  body: z.object({
    name: z.string().min(3).optional(),
    email: z.string().email("Invalid email address").optional(),
    age: z.number().min(18).max(100).optional(),
  }),
};

export const deleteUserSchema: IGenralSchema = {
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
  }),
};
