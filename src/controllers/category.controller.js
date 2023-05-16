import { categoryModel } from "../models/category.model.js";

export const findAllCategory = async (req, res) => {
  try {
    const { count, rows } = await categoryModel.findAndCountAll();
    res.json({
      count,
      rows,
    });
  } catch (error) {
    console.log(error);
  }
};

export const create = async (req, res) => {
  const { categoryName, categoryDescription, productId } = req.body;

  try {
    const category = await categoryModel.create({
      categoryName,
      categoryDescription,
      productId
    });

    res.status(200).json({
      msg: "Category created successfully!",
      category,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteForId = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await categoryModel.destroy({ where: { categoryId } });

    if (category) res.status(200).json("Deleted!");
    else
      res.status(404).json({
        msg: `Category with id "${categoryId} not found!"`,
      });
  } catch (error) {
    console.log(error);
  }
};
