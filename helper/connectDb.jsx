import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log(`MongoDb is already Connect`);
    return;
  }
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/project", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("[ERROR]: ", error);
  }
};
