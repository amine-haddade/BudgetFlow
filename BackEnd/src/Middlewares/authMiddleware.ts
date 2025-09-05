import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import User from "../models/User";
import { CustomRequest } from "../Types/CustomReequest";
dotenv.config();

interface JwtPayload {
    id:string
}


export const protect = async (req:CustomRequest,res:Response,next:NextFunction)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token=req.headers.authorization.split(" ")[1]
            const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
            if(!JWT_SECRET)   throw new Error("JWT_SECRET must be defined");
            const decode = jwt.verify(token,JWT_SECRET) as JwtPayload
            req.user=await User.findById(decode.id).select("-password")
            next()
        }catch(err){
            return res.status(401).json({message:"Non autorisé , token invalide"})
        }
    }
    
  if (!token) {
    return res.status(401).json({ message: "Non autorisé, aucun token" });
  }
}