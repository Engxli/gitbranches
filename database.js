const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("CONNECTED TO DB!");
  } catch (error) {
    console.log("Error whiel connecting to DB!");
  }
};

module.exports = connectDB;
