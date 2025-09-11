import { StatusCodes } from 'http-status-codes';
import CustomError from './custom.error';

export default class ErrorHandler {
  protected status: number;
  protected message: string;

  constructor() {
    this.status = 500;
    this.message = 'Something went wrong';
  }

  public Joi = (err: Error) => {
    this.status = StatusCodes.BAD_REQUEST;
    this.message = err.message;
    return new CustomError(this.message, this.status);
  };

  public InvalidToken = () => {
    this.status = StatusCodes.UNAUTHORIZED;
    this.message = 'Token must be a valid token';
    return new CustomError(this.message, this.status);
  };

  public EmptyToken = () => {
    this.status = StatusCodes.BAD_REQUEST;
    this.message = 'Request must provide a token';
    return new CustomError(this.message, this.status);
  };

  public BadRequest = () => {
    this.status = StatusCodes.BAD_REQUEST;
    this.message = 'All fields must be filled';
    return new CustomError(this.message, this.status);
  };

  public Unauthorized = () => {
    this.status = StatusCodes.UNAUTHORIZED;
    this.message = 'Incorrect email or password';
    return new CustomError(this.message, this.status);
  };

  public InternalServerError = () => {
    this.status = StatusCodes.INTERNAL_SERVER_ERROR;
    this.message = 'Something went wrong';
    return new CustomError(this.message, this.status);
  };

  public ConflitError = () => {
    this.status = StatusCodes.CONFLICT;
    this.message = 'Data already exists';
    return new CustomError(this.message, this.status);
  };

  // ✅ Add NotFound method
  public NotFound = () => {
    this.status = StatusCodes.NOT_FOUND;
    this.message = 'Resource not found';
    return new CustomError(this.message, this.status);
  };
}
