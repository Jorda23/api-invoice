import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
// import { productModel } from "./product.model.js";
import { invoiceModel } from "./invoice.model.js";
import { productModel } from "./product.model.js";

export const invoiceDetailModel = sequelize.define(
  "invoiceDetail",
  {
    invoiceDetailId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    qty: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: false,
    }
  },
  {
    timestamps: false,
  }
);


invoiceModel.hasMany(invoiceDetailModel, {
  foreignKey: "invoiceNumber"
})

invoiceDetailModel.belongsTo(invoiceModel, {
  foreignKey: "invoiceNumber"
})

productModel.hasMany(invoiceDetailModel, {
  foreignKey: "productId"
})

invoiceDetailModel.belongsTo(productModel, {
  foreignKey: "productId"
})
