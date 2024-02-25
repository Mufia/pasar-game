import Game from "../models/game.model.js";
import createError from "../utils/createError.js";

export const newGame = async (req, res, next) => {
  if (req.isAdmin !== true ) {
    return next(createError(403, "Hanya Admin Yang Bisa Menambah Game"));
  }
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

export const getGames = async (req,res, next) => {

  try {
    const games = await Game.find()
    res.status(200).send(games)
  } catch (err) {
    next(err)
  }
}

export const getPopularGames = async (req,res, next) => {

  try {
    const popularGames = await Game.find({
      isPopular : true,
    })
    res.status(200).send(popularGames)
  } catch (err) {
    next(err)
  }
}