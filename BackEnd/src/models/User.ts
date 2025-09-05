import mongoose, { Schema } from "mongoose";
import { IUser } from "../Types/UserTypes";
import bcrypt from "bcryptjs"

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [4, "Name must be at least 4 characters long"],
      maxlength: [30, "Name cannot exceed 15 characters"],
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

// Hash le password avant sauvegarde
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  //génère un sel (salt) pour le hash, c’est une chaîne aléatoire qui rend le hash plus sûr
 //10 = nombre de tours de génération, plus c’est grand → plus c’est sécurisé mais plus lent.
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer password
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model<IUser>("User", userSchema);
export default User;
