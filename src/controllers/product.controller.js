import { productModel } from "../models/product.model.js";
import { createProductSchema } from "../schemas/product.schema.js";

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
  const columns = req.body;

  const validatedData = await createProductSchema.validateAsync(columns);

  try {
    const products = await productModel.create(validatedData);

    res.status(200).json({
      msg: "Product created successfully!",
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
        msg: `Product with id "${productId} not found!"`,
      });
  } catch (error) {
    console.log(error);
  }
};
