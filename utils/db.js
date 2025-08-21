import mongoose from "mongoose";
const mongodbURI = "mongodb://localhost:27017/Batch11";

async function connectDB() {
  try {
    const connection = await mongoose.connect(mongodbURI);
    console.log("Mongodb connected at", connection.connection.host);
  } catch (err) {
    console.log("Error connecting to DB:", err.message);
    process.exit(1);
  }
}

export default connectDB;
