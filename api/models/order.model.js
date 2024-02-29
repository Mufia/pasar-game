import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sellerId: {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
      required: true,
    },
    buyerId: {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    onProcces: {
      type: Boolean,
      default: false,
    },
    orderId: {
      type: String,
      required: true,
    },

   
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
