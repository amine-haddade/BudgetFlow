import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI must be defined in environment variables");
}

const MONGO_URI: string = process.env.MONGO_URI;
export const connectDBMongoose = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connecté à MongoDB");
  } catch (error) {
    console.error("Erreur de connexion MongoDB:", error);
    process.exit(1); // arrête le serveur si la connexion échoue
  }
};


