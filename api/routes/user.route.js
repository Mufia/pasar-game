import express from "express";
import { adminDeleteUser, deleteUser, getUser, getUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.delete("/admin/:id", verifyToken, adminDeleteUser)
router.get("/", getUsers)
router.get("/:id", getUser);

export default router;
