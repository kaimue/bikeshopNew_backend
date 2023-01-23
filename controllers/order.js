import orderModel from "../models/order.js";
import { ErrorResponse } from "../utils/errorResponse.js";

const postOrders = async (req, res, next) => {
  try {
    const {
      body: { products, userId },
    } = req;
    const order = await orderModel.create({
      products,
      userId,
    });
    res.send("Order got created");
  } catch (error) {
    next(error);
  }
};

const getOrdersByUserId = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const products = await orderModel.find({
      userId,
    });
    if (!products) throw new ErrorResponse("No product found!");
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export { postOrders, getOrdersByUserId };
