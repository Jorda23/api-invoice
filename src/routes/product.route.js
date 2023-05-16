import { Router } from "express";
import {
  create,
  deleteForId,
  findAllProduct,
} from "../controllers/product.controller.js";

const route = Router();

route.get("/products", findAllProduct);
route.post("/product/create", create);
route.delete("/product/:productId", deleteForId);

export default route;
