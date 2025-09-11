import NewError from '../interfaces/newerror.interface';

export default class CustomError extends Error implements NewError {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
