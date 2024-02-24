import mongoose from "mongoose";
const { Schema } = mongoose;

const ChatSchema = new Schema ({
    chatName: {type : String},
    isGroupChat: {type : Boolean},
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
        required: true,
      },
},{
    timestamps: true,
  }

);

export default mongoose.model("Chat", ChatSchema);