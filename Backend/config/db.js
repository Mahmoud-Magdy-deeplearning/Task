require("dotenv").config({path:__dirname+'/./../.env'});
const mongoose = require("mongoose");

console.log("beforefunc")

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI)
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.error("MongoDB connection FAIL");
    process.exit(1);
  }
};

module.exports = connectDB;
