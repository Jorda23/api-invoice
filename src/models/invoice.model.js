import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

export const invoiceModel = sequelize.define(
  "invoice",
  {
    invoiceNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalInvoice: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: false,
    }
  },
  {
    timestamps: false,
  }
);
