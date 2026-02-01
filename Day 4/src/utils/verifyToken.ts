import jwt from "jsonwebtoken";
import { ITokenPayload } from "../types";
import APIError from "./APIError";

export const verifyToken = (token: string): Promise<ITokenPayload> => {
  return new Promise((resolve, reject) => {
    const secret = process.env.JWT_SECRET_KEY;

    if (!secret) {
      return reject(new APIError("JWT secret missing", 500));
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded as ITokenPayload);
    });
  });
};
