import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  PrivateergetOrderById
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().lean();
  
  res.json(orders);
});

//@description     Fetch single product
//@route           GET /api/orders/:id
//@access          Public
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
});

//@description     Create product
//@route           GET /api/orders/create
//@access          Private
const CreateOrder = asyncHandler(async (req, res) => {
  const { name, qty, price, email} = req.body;

  // if (!name || !qty || !price) {
  //   res.status(400);
  //   throw new Error("Please Fill all the feilds");
  //   return;
  // } else {
    const order = new Order({ user: req.user._id, name, qty, price, email });
    
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  // }
});



//@description     Delete product
//@route           GET /api/orders/:id
//@access          Private
const DeleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  // if (order.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (order) {
    await order.remove();
    res.json({ message: "Order Removed" });
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

// @desc    Update a product
// @route   PUT /api/notes/:id
// @access  Private
const UpdateOrder = asyncHandler(async (req, res) => {
  const { isDelivered } = req.body;

  const order = await Order.findById(req.params.id);

  // if (order.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (order) {
    order.isDelivered = isDelivered;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export { getOrderById, getOrders, CreateOrder, DeleteOrder, UpdateOrder };
