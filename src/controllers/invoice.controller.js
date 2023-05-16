import { invoiceModel } from "../models/invoice.model.js";

export const findAllInvoice = async (req, res) => {
  try {
    const { count, rows } = await invoiceModel.findAndCountAll();
    res.json({
      count,
      rows,
    });
  } catch (error) {
    console.log(error);
  }
};

export const create = async (req, res) => {
  const { date, client } = req.body;

  try {
    const invoices = await invoiceModel.create({
        date, client
    });

    res.status(200).json({
      msg: "Invoices created successfully!",
      invoices,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteForId = async (req, res) => {
  const { invoiceNumber } = req.params;

  try {
    const invoices = await invoiceModel.destroy({ where: { invoiceNumber } });

    if (invoices) res.status(200).json("Deleted!");
    else
      res.status(404).json({
        msg: `invoices with id "${invoiceNumber} not found!"`,
      });
  } catch (error) {
    console.log(error);
  }
};
