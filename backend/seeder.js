import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import notes from "./data/notes.js";
import User from "./models/userModel.js";
import Note from "./models/noteModel.js";
import Admin from "./models/productModel.js";
import Order from "./models/orderModel.js"
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Note.deleteMany();
    await User.deleteMany();
    await Admin.deleteMany();
    await Order.deleteMany();
   

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleNotes = notes.map((note) => {
      return { ...note, user: adminUser };
    });

    const sampleProd = products.map((prod) => {
      return {...prod, user: adminUser};
    })
    await Note.insertMany(sampleNotes);
    await Admin.insertMany(sampleProd);
    await Order.insertMany(sampleNotes);


    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Note.deleteMany();
    await User.deleteMany();
    await Admin.deleteMany();
    await Order.deleteMany();
  

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
