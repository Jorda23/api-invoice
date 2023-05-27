import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

export const productModel = sequelize.define(
  "Product",
  {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.FLOAT(8, 2),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);
