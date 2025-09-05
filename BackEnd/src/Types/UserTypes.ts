import { Document, Types } from "mongoose";

export interface IUser extends Document {

  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}
