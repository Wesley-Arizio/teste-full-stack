import { Request, Response, NextFunction } from "express";
import z from "zod";

export const validate =
  <T extends z.ZodObject>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      console.error(err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: true,
          message: z.flattenError(err),
        });
      }
    }
  };
