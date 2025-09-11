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
const UserService_1 = __importDefault(require("../services/UserService"));
class UsersController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUser = this._usersService.validateBody(req.body);
            yield this._usersService.checkExistence(newUser.email);
            const result = yield this._usersService.create(newUser);
            res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
        });
        this._usersService = new UserService_1.default();
    }
}
exports.default = UsersController;
