import express from "express";
import {
  adminDeletePost,
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  getPosts,
  soldPost
} from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createPost);
router.delete("/:id", verifyToken, deletePost);
router.get("/single/:id", getPost);
router.get("/", getPosts);
router.get("/admin", verifyToken, getAllPosts);
router.delete("/admin/:id", verifyToken, adminDeletePost)
router.put("/sold/:id", verifyToken, soldPost);

export default router;
