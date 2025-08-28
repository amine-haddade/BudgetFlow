import { Request, Response } from "express";
import User from "../models/User";
import { generateRefreshToken, generetAccesToken } from "../utils/jwt";
import { IUser } from "../Types/UserTypes";
import dotenv from "dotenv";
dotenv.config();
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
 

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Utilisateur déjà existant" });
  }
  const user : IUser =await User.create({name,email,password})
 if (user) {
    const userId = (user._id as any).toString();
    const accessToken = generetAccesToken(userId);
    const refreshToken = generateRefreshToken(userId);

     res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
     res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: accessToken,
    });
    } else {
    res.status(400).json({ message: "Données invalides" });
  };
    
} 

// Login User
export const authUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Cherche l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe invalide" });
    }

    // Vérifie le mot de passe
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email ou mot de passe invalide" });
    }

    // Génère les tokens
    const userId = (user._id as any).toString();
    const accessToken = generetAccesToken(userId);
    const refreshToken = generateRefreshToken(userId);


    // Stock le refresh token dans un cookie sécurisé
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV=== "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    });

    // Réponse JSON
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur du serveur", error });
  }
};

// Logout (supprimer refresh token)
export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Déconnecté avec succès" });
};


