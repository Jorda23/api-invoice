import { productModel } from "../models/product.model.js";

export const findAllProduct = async (req, res) => {
  try {
    const { count, rows } = await productModel.findAndCountAll();
    res.json({
      count,
      rows,
    });
  } catch (error) {
    console.log(error);
  }
};

export const create = async (req, res) => {
  const { productName, price, stock } = req.body;

  try {
    const products = await productModel.create({
      productName,
      price,
      stock
    });

    res.status(200).json({
      msg: "Products created successfully!",
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteForId = async (req, res) => {
  const { productId } = req.params;

  try {
    const products = await productModel.destroy({ where: { productId } });

    if (products) res.status(200).json("Deleted!");
    else
      res.status(404).json({
        msg: `Products with id "${productId} not found!"`,
      });
  } catch (error) {
    console.log(error);
  }
};
