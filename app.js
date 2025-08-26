import express from "express";
import cookieParser from "cookie-parser";

import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";

// Router import
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

app.use(errorHandler);

export default app;
