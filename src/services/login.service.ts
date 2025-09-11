import Joi from 'joi';
import bcrypt from 'bcrypt';
// import { compare } from 'bcrypt';
import JwtService from './jwt.service';
import ErrorHandler from '../utils/handler.error';
import Users from '../database/models/UserModel';
import User from '../interfaces/user.interface';

export default class LoginService {
  private _errorHandler: ErrorHandler;
  private _jwtService: JwtService;

  constructor() {
    this._errorHandler = new ErrorHandler();
    this._jwtService = new JwtService();
  }

  public validateBody = (email: string, password: string) => {
    const schema = Joi.object({
      email: Joi.string().email().required().min(5),
      password: Joi.string().required().min(6),
    });
    
    const { error, value } = schema.validate({ email, password });

    if (error) {
      throw this._errorHandler.BadRequest();
    }
    
    return value;
  }

  public login = async (email: string, userPassword : string) => {
    console.log("service 1")
    const user = await Users.findOne({ raw: true, where: { email }}) || { password: '' }
    console.log("service 2")
    console.log("userPassword: ", userPassword);
    console.log("user.password: ", user.password);
    console.log(user);
    const validation = await bcrypt.compare(userPassword, user.password);
    console.log("service 3: validation")

    if (!user || !validation) throw this._errorHandler.Unauthorized();
    console.log("service 4")

    const { password, ...userWithoutPassword } = user;
    console.log("service 5")
    const token = this._jwtService.createToken(userWithoutPassword as User);
    console.log("service 6")

    return token
  }
}