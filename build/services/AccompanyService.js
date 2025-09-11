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
const joi_1 = __importDefault(require("joi"));
const AccompanyModel_1 = require("../database/models/AccompanyModel");
const GuestModel_1 = require("../database/models/GuestModel");
const handler_error_1 = __importDefault(require("../utils/handler.error"));
class AccompanyService {
    constructor() {
        /** Validate accompany creation/update */
        this.validateBody = (data) => {
            const schema = joi_1.default.object({
                name: joi_1.default.string().required().min(2),
            });
            const { error, value } = schema.validate(data);
            if (error)
                throw this._errorHandler.BadRequest();
            return value;
        };
        /** Create accompany for a guest */
        this.createAccompany = (guestId, data) => __awaiter(this, void 0, void 0, function* () {
            const { name } = this.validateBody(data);
            const guest = yield GuestModel_1.GuestModel.findByPk(guestId);
            if (!guest)
                throw this._errorHandler.NotFound();
            return yield AccompanyModel_1.AccompanyModel.create({
                name,
                guestId,
                going: false,
                confirmed: false,
            });
        });
        /** Update accompany name */
        this.updateAccompany = (id, data) => __awaiter(this, void 0, void 0, function* () {
            const { name } = this.validateBody(data);
            const accompany = yield AccompanyModel_1.AccompanyModel.findByPk(id);
            if (!accompany)
                throw this._errorHandler.NotFound();
            accompany.name = name;
            yield accompany.save();
            return accompany;
        });
        /** Delete accompany by ID */
        this.deleteAccompany = (id) => __awaiter(this, void 0, void 0, function* () {
            const accompany = yield AccompanyModel_1.AccompanyModel.findByPk(id);
            if (!accompany)
                throw this._errorHandler.NotFound();
            yield accompany.destroy();
            return { message: 'Accompany deleted successfully' };
        });
        /** Update accompany status (going / confirmed) */
        this.updateStatus = (id, going, confirmed) => __awaiter(this, void 0, void 0, function* () {
            const accompany = yield AccompanyModel_1.AccompanyModel.findByPk(id);
            if (!accompany)
                throw this._errorHandler.NotFound();
            accompany.going = going;
            accompany.confirmed = confirmed;
            yield accompany.save();
            return accompany;
        });
        /** Get all accompanies for a guest */
        this.getAccompaniesByGuest = (guestId) => __awaiter(this, void 0, void 0, function* () {
            const guest = yield GuestModel_1.GuestModel.findByPk(guestId, {
                include: [{ model: AccompanyModel_1.AccompanyModel, as: 'accompany' }],
            });
            if (!guest)
                throw this._errorHandler.NotFound();
            return guest.accompany || [];
        });
        this._errorHandler = new handler_error_1.default();
    }
}
exports.default = AccompanyService;
