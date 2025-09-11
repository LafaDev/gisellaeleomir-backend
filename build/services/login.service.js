"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import { compare } from 'bcrypt';
const jwt_service_1 = __importDefault(require("./jwt.service"));
const handler_error_1 = __importDefault(require("../utils/handler.error"));
const UserModel_1 = __importDefault(require("../database/models/UserModel"));
class LoginService {
    constructor() {
        this.validateBody = (email, password) => {
            const schema = joi_1.default.object({
                email: joi_1.default.string().email().required().min(5),
                password: joi_1.default.string().required().min(6),
            });
            const { error, value } = schema.validate({ email, password });
            if (error) {
                throw this._errorHandler.BadRequest();
            }
            return value;
        };
        this.login = (email, userPassword) => __awaiter(this, void 0, void 0, function* () {
            console.log("service 1");
            const user = (yield UserModel_1.default.findOne({ raw: true, where: { email } })) || { password: '' };
            console.log("service 2");
            console.log("userPassword: ", userPassword);
            console.log("user.password: ", user.password);
            console.log(user);
            const validation = yield bcrypt_1.default.compare(userPassword, user.password);
            console.log("service 3: validation");
            if (!user || !validation)
                throw this._errorHandler.Unauthorized();
            console.log("service 4");
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            console.log("service 5");
            const token = this._jwtService.createToken(userWithoutPassword);
            console.log("service 6");
            return token;
        });
        this._errorHandler = new handler_error_1.default();
        this._jwtService = new jwt_service_1.default();
    }
}
exports.default = LoginService;
