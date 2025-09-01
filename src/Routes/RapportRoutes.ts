import { Router } from "express";
import { getMonthlyReport, getUserMonthlyReport } from "../Controllers/reportController";
import { protect } from "../Middlewares/authMiddleware";

const router=Router()

router.get('/wallet/:id/report',protect,getMonthlyReport)
router.get('/reports/user',protect,getUserMonthlyReport)

export default router