import express from "express";
import {
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, sendMessage);
router.get("/:chatId", verifyToken, getMessages);

export default router;
