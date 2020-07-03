import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  const status: number = error.status || 500;
  const message: string = error.message || 'Something went wrong';
  const code: number = error.code || -999;

  console.error('[ERROR] ', status, message);

  res.status(status).json({ message, code});
}

export default errorMiddleware;
