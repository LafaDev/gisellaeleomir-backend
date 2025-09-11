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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccompanyModel = exports.GuestModel = exports.initModels = void 0;
const GuestModel_1 = require("./GuestModel");
Object.defineProperty(exports, "GuestModel", { enumerable: true, get: function () { return GuestModel_1.GuestModel; } });
const AccompanyModel_1 = require("./AccompanyModel");
Object.defineProperty(exports, "AccompanyModel", { enumerable: true, get: function () { return AccompanyModel_1.AccompanyModel; } });
const initModels = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Create associations
    GuestModel_1.GuestModel.hasMany(AccompanyModel_1.AccompanyModel, { foreignKey: 'guestId', as: 'accompany' });
    AccompanyModel_1.AccompanyModel.belongsTo(GuestModel_1.GuestModel, { foreignKey: 'guestId', as: 'guest' });
    // Sync tables
    yield ((_a = GuestModel_1.GuestModel.sequelize) === null || _a === void 0 ? void 0 : _a.sync({ alter: true }));
    console.log('✅ Models initialized and database synced');
});
exports.initModels = initModels;
