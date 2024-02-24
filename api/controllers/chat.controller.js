import Chat from "../models/chat.model.js";
import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js"


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
        const order = await Order.findById(req.params.orderId)
        const newChat = new Chat ({
            orderId : order._id,
            chatName : order.title,
            seller : order.sellerId,
            buyer: order.buyerId,
            isGroupChat: false,
        })

        const savedChat = await newChat.save();
        const fullChat = await savedChat.findOne({_id : savedChat._id})
        .populate("seller", "-password")
        .populate("buyeer", "-password")
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
        .populate("groupAdmin", "-password")
        .populate("orderId")
        .populate("latestMessage")
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

export const getChat = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;

        const chat = await Chat.findOne({orderId});
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(200).json(chat);
    } catch (err) {
        next(err)
    }
}

