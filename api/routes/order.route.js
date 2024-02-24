import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, createOrder, getAllOrders, confirmOrder, completeOrder} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/:postId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.get("/admin",verifyToken, getAllOrders )
router.put("/confirm/:id", verifyToken, confirmOrder)
router.put("/complete/:id", verifyToken, completeOrder)


export default router;
