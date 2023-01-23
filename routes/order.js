import express from "express";
import { getOrdersByUserId, postOrders } from "../controllers/order.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import router from "./products.js";

router.post("/order", postOrders);

router.get("/:id", getOrdersByUserId);

export default router;
