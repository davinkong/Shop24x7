import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    email: {
      type: String,
      required: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
  }, 
 
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
