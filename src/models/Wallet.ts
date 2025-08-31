import mongoose, { Schema } from "mongoose";
import IWallet from "../Types/WalletTypes";



const walletSchema = new Schema<IWallet>(
  {
    name: {
      type: String,
      required: [true, "Wallet name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [30, "Name cannot exceed 30 characters"],
      trim: true,
    },
    description: {
      type: String,
      maxlength: [150, "Description too long"],
      trim: true,
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ["USD", "EUR", "MAD"], 
    },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },

    // 🔹 Budget et solde
    initialBudget: {
      type: Number,
      required: true,
      default: 0,
    },

    balance: {
      type: Number,
      required: true,
      default: 0,
    },

  },
  { timestamps: true }
);

const Wallet = mongoose.model<IWallet>("Wallet", walletSchema);
export default Wallet;
