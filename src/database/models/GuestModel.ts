import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import { AccompanyModel } from './AccompanyModel';

export interface GuestAttributes {
  id: number;
  name: string;
  tag: string;
  going: boolean;
  confirmed: boolean;
  accompany?: any[];
}

export type GuestCreationalAttributes = Omit<GuestAttributes, 'id'>;

export class GuestModel extends Model<GuestAttributes, GuestCreationalAttributes> {
  declare id: number;
  declare name: string;
  declare tag: string;
  declare going: boolean;
  declare confirmed: boolean;
  declare accompany?: any[];
}

GuestModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    tag: { type: DataTypes.STRING, allowNull: false },
    going: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    confirmed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  { tableName: 'guest', sequelize, underscored: true, timestamps: false }
);
