import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from 'joi';
import LoginService from '../services/login.service';
import JwtService from "../services/jwt.service";
import ErrorHandler from "../utils/handler.error";

export default class LoginController {
  private _loginService: LoginService;
  private _jwtService: JwtService;
  private _errorHandler: ErrorHandler;

  constructor() {
    this._loginService = new LoginService();
    this._jwtService = new JwtService();
    this._errorHandler = new ErrorHandler();
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log("teste - 1:" , email, password);
    this._loginService.validateBody(email, password);
    console.log("teste - 2: validate");

    const user = await this._loginService.login(email, password);
    console.log("teste - 3: user");

    res.status(StatusCodes.OK).json({ token: user })
  }

  public validate = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    const { error } = Joi.object({
      authorization: Joi.string().not().empty().required(),
    }).validate({ authorization });

    if (error || !authorization) return next(this._errorHandler.EmptyToken());

    const data = this._jwtService.validateToken(authorization);
    const { email } = data;

    res.status(StatusCodes.OK).json({ message: `${email} authorized` });
  }
}