import bcrypt from "bcrypt";

import APIError from "../utils/APIError";
import { generateToken } from "../utils/generateToken";
import { User } from "../models/users";

export const signUp = async (data: any) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new APIError("Email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  const { password, ...safeUser } = user.toObject();

  return safeUser;
};

export const signIn = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new APIError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new APIError("Invalid email or password", 401);
  }

  const token = await generateToken({
    userId: user._id.toString(),
    role: user.role,
  });

  const { password: pwd, ...safeUser } = user.toObject();

  return {
    accessToken: token,
    user: safeUser,
  };
};
