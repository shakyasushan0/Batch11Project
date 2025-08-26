import express from "express";
import { login, signup } from "../controllers/userController.js";
import validationHandler from "../middlewares/validationHandler.js";
import { userAddSchema } from "../models/users.js";

const router = express.Router();

router.post("/signup", validationHandler(userAddSchema), signup);
router.post("/login", login);

export default router;
