"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = require("jsonwebtoken");
const handler_error_1 = __importDefault(require("../utils/handler.error"));
class JwtService {
    constructor() {
        this._secretToken = process.env.JWT_SECRET;
        this._errorHandler = new handler_error_1.default();
        this._jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    }
    createToken(data) {
        const token = (0, jsonwebtoken_1.sign)(data, this._secretToken, this._jwtConfig);
        return token;
    }
    validateToken(token) {
        try {
            const data = (0, jsonwebtoken_1.verify)(token, this._secretToken);
            return data;
        }
        catch (e) {
            throw this._errorHandler.InvalidToken();
        }
    }
}
exports.default = JwtService;
