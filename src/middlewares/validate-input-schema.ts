import { NextFunction, Request, Response } from 'express';

export const validateSchema = (schema, payload) => (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(req[payload]);
  if (error) {
    throw error;
  }

  next();
};
