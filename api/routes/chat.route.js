import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {createGroupChat, getChats, getChat, createChat, getGroupChat} from "../controllers/chat.controller.js"


const router = express.Router();

router.post("/group/:orderId", verifyToken, createGroupChat)
router.post("/:postId", verifyToken, createChat)
router.get("/", verifyToken, getChats)
router.get("/single/group/:orderId",verifyToken, getGroupChat)
router.get("/single/:userId", verifyToken, getChat)


export default router;