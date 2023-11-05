import { databaseConnection } from "./databaseConnection.js";
import { Sequelize, DataTypes } from "sequelize";

const Account = databaseConnection.define(
  "Account",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Please input a valid email address format." },
      },
    },
  },
  {
    timestamps: {
      createdAt: "account_creation_date",
      updatedAt: "account_last_updated",
    },
  }
);

export default Account;
