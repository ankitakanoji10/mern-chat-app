const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://ankitakanoji:ankita10@cluster0.4oab79c.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;