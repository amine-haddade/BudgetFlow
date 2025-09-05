import  Redis from "ioredis"
import dotenv from "dotenv"
dotenv.config()
const redis=new Redis({
    host:process.env.HostRedis || "127.0.0.1",
    port:Number(process.env.PortRedis) || 6379,
    password:process.env.PasswordRedis,
    lazyConnect:false ,//connexion immédiate
    maxRetriesPerRequest:3,//3 tentatives max par requête.

})
redis.on("connect",()=>{console.log(" Redis connecté")})
redis.on("error", (err) => console.error(" Redis erreur", err));

export default redis