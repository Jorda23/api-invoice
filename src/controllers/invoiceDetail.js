import { invoiceDetailModel } from "../models/invoiceDetail.model.js";

export const findAllInvoiceDetail = async (req, res) => {
  try {
    const { count, rows } = await invoiceDetailModel.findAndCountAll();
    res.json({
      count,
      rows,
    });
  } catch (error) {
    console.log(error);
  }
};

export const create = async (req, res) => {
  const { qty, client } = req.body;

  try {
    const invoiceDetail = await invoiceDetailModel.create({
        date, client
    });

    res.status(200).json({
      msg: "Invoice detail created successfully!",
      invoiceDetail,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteForId = async (req, res) => {
  const { invoiceDetailId } = req.params;

  try {
    const invoiceDetail = await invoiceDetailModel.destroy({ where: { invoiceDetailId } });

    if (invoiceDetail) res.status(200).json("Deleted!");
    else
      res.status(404).json({
        msg: `Invoice detail with id "${invoiceDetail} not found!"`,
      });
  } catch (error) {
    console.log(error);
  }
};
