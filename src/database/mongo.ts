import mongoose from "mongoose";
import config from "../config";

const { NODE_ENV, MONGO_URI } = config.env;

const options: mongoose.ConnectOptions = {
  autoIndex: false,
};

const connectToDB = async (): Promise<mongoose.Connection> => {
  try {
    mongoose.set("debug", NODE_ENV === "dev");
    mongoose.set("strictQuery", false);

    await mongoose.connect(MONGO_URI, options);
    console.log("<<<< Connected to MongoDB >>>>");

    mongoose.Promise = global.Promise;
    const db: mongoose.Connection = mongoose.connection;
    return db;
  } catch (error) {
    console.error("MongoDB Connection Error: ", error);
    process.exit(1);
  }
};

export default connectToDB;
