import mongoose from "mongoose";

const prodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/question-icon-vector/question-icon-vector-9.jpg",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", prodSchema);

export default Admin;
