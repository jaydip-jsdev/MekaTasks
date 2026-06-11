import mongoose from "mongoose";

const mongo_uri = process.env.mongodb_uri;

export async function ConnectDb() {
  try {
    if (!mongo_uri) {
      throw new Error("mongodb uri is not defined");
    }
    if (mongoose.connection.readyState >= 1) {
      console.log("DB already Connected");
      return;
    }
    await mongoose.connect(mongo_uri);
  } catch (error) {
    console.log(error);
  }
}
