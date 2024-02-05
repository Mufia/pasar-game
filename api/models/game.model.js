import mongoose from "mongoose";
const { Schema } = mongoose;

const GameSchema = new Schema (
  {
    title: {
      type: String,
      required: true,
    },
    cat: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    isPopular: {
      type: Boolean,
      default:false
    },    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Game", GameSchema);