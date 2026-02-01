import { z } from "zod";

export const signUpSchema = {
  body: z
    .object({
      name: z.string().min(3).max(30),
      email: z.string().email("Invalid email"),
      password: z.string().min(8).max(30),
      repeatPassword: z.string(),
      age: z.number().min(18).max(150),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: "Passwords do not match",
      path: ["repeatPassword"],
    }),
};

export const signInSchema = {
  body: z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8).max(30),
  }),
};
