import mongoose from "mongoose";
const { Schema } = mongoose;

const ChatSchema = new Schema ({
    chatName: {type : String},
    isGroupChat: {type : Boolean},
    users :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    latestMessage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message"
    },
    groupAdmin : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }]
},{
    timestamps: true,
  }

);

export default mongoose.model("Chat", ChatSchema);