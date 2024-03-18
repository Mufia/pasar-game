import Chat from "../models/chat.model.js";
import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const createGroupChat = async (req, res, next) => {
    if (!req.isAdmin)
    return next(createError(403, "Only admin can create Group Chat!"));

    try {
        const order = await Order.findById(req.params.orderId)
        const newGroupChat = new Chat ({
            orderId: order._id,
            chatName: order.title,
            seller : order.sellerId,
            buyer: order.buyerId,
            isGroupChat: true,
            img : order.img,
            groupAdmin: req.userId,

    })
        const savedGroupChat = await newGroupChat.save();
        const fullGroupChat = await Chat.findOne({_id : savedGroupChat._id})
            .populate("seller", "-password")
            .populate("buyer", "-password")
            .populate("groupAdmin", "-password");
        
        res.status(200).json(fullGroupChat);
        
    } catch (err) {
        next(err)
    }
}

export const createChat = async (req, res, next) => {

    if (req.isSeller)
    return next(createError(403, "Only buyer can create Chat!"));

    try {
        const post = await Post.findById(req.params.postId)
        const newChat = new Chat ({
            postId : post._id,
            chatName : post.title,
            seller : post.userId,
            buyer : req.userId,
            img : post.cover,
            isGroupChat : false,
            userId : req.userId + post.userId
        })

        const savedChat = await newChat.save();
        const fullChat = await Chat.findOne({_id : savedChat._id})
        .populate("seller", "-password")
        .populate("buyer", "-password")
        res.status(200).json(fullChat)
    } catch (err) {
        next(err)
        
    }
}


export const getChats = async (req, res, next) => {
    try {
        await Chat.find(req.isAdmin? {groupAdmin : {$eq :req.userId}} : req.isSeller? {seller: {$eq :req.userId}} : {buyer : {$eq : req.userId}})
        .populate("seller", "-password")
        .populate("buyer", "-password")
        .populate ("groupAdmin", "-password")
        .populate("latestMessage")
        .populate("orderId")
        .sort({updateAt : -1})
        .then (async (results) => {
            results = await User.populate(results, {
                path :"latestMessage.sender",
                select : "username image email",
            })
            res.status(200).send(results);
        });
    } catch (err) {
        next(err)
    }
}

export const getGroupChat = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const chat = await Chat.findOne({orderId});
        if (!chat) return next(createError(404, "Not found!"));
        res.status(200).json(chat);
    } catch (err) {
        next(err)
    }
}

export const getChat = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const chat = await Chat.findOne({userId});
        if (!chat) return next(createError(404, "Not found!"));
        res.status(200).json(chat);
    } catch (err) {
        next(err)
    }
}


