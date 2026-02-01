import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/verifyToken";
import APIError from "../utils/APIError";
import { IAuthRequest } from "../types";

export const auth = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      throw new APIError("Unauthorized", 401);
    }

    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new APIError("Unauthorized", 401);
    }

    const decoded = await verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};
