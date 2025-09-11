import { NextFunction, Request, Response } from 'express';
import NewError from '../interfaces/newerror.interface';

const errorMiddleware = (err: NewError, _req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err;
  res.status(status).json({ message });
};

export default errorMiddleware;
