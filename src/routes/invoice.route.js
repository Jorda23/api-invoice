import { Router } from "express";
import {
  create,
  deleteForId,
  findAllInvoice,
} from "../controllers/invoice.controller.js";

const route = Router();

route.get("/invoices", findAllInvoice);
route.post("/invoice/create", create);
route.delete("/invoice/:invoiceNumber", deleteForId);

export default route;
