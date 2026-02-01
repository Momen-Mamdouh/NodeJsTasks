import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

type Schema = {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
};

export const validate =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        schema.body.parse(req.body);
      }

      if (schema.params) {
        schema.params.parse(req.params);
      }

      if (schema.query) {
        schema.query.parse(req.query);
      }

      next();
    } catch (error: any) {
      res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }
  };
