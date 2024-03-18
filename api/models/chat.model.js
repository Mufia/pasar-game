import mongoose from "mongoose";
const { Schema } = mongoose;

const ChatSchema = new Schema ({
    chatName: {
        type : String
    },
    img : {
        type : String
    },
    isGroupChat: {
        type : Boolean
    },
    seller :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    buyer :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    latestMessage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message",
    },
    groupAdmin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" },
    orderId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Order",
      },
    postId : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Post",
    },
    userId : {
        type : String,
        required : false,
    }
},{
    timestamps: true,
  }

);

export default mongoose.model("Chat", ChatSchema);