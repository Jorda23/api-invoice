import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import { productModel } from "./product.model.js";

export const categoryModel = sequelize.define(
  "category",
  {
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    categoryDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);

categoryModel.hasMany(productModel, {
  foreignKey: "categoryId",
});

productModel.belongsTo(categoryModel, {
  foreignKey: "productId",
});
