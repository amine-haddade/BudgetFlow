// Types/CategoryTypes.ts
import { Document, Types } from "mongoose";

export default interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  color?: string;
  owner: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
