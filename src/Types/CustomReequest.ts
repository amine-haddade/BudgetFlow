import { Request } from "express";

export interface CustomRequest extends Request {
  user?: any; // tu peux mettre ton type User ici si défini
}
