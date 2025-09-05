import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
export  function generetAccesToken(id:string){
    const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
    if(!JWT_SECRET)   throw new Error("JWT_SECRET must be defined");
    return jwt.sign({id},JWT_SECRET,{expiresIn:"1d"})
    
}

export const generateRefreshToken = (id: string) => {
  if (!process.env.JWT_REFRESH_SECRET) throw new Error("JWT_REFRESH_SECRET must be defined");
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "90d" }); // 90 jours
};