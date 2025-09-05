// Types/TransactionTypes.ts
import { Document, Types } from "mongoose";

export default interface ITransaction extends Document {
  _id: Types.ObjectId;
  wallet: Types.ObjectId;
  user: Types.ObjectId;
  category: Types.ObjectId;
  type: "income" | "expense";
  amount: number;
  date: Date;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
