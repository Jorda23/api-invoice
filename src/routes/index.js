import { Router } from "express";
import productRoute from "./product.route.js";
import categoryRoute from "./category.route.js"
import invoiceRoute from "./invoice.route.js"

const router = Router();

router.use(productRoute);
router.use(categoryRoute);
router.use(invoiceRoute);

export default router;