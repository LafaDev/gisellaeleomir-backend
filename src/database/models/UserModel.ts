import { DataTypes, Model } from "sequelize";
import sequelize from ".";

export interface UserAtributes {
    id: number;
    email: string;
    password: string;
};

export type UserCreationalAtributes = Omit<UserAtributes, 'id'>;

class UserModel extends Model<UserAtributes, UserCreationalAtributes> {
    declare id: number;
    declare email: string;
    declare password: string;
}

UserModel.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
}, {
    tableName: 'user',
    sequelize, 
    timestamps: false,
});

export default UserModel;
