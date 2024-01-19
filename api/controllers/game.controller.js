import Game from "../models/game.model.js";
import createError from "../utils/createError.js";

export const newGame = async (req, res, next) => {
    try {
      const newGame = new Game({
        ...req.body,
      });
  
      await newGame.save();
      res.status(201).send("Game telah ditambahkan.");
    } catch (err) {
      next(err);
    }
  };