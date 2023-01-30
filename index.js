import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import products from "./routes/products.js";
import user from "./routes/user.js";
import order from "./routes/order.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { ErrorResponse } from "./utils/errorResponse.js";

const app = express();

const connection = `${process.env.URL}`;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(connection);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use(cors());
app.use(express.json());

app.use("/products", products);
app.use("/user", user);
app.use("/order", order);

app.use("*", (req, res, next) => {
  next(new ErrorResponse("Site not found"));
});

app.use(errorHandler);

connectDB().then(() => {
  app.listen(`${process.env.PORT}`, () => console.log("server is running"));
});
