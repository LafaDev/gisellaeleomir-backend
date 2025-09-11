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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const bcrypt = require('bcrypt');
const Joi = require("joi");
const handler_error_1 = __importDefault(require("../utils/handler.error"));
const UserModel_1 = __importDefault(require("../database/models/UserModel"));
class UsersService {
    constructor() {
        this.validateBody = (data) => {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required().min(6),
            });
            const { error, value } = schema.validate(data);
            if (error)
                throw this._errorHandler.BadRequest();
            return value;
        };
        this.checkExistence = (email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.default.findOne({ where: { email } });
            if (user)
                throw this._errorHandler.ConflitError();
        });
        this.create = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = this.validateBody(data);
                const hashedPassword = yield bcrypt.hash(password, this._salt);
                const user = yield UserModel_1.default.create({
                    email,
                    password: hashedPassword,
                });
                return user;
            }
            catch (e) {
                console.error(e);
                throw this._errorHandler.InternalServerError();
            }
        });
        this.delete = (email) => __awaiter(this, void 0, void 0, function* () {
            yield UserModel_1.default.destroy({ where: { email } });
        });
        this._errorHandler = new handler_error_1.default();
        this._salt = Number(process.env.SALT_SECRET) || 12; // ✅ use 12 rounds, not 20
    }
}
exports.default = UsersService;
