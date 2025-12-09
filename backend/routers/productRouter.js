import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
import { productAddSchema } from "../models/products.js";
import validationHandler from "../middlewares/validationHandler.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkAdmin from "../middlewares/checkAdmin.js";

const router = express.Router();

router.get("/", getProducts);
router.post(
  "/",
  checkAuth,
  checkAdmin,
  validationHandler(productAddSchema),
  addProduct
);
router.get("/top", getTopProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
