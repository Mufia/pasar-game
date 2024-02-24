import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";

export const createMessage = async (req, res, next) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });
  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    res.status(201).send(savedMessage);
  } catch (err) {
    next(err);
  }
};


export const sendMessage = async (req, res, next) => {

  const {content, chatId} = req.body

  const message = {
    sender : req.userId,
    content : content,
    chat: chatId
  }
  
  const newMessage = new Message(message)

  try {
    const savedMessage = await newMessage.save();

    res.status(200).send(savedMessage);

  } catch (err) {
    next (err)
  }

}

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username img email")
      .populate("chat")
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};
