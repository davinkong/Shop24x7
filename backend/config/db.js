//Connection file to mongo db
import mongoose from "mongoose";
import colors from "colors";
const MONGO_URI = "mongodb://127.0.0.1/node-express-auth";

const connectDB = async () => {
  
  try {
    
    const conn = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

export default connectDB;
