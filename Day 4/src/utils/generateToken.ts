import jwt from "jsonwebtoken";
import { ITokenPayload } from "../types";
import APIError from "./APIError";

export const generateToken = (payload: ITokenPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    const secret = process.env.JWT_SECRET_KEY;

    if (!secret) {
      return reject(new APIError("JWT secret missing", 500));
    }

    jwt.sign(payload, secret, { expiresIn: "1h" }, (err, token) => {
      if (err || !token) return reject(err);
      resolve(token);
    });
  });
};
