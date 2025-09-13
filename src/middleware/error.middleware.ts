import { NextFunction, Request, Response } from 'express';
import NewError from '../interfaces/newerror.interface';

const errorMiddleware = (err: NewError, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500; // fallback to 500 if undefined
  const message = err.message || 'Internal Server Error';
  
  console.error(err); // optional: log the full error for debugging

  res.status(status).json({ message });
};

export default errorMiddleware;
