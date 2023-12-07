import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from "../umzug";
import { DataTypes } from "sequelize";

interface UserInterface extends Model<InferAttributes<UserInterface>, InferCreationAttributes<UserInterface>> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<number>;
    name: string;
    chatId: number;
  }

export const users = sequelize.define<UserInterface>("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chatId: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
});