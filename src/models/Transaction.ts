// models/Transaction.ts
import mongoose, { Schema } from "mongoose";
import ITransaction from "../Types/TransactionType";

const transactionSchema = new Schema<ITransaction>(
  {
    wallet: { type: Schema.Types.ObjectId, ref: "Wallet", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Transaction type is required"],
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be >= 0"],
    },

    date: {
      type: Date,
      default: Date.now,
    },

    note: {
      type: String,
      maxlength: [200, "Note cannot exceed 200 characters"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model<ITransaction>("Transaction", transactionSchema);
export default Transaction;
