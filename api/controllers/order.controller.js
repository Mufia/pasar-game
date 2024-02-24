import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
//import Stripe from "stripe";




export const createOrder = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    const newOrder = new Order({
      postId: post._id,
      img: post.cover,
      title: post.title,
      buyerId: req.userId,
      sellerId: post.userId,
      price: post.price,
      payment_intent :"temporary",
  });

    await newOrder.save();
    res.status(200).send("succesful");
  } catch (err) {
    next(err);
  }
};



export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (req, res, next) => {
  const orders = await Order.find();
  
  res.status(200).send(orders);
}

export const confirmOrder = async (req, res, next) => {
  
  try {
    if (req.isSeller !== true ) {
      return next(createError(403, "Hanya Seller yang bisa konfirmasi order"));
    }
    const confirmOrder =  await Order.findByIdAndUpdate(req.params.id,
      { onProcces : true }, {new : true}
      )
      res.status(200).send("order updated");
    
  } catch (err) {
    next(err)
    
  }
  
};

export const completeOrder = async (req, res, next) => {
  
  try {
    if (req.isSeller === true ) {
      return next(createError(403, "Hanya buyer yang bisa konfirmasi order"));
    }
    const confirmOrder =  await Order.findByIdAndUpdate(req.params.id,
      { onProcces : false , isCompleted : true}, {new : true}
      )
      res.status(200).send("order completed");
    
  } catch (err) {
    next(err)
    
  }
  
};



