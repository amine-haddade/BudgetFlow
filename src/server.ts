import express from "express";
import dotenv from "dotenv";
import { connectDBMongoose } from "./Config/db";

// Charger les variables d'environnement
dotenv.config();
const app = express();
const port = process.env.PORT;


// Middleware pour JSON
app.use(express.json());
// Route test
app.get("/", (req, res) => {
  res.send("Hello TypeScript + Express!");
});

connectDBMongoose()

 
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
