const mongoose = require("mongoose");

//we have use process.env.MONGO_URL from .env file
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongod connected!");
  } catch (err) {
    console.log("mongod not connected", err);
  }
};
module.exports = connectDB;
