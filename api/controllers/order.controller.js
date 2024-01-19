import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Add from "../models/add.model.js";
//import Stripe from "stripe";

const newOrder = new Order({
    postId: post._id,
    img: post.cover,
    title: post.title,
    buyerId: req.userId,
    sellerId: post.userId,
    price: post.price,
  });

  await newOrder.save();


export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};
