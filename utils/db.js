import mongoose from "mongoose";
const mongodbURI = process.env.MONGODB_URI;

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
