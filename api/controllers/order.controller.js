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
      orderId : req.userId + post._id
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
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),})
      .populate("sellerId", "-password")
      .populate("buyerId", "-password")

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (req, res, next) => {
  const orders = await Order.find({})
    .populate ("buyerId", "-password")
    .populate ("sellerId", "-password")
  
  res.status(200).send(orders);
}

export const confirmOrder = async (req, res, next) => {
  
  try {
    if (req.isSeller !== true ) {
      return next(createError(403, "Hanya Seller yang bisa konfirmasi order"));
    }
    const confirmOrder =  await Order.findByIdAndUpdate(req.params.id,
      { onProcess : true }, {new : true}
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
      { onProcess : false , isCompleted : true}, {new : true}
      )
      res.status(200).send("order completed");
    
  } catch (err) {
    next(err)
    
  }
  
};

export const cancelOrder = async (req, res, next) => {
  
  try { 
    if (req.isAdmin !== true ) {
      return next(createError(403, "Hanya Admin yang bisa membatalkan Order"));
    }
    const confirmOrder =  await Order.findByIdAndUpdate(req.params.id,
      { onProcess : false , isCanceled : true}, {new : true}
      )
      res.status(200).send("order canceled");
    
  } catch (err) {
    next(err)
    
  }
  
};


export const getOrder = async (req, res, next) => {
  
  try {
    const orderId = req.params.orderId
    const order = await Order.findOne({orderId})
    if (!order) return next(createError(404, "Not found!"));
    res.status(200).json(order)
  } catch (err) {
    next(err)
  }
}
