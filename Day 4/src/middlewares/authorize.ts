import { Response, NextFunction } from "express";
import { Role, IAuthRequest } from "../types";
import APIError from "../utils/APIError";

export const authorize =
  (...roles: Role[]) =>
  (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new APIError("Forbidden", 403);
    }
    next();
  };
