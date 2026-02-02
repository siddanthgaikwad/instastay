import express from "express";
import {createOrderController, currentOrdersController, getAllOrdersController} from "../controller/Order.js";

const router = express.Router();

router.post("/create-order",createOrderController);
router.get("/get-all-orders",getAllOrdersController);
router.get("/current-orders",currentOrdersController)


export default router;