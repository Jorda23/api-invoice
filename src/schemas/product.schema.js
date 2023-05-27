import Joi from "joi";

export const createProductSchema = Joi.object({
  productId: Joi.number().integer(),
  productName: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  active: Joi.boolean().default(true),
  categoryId: Joi.number().integer(),
});
