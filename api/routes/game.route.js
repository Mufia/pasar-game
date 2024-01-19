import express from "express";
import { newGame } from "../controllers/game.controller.js";

const router = express.Router();

router.post("/", newGame)

export default router;