import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: "https://res.cloudinary.com/mufia/image/upload/v1709916738/fiverr/qfpnf7vffohohn0be14c.jpg"
  },
  phone: {
    type: String,
    default : " ",
  },
  desc: {
    type: String,
    required: false,
    default : " ",
  },
  isSeller: {
    type: Boolean,
    default:false
  },
  isAdmin: {
    type: Boolean,
    default:false
  },
},{
  timestamps:true
});

export default mongoose.model("User", userSchema)