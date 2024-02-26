import express from "express";
import { getGames, getPopularGames, newGame } from "../controllers/game.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/",verifyToken, newGame)
router.get("/",getGames)
router.get("/popular",getPopularGames)

export default router;