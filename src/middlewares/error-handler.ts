import { GeneralError } from '../classes/general-error';
import { HTTP_CODES } from '../constants/http-codes';
import { errorResponse } from '../services/error-response';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const errorHandler: ErrorRequestHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.error(
      `detailed information about the error in the service: `,
      error
    );
    const err: GeneralError = errorResponse(error);
    const response = err.buildResponse();

    res.status(err.code).json(response);
  } catch (error) {
    res.status(HTTP_CODES.ServerError).json(error);
  }
};
