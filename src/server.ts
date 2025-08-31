import express from "express";
import dotenv from "dotenv";
import { connectDBMongoose } from "./Config/db";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/authRoutes"
import walletRouter from "./Routes/walletRouter"
import {  protect } from "./Middlewares/authMiddleware";
import { CustomRequest } from "./Types/CustomReequest";
import CategoryRouter from "./Routes/CategoryRouter";
import TransactionRoute from "./Routes/TransactionRoutes";
import ReportTransaction from "./Routes/RapportRoutes";
import ExportTransaction from "./Routes/exportRoutes";

// Charger les variables d'environnement
dotenv.config();
connectDBMongoose()
const app = express();

// Middleware pour JSON
app.use(express.json());
app.use(cookieParser());

// auth api
app.use("/api/auth",authRouter)
// wallet api 
app.use("/api/wallet",walletRouter)
// category api 
app.use("/api/category",CategoryRouter)
// transaction  api 
app.use("/api/transaction",TransactionRoute)
// report Transaction
app.use('/api',ReportTransaction)
// exports Transaction routes
app.use('/api',ExportTransaction)
// Route test
app.get("/users",protect, (req:CustomRequest, res) => {
  res.json({message:"test protecte User",user:req.user});
});

// Route test
app.get("/", (req, res) => {
  res.send("Hello TypeScript + Express!");
});


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
