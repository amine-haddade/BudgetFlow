import mongoose, { Schema } from "mongoose";
import { IUser } from "../Types/UserTypes";

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [4, "Name must be at least 4 characters long"],
      maxlength: [15, "Name cannot exceed 15 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      trim: true,   
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  { timestamps: true }  //  ajoute createdAt et updatedAt);
); 

const User = mongoose.model<IUser>("User", userSchema);
export default User;
