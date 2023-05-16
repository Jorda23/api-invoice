import { Router } from "express";
import {
  create,
  deleteForId,
  findAllCategory,
} from "../controllers/category.controller.js";

const route = Router();

route.get("/categories", findAllCategory);
route.post("/category/create", create);
route.delete("/category/:categoryId", deleteForId);

export default route;
