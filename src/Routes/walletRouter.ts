import { Router } from "express";
import { protect } from "../Middlewares/authMiddleware";
import { validate } from "../Middlewares/validateMiddleware";
import {  createWalletSchema, updateWalletSchema } from "../validators/WalletValidator";
import { addUserToWallet, createWallet, deleteWallet, getWallets, updateWallet } from "../Controllers/walletController";


const router = Router();
// 🔹 Créer un wallet avec validation
router.post("/",protect, validate(createWalletSchema), createWallet);
// 🔹 Mettre à jour un wallet avec validation
router.put("/:id", protect, validate(updateWalletSchema), updateWallet);
// 🔹 Les autres routes n’ont pas besoin de validation car elles ne prennent pas de body complexe
router.get("/", protect, getWallets);
router.delete("/:id", protect, deleteWallet);
router.post("/:id/add-user", protect, addUserToWallet);

export default router;
