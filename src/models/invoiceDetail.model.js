import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import { productModel } from "./product.model.js";
import { invoiceModel } from "./invoice.model.js";

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
  },
  {
    timestamps: false,
  }
);

invoiceDetailModel.hasMany(productModel, {
  foreignKey: "productId",
});

productModel.belongsTo(invoiceDetailModel, {
  foreignKey: "productId",
});

invoiceModel.hasMany(invoiceDetailModel, {
  foreignKey: "invoiceNumber",
});

invoiceDetailModel.belongsTo(invoiceModel, {
  foreignKey: "invoiceNumber",
});
