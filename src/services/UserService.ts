import 'dotenv/config';
const bcrypt = require('bcrypt');
import Joi = require('joi');
import ErrorHandler from '../utils/handler.error';
import Users from '../database/models/UserModel';
import User from '../interfaces/user.interface';

export default class UsersService {
  private _errorHandler: ErrorHandler;
  private _salt: number;

  constructor() {
    this._errorHandler = new ErrorHandler();
    this._salt = Number(process.env.SALT_SECRET) || 12; // ✅ use 12 rounds, not 20
  }

  public validateBody = (data: any) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    });
    const { error, value } = schema.validate(data);
    if (error) throw this._errorHandler.BadRequest();
    return value;
  }

  public checkExistence = async (email: string) => {
    const user = await Users.findOne({ where: { email } });
    if (user) throw this._errorHandler.ConflitError();
  }

  public create = async (data: User) => {
    try {
      const { email, password } = this.validateBody(data);

      const hashedPassword = await bcrypt.hash(password, this._salt);

      const user = await Users.create({
        email,
        password: hashedPassword,
      });

      return user;
    } catch (e) {
      console.error(e);
      throw this._errorHandler.InternalServerError();
    }
  }

  public delete = async (email: string) => {
    await Users.destroy({ where: { email } });
  }
}
