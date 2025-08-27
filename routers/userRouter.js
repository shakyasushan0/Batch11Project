import express from "express";
import { login, logout, signup } from "../controllers/userController.js";
import validationHandler from "../middlewares/validationHandler.js";
import { userAddSchema } from "../models/users.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/signup", validationHandler(userAddSchema), signup);
router.post("/login", login);
router.post("/logout", checkAuth, logout);

export default router;
