import { Document, Types } from "mongoose";

export  default interface IWallet extends Document {
  _id: Types.ObjectId;
  name: string;
  description:string;
  initialBudget:number
  balance: number;
  currency: string;
  owner: Types.ObjectId;
  users:Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
