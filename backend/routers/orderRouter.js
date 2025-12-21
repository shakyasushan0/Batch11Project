import express from "express";
import {
  addOrder,
  confirmPayment,
  deliverOrder,
  getEsewaFormData,
  getMyOrders,
  getOrderById,
  getOrders,
  payOrder,
} from "../controllers/orderController.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkAdmin from "../middlewares/checkAdmin.js";

const router = express.Router();

router.post("/", checkAuth, addOrder);
router.get("/", checkAuth, checkAdmin, getOrders);
router.get("/myorders", checkAuth, getMyOrders);
router.get("/confirm-payment", confirmPayment);
router.get("/:id", checkAuth, getOrderById);
router.put("/pay/:id", checkAuth, checkAdmin, payOrder);
router.put("/deliver/:id", checkAuth, checkAdmin, deliverOrder);
router.get("/getesewaformdata/:id", getEsewaFormData);

export default router;
