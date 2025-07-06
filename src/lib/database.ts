import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Prevent reconnecting if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to the DB!");
      return;
    }

    const URI = process.env.MONGO_URI || "mongodb://0.0.0.0:27017";

    await mongoose.connect(URI, {
      dbName: "horoscope",
    });

    console.log("Connected to the DB!");
  } catch (error) {
    console.error("Couldn't Connect to the DB!", error);
    process.exit(1);
  }
};

export default connectDB;
