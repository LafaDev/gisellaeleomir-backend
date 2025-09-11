"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccompanyModel = void 0;
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class AccompanyModel extends sequelize_1.Model {
}
exports.AccompanyModel = AccompanyModel;
AccompanyModel.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    guestId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'guest', key: 'id' },
        field: 'guest_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    going: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    confirmed: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, { tableName: 'accompany', sequelize: _1.default, underscored: true, timestamps: false });
