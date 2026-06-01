import mongoose from "mongoose";

const mongo_uri: string | undefined = process.env.MONGO_URI;

const ConnectDB = async () => {
  try {
    if (!mongo_uri) {
      throw new Error("Mongodb URL is not configured");
    }

    if (mongoose.connection.readyState >= 1) {
      console.log("DB already Connected");
      return;
    }

    await mongoose.connect(mongo_uri);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export default ConnectDB;
