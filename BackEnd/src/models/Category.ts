// models/Category.ts
import mongoose, { Schema } from "mongoose";
import ICategory from "../Types/GategoyType";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [30, "Name cannot exceed 30 characters"],
      trim: true,
    },
    color: {
      type: String,
      maxlength: [20, "Color cannot exceed 20 characters"],
      default: "#000000", // optionnel avec valeur par défaut
    },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", categorySchema);
export default Category;
