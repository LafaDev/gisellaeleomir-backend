import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UsersService from '../services/UserService';

export default class UsersController {
  private _usersService: UsersService;

  constructor() {
    this._usersService = new UsersService();
  }

  public create = async (req: Request, res: Response) => {
    const newUser = this._usersService.validateBody(req.body);
    await this._usersService.checkExistence(newUser.email);

    const result = await this._usersService.create(newUser);

    res.status(StatusCodes.CREATED).json(result);
  };
}
