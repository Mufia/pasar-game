import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {createGroupChat, getChats, getChat} from "../controllers/chat.controller.js"


const router = express.Router();

router.post("/group/:orderId", verifyToken, createGroupChat)
router.post("/:orderId")
router.get("/", verifyToken, getChats)
router.get("/single/:orderId",verifyToken, getChat)


export default router;