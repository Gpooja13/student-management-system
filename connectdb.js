const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_STRING);
   
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }

  mongoose.connection.on("connected", () => {
    console.log("Successfully Connected to MongoDB");
  });

  mongoose.connection.on("error", (error) => {
    console.log("Error connecting to MongoDB:", error);
  });
};

module.exports = connectDB;

