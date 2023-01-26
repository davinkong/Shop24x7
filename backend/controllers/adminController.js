import Admin from "../models/productModel.js";
import asyncHandler from "express-async-handler";


const getProducts = asyncHandler(async (req, res) => {
  const products = await Admin.find({ user: req.user._id });
  
  res.json(products);
});


const getProdById = asyncHandler(async (req, res) => {
  const prod = await Admin.findById(req.params.id);

  if (prod) {
    res.json(prod);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(prod);
});


const CreateProduct = asyncHandler(async (req, res) => {
  const { name, qty, price, pic } = req.body;

  if (!name || !qty || !price) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const prod = new Admin({ user: req.user._id, name, qty, price, pic });
    
    const createdNote = await prod.save();

    res.status(201).json(createdNote);
  }
});




const DeleteProduct = asyncHandler(async (req, res) => {
  const prod = await Admin.findById(req.params.id);

  if (prod.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (prod) {
    await prod.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});


const UpdateProduct = asyncHandler(async (req, res) => {
  const { name, qty, price } = req.body;

  const prod = await Admin.findById(req.params.id);

  if (prod.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (prod) {
    prod.name = name;
    prod.qty = qty;
    prod.price = price;

    const updatedProd = await prod.save();
    res.json(updatedProd);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

export { getProdById, getProducts, CreateProduct, DeleteProduct, UpdateProduct };
