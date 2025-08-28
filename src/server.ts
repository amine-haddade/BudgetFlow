import express from "express";
import dotenv from "dotenv";
import { connectDBMongoose } from "./Config/db";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/authRoutes"
import { CustomRequest, protect } from "./Middlewares/authMiddleware";

// Charger les variables d'environnement
dotenv.config();
connectDBMongoose()
const app = express();

// Middleware pour JSON
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter)
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
