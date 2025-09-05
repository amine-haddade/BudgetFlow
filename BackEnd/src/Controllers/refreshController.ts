import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generetAccesToken } from "../utils/jwt";


export const refreshToken = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "Pas de refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { id: string };
    const newAccessToken = generetAccesToken(decoded.id);
    res.json({ token: newAccessToken });
  } catch (error) { 
    res.status(401).json({ message: "Refresh token invalide" });
  }
};
