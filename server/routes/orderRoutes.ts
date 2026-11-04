import express from 'express';

import auth from '../middlewares/auth.js';
import admin from "../middlewares/admin.js";

import { createOrder, getAllOrders, getOrder, getOrderLocation, getUserOrders, updateOrderStatus } from '../controllers/orderController.js';


const orderRouter = express.Router();

orderRouter.post("/", auth, createOrder);

orderRouter.get("/", auth, getUserOrders);
orderRouter.get("/all", auth, admin, getAllOrders);
orderRouter.get("/:id", auth, getOrder);
orderRouter.get("/:id/location", auth, getOrderLocation);

orderRouter.put("/:id/status", auth, admin, updateOrderStatus);

export default orderRouter;
