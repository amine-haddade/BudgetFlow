// routes/transactionRoutes.ts
import { Router } from "express";
import { protect } from "../Middlewares/authMiddleware";
import { validate } from "../Middlewares/validateMiddleware";
import { createTransactionSchema, updateTransactionSchema } from "../validators/TransactionValidator";
import { createTransaction, deleteTransaction, getTransactions, updateTransaction } from "../Controllers/transactionController";

const router = Router();

router.post("/", protect, validate(createTransactionSchema), createTransaction);
router.get("/", protect, getTransactions);
router.put("/:id", protect, validate(updateTransactionSchema), updateTransaction);
router.delete("/:id", protect, deleteTransaction);

export default router;
