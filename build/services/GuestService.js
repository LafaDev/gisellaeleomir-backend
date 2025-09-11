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
const handler_error_1 = __importDefault(require("../utils/handler.error"));
const GuestModel_1 = require("../database/models/GuestModel");
const AccompanyModel_1 = require("../database/models/AccompanyModel");
class GuestService {
    constructor() {
        /** Validate guest creation / update */
        this.validateGuestBody = (data) => {
            const schema = joi_1.default.object({
                name: joi_1.default.string().required().min(2),
                tag: joi_1.default.string().required().min(2),
            });
            const { error, value } = schema.validate(data, { stripUnknown: true }); // ✅ safer
            if (error)
                throw this._errorHandler.BadRequest();
            return value;
        };
        /** Validate accompany creation / update */
        this.validateAccompanyBody = (data) => {
            const schema = joi_1.default.object({
                name: joi_1.default.string().required().min(2),
            });
            const { error, value } = schema.validate(data, { stripUnknown: true }); // ✅ safer
            if (error)
                throw this._errorHandler.BadRequest();
            return value;
        };
        /** Create a new guest */
        this.createGuest = (data) => __awaiter(this, void 0, void 0, function* () {
            const { name, tag } = this.validateGuestBody(data);
            const existing = yield GuestModel_1.GuestModel.findOne({ where: { tag } });
            if (existing)
                throw this._errorHandler.ConflitError();
            return yield GuestModel_1.GuestModel.create({ name, tag, going: false, confirmed: false });
        });
        /** Update guest by ID (partial update allowed) */
        this.updateGuest = (id, data) => __awaiter(this, void 0, void 0, function* () {
            const guest = yield GuestModel_1.GuestModel.findByPk(id);
            if (!guest)
                throw this._errorHandler.NotFound();
            const { name, tag } = this.validateGuestBody(Object.assign(Object.assign({}, guest.toJSON()), data));
            if (name)
                guest.name = name;
            if (tag)
                guest.tag = tag;
            yield guest.save();
            return guest;
        });
        /** Create an accompany for a guest */
        this.createAccompany = (guestId, data) => __awaiter(this, void 0, void 0, function* () {
            const { name } = this.validateAccompanyBody(data);
            const guest = yield GuestModel_1.GuestModel.findByPk(guestId);
            if (!guest)
                throw this._errorHandler.NotFound();
            return yield AccompanyModel_1.AccompanyModel.create({
                guestId,
                name,
                going: false,
                confirmed: false,
            });
        });
        /** Update accompany by ID (partial update allowed) */
        this.updateAccompany = (guestId, accompanyId, data) => __awaiter(this, void 0, void 0, function* () {
            const accompany = yield AccompanyModel_1.AccompanyModel.findByPk(accompanyId);
            if (!accompany || accompany.guestId !== guestId)
                throw this._errorHandler.NotFound();
            const { name } = this.validateAccompanyBody(Object.assign(Object.assign({}, accompany.toJSON()), data));
            if (name)
                accompany.name = name;
            yield accompany.save();
            return accompany;
        });
        /** Update guest or accompany status */
        this.updateStatus = (id, type, going, confirmed) => __awaiter(this, void 0, void 0, function* () {
            if (type === 'guest') {
                const guest = yield GuestModel_1.GuestModel.findByPk(id);
                if (!guest)
                    throw this._errorHandler.NotFound();
                guest.going = going;
                guest.confirmed = confirmed;
                yield guest.save();
                return guest;
            }
            else {
                const accompany = yield AccompanyModel_1.AccompanyModel.findByPk(id);
                if (!accompany)
                    throw this._errorHandler.NotFound();
                accompany.going = going;
                accompany.confirmed = confirmed;
                yield accompany.save();
                return accompany;
            }
        });
        /** Find guest by tag + all accompanies */
        this.findByTag = (tag) => __awaiter(this, void 0, void 0, function* () {
            const guest = yield GuestModel_1.GuestModel.findOne({
                where: { tag },
                include: [{ model: AccompanyModel_1.AccompanyModel, as: 'accompany' }],
                order: [[{ model: AccompanyModel_1.AccompanyModel, as: 'accompany' }, 'id', 'ASC']],
            });
            if (!guest)
                throw this._errorHandler.NotFound();
            return guest;
        });
        /** Find all guests + accompanies */
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            const guests = yield GuestModel_1.GuestModel.findAll({
                include: [{ model: AccompanyModel_1.AccompanyModel, as: 'accompany' }],
                order: [
                    ['id', 'ASC'],
                    [{ model: AccompanyModel_1.AccompanyModel, as: 'accompany' }, 'id', 'ASC'],
                ],
            });
            return guests.map((g) => {
                var _a;
                return (Object.assign(Object.assign({}, g.toJSON()), { accompany: (_a = g.accompany) !== null && _a !== void 0 ? _a : [] }));
            });
        });
        /** Delete guest */
        this.deleteGuest = (id) => __awaiter(this, void 0, void 0, function* () {
            const guest = yield GuestModel_1.GuestModel.findByPk(id);
            if (!guest)
                throw this._errorHandler.NotFound();
            yield guest.destroy();
            return { message: 'Guest deleted successfully' };
        });
        /** Delete accompany */
        this.deleteAccompany = (id) => __awaiter(this, void 0, void 0, function* () {
            const accompany = yield AccompanyModel_1.AccompanyModel.findByPk(id);
            if (!accompany)
                throw this._errorHandler.NotFound();
            yield accompany.destroy();
            return { message: 'Accompany deleted successfully' };
        });
        this._errorHandler = new handler_error_1.default();
    }
}
exports.default = GuestService;
