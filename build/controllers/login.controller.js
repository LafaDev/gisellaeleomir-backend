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
const http_status_codes_1 = require("http-status-codes");
const joi_1 = __importDefault(require("joi"));
const login_service_1 = __importDefault(require("../services/login.service"));
const jwt_service_1 = __importDefault(require("../services/jwt.service"));
const handler_error_1 = __importDefault(require("../utils/handler.error"));
class LoginController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            console.log("teste - 1:", email, password);
            this._loginService.validateBody(email, password);
            console.log("teste - 2: validate");
            const user = yield this._loginService.login(email, password);
            console.log("teste - 3: user");
            res.status(http_status_codes_1.StatusCodes.OK).json({ token: user });
        });
        this.validate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            const { error } = joi_1.default.object({
                authorization: joi_1.default.string().not().empty().required(),
            }).validate({ authorization });
            if (error || !authorization)
                return next(this._errorHandler.EmptyToken());
            const data = this._jwtService.validateToken(authorization);
            const { email } = data;
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: `${email} authorized` });
        });
        this._loginService = new login_service_1.default();
        this._jwtService = new jwt_service_1.default();
        this._errorHandler = new handler_error_1.default();
    }
}
exports.default = LoginController;
