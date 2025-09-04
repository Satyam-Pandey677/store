import { Router } from "express";
import {authenticate, authorizeAdmin} from "../middleware/auth.middleware.js"
import { createOrder, getAllOrders, getUserOrder, countTotalOrders,calculateTotalSales, calculateTotalSalesByDate, findOrderById, markOrderAsPaid, markOrderAsDelivered,testingPut } from "../controllers/order.controller.js";

const router  = Router()

router.route("/")
        .post(authenticate, createOrder)
        .get(authenticate,authorizeAdmin,getAllOrders);

router.route("/mine").get(authenticate,  getUserOrder);

router.route("/total-orders").get(countTotalOrders)
router.route("/total-sales").get(calculateTotalSales)
router.route("/total-sales-by-date").get(calculateTotalSalesByDate)
router.route("/:id").get(authenticate, findOrderById)
router.route("/:id/pay").put(authenticate, markOrderAsPaid)
router.route("/:id/deliver").put(markOrderAsDelivered)
router.route("/testing").get(testingPut)

export default router