import 'dotenv/config';
import { Secret, sign, verify, Algorithm } from 'jsonwebtoken';
import ErrorHandler from '../utils/handler.error';
import User from '../interfaces/user.interface';

export default class JwtService {
  private _secretToken: Secret;
  private _errorHandler: ErrorHandler;
  private _jwtConfig: { expiresIn: number | string | undefined , algorithm: Algorithm };

  constructor() {
    this._secretToken = process.env.JWT_SECRET as Secret;
    this._errorHandler = new ErrorHandler();
    this._jwtConfig = { expiresIn: '7d', algorithm: 'HS256' }
  }

  public createToken(data: User): string {
    const token = sign(data as object, this._secretToken, this._jwtConfig as any);
    return token
  }

  public validateToken(token: string) {
    try {
      const data = verify(token, this._secretToken);
      return data as User;
    } catch (e) {
      throw this._errorHandler.InvalidToken();
    }
  }
}
