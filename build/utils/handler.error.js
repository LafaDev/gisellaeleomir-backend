"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const custom_error_1 = __importDefault(require("./custom.error"));
class ErrorHandler {
    constructor() {
        this.Joi = (err) => {
            this.status = http_status_codes_1.StatusCodes.BAD_REQUEST;
            this.message = err.message;
            return new custom_error_1.default(this.message, this.status);
        };
        this.InvalidToken = () => {
            this.status = http_status_codes_1.StatusCodes.UNAUTHORIZED;
            this.message = 'Token must be a valid token';
            return new custom_error_1.default(this.message, this.status);
        };
        this.EmptyToken = () => {
            this.status = http_status_codes_1.StatusCodes.BAD_REQUEST;
            this.message = 'Request must provide a token';
            return new custom_error_1.default(this.message, this.status);
        };
        this.BadRequest = () => {
            this.status = http_status_codes_1.StatusCodes.BAD_REQUEST;
            this.message = 'All fields must be filled';
            return new custom_error_1.default(this.message, this.status);
        };
        this.Unauthorized = () => {
            this.status = http_status_codes_1.StatusCodes.UNAUTHORIZED;
            this.message = 'Incorrect email or password';
            return new custom_error_1.default(this.message, this.status);
        };
        this.InternalServerError = () => {
            this.status = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
            this.message = 'Something went wrong';
            return new custom_error_1.default(this.message, this.status);
        };
        this.ConflitError = () => {
            this.status = http_status_codes_1.StatusCodes.CONFLICT;
            this.message = 'Data already exists';
            return new custom_error_1.default(this.message, this.status);
        };
        // ✅ Add NotFound method
        this.NotFound = () => {
            this.status = http_status_codes_1.StatusCodes.NOT_FOUND;
            this.message = 'Resource not found';
            return new custom_error_1.default(this.message, this.status);
        };
        this.status = 500;
        this.message = 'Something went wrong';
    }
}
exports.default = ErrorHandler;
