import mongoose from "mongoose";
import { IUser, Role } from "../types";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    age: { type: Number, required: true },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", userSchema);
