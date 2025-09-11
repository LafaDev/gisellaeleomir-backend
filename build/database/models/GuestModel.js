"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestModel = void 0;
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class GuestModel extends sequelize_1.Model {
}
exports.GuestModel = GuestModel;
GuestModel.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    tag: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    going: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    confirmed: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, { tableName: 'guest', sequelize: _1.default, underscored: true, timestamps: false });
