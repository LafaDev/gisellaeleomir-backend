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
const GuestService_1 = __importDefault(require("../services/GuestService"));
// import GuestService from '../services/GuestService';
class GuestController {
    constructor() {
        /** Create a new guest */
        this.createGuest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const guest = yield this._guestService.createGuest(req.body);
                return res.status(201).json(guest);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
        /** Update guest */
        this.updateGuest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const updated = yield this._guestService.updateGuest(id, req.body);
                return res.status(200).json(updated);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
        /** Create an accompany for a guest */
        this.createAccompany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const guestId = Number(req.params.guestId);
                const accompany = yield this._guestService.createAccompany(guestId, req.body);
                return res.status(201).json(accompany);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
        /** Update accompany */
        this.updateAccompany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const guestId = Number(req.params.guestId);
                const accompanyId = Number(req.params.id); // ✅ fixed: use "id", not "accompanyId"
                const updated = yield this._guestService.updateAccompany(guestId, accompanyId, req.body);
                return res.status(200).json(updated);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
        /** Get guest + all accompanies by tag */
        this.getGuestByTag = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tag = req.params.tag;
                const guest = yield this._guestService.findByTag(tag);
                return res.status(200).json(guest);
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
        });
        /** Get all guests with accompanies */
        this.getAllGuests = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const guests = yield this._guestService.findAll();
                return res.status(200).json(guests);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
        /** Update going/confirmed status for guest or accompany */
        this.updateStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const { type, going, confirmed } = req.body;
                const updated = yield this._guestService.updateStatus(id, type, going, confirmed);
                return res.status(200).json(updated);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
        /** Delete a guest */
        this.deleteGuest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const result = yield this._guestService.deleteGuest(id);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
        /** Delete an accompany */
        this.deleteAccompany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params);
                const id = Number(req.params.id);
                console.log(id);
                const result = yield this._guestService.deleteAccompany(id);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
        this._guestService = new GuestService_1.default();
    }
}
exports.default = GuestController;
