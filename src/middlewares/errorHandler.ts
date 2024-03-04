import { NextFunction, Request, Response } from 'express';

export class ResponseError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = async (
  error: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  res.status(error.statusCode).json(error.message);
};
