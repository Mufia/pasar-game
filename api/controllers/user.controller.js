import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};

export const getUsers = async (req, res, next) => {
    const user = await User.find({
      isAdmin : false,
    }
  );

  res.status(200).send(user)
};

export const adminDeleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.isAdmin !== true ) {
    return next(createError(403, "Hanya Admin Yang Bisa Menghapus User"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};