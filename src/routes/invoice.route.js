import { Router } from "express";
import {
  create,
  findOneInvoiceDetail,
  findAllInvoice,
} from "../controllers/invoice.controller.js";

const route = Router();

route.get("/invoices", findAllInvoice);
route.get("/invoice/:invoiceNumber", findOneInvoiceDetail);
route.post("/invoice/create", create);

export default route;
