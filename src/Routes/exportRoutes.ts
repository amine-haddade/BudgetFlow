import { Router } from "express";
import { getMonthlyReport } from "../Controllers/reportController";
import { protect } from "../Middlewares/authMiddleware";
import { exportCSV } from "../Controllers/exportController";

const router=Router()

router.get('/wallet/:id/export',protect,exportCSV)

export default router