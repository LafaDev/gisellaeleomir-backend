import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import { GuestModel } from './GuestModel';

export interface AccompanyAttributes {
  id: number;
  name: string;
  guestId: number;
  going: boolean;
  confirmed: boolean;
  guest?: any;
}

export type AccompanyCreationalAttributes = Omit<AccompanyAttributes, 'id'>;

export class AccompanyModel extends Model<AccompanyAttributes, AccompanyCreationalAttributes> {
  declare id: number;
  declare name: string;
  declare guestId: number;
  declare going: boolean;
  declare confirmed: boolean;
  declare guest?: any;
}

AccompanyModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'guest', key: 'id' },
      field: 'guest_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    going: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    confirmed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  { tableName: 'accompany', sequelize, underscored: true, timestamps: false }
);
