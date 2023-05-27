import { invoiceModel } from "../models/invoice.model.js";
import { invoiceDetailModel } from "../models/invoiceDetail.model.js";
import { productModel } from "../models/product.model.js";
import sequelize from "../database/connection.js";

export const findAllInvoice = async (req, res) => {
  try {
    const invoice = await invoiceModel.findAll({
      include: [{ model: invoiceDetailModel, include: [productModel] }],
    });

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

export const create = async (req, res) => {
  const columns = req.body;

  const invoice = {
    client: columns.client,
    totalInvoice: 0,
  };

  const invoiceDetails = columns.information;

  const t = await sequelize.transaction();

  try {
    const createdInvoice = await invoiceModel.create(invoice, {
      transaction: t,
    });

    let invoiceTotal = 0;

    for (const detail of invoiceDetails) {
      detail.invoiceNumber = createdInvoice.invoiceNumber;
    
      const product = await productModel.findByPk(detail.productId, {
        transaction: t,
      });
    
      detail.price = product.price; // Asignar el valor del campo price del producto al campo price del detalle de la factura
    
      detail.total = detail.price * detail.qty;
      invoiceTotal += detail.total;
    
      if (product != null && product.stock >= detail.qty) {
        const createdDetail = await invoiceDetailModel.create(detail, {
          transaction: t,
        });
    
        product.stock -= detail.qty;
    
        await product.save({ transaction: t });
      } else {
        if (t.finished !== "rollback" && t.finished !== "commit") {
          await t.rollback();
        }
        throw new Error(
          `There is not enough stock of this product: ${product.productName}`
        );
      }
    }
    

    await createdInvoice.update(
      { totalInvoice: invoiceTotal },
      { transaction: t }
    );

    await t.commit(); // The transaction is committed using transaction.commit().

    res.status(201).json({ invoiceNumber: createdInvoice.invoiceNumber });
  } catch (error) {
    if (t.finished !== "rollback" && t.finished !== "commit") {
      await t.rollback(); // If any error occurs, the transaction is rolled back using transaction.rollback()
    }
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

export const findOneInvoiceDetail = async (req, res) => {
  const { invoiceNumber } = req.params;

  try {
    const invoice = await invoiceModel.findOne({
      where: { invoiceNumber },
      include: [{ model: invoiceDetailModel, include: [productModel] }],
    });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not Found!" });
    }

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};
