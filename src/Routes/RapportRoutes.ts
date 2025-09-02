import { Router } from "express";
import { getMonthlyReport, getUserMonthlyReport } from "../Controllers/reportController";
import { protect } from "../Middlewares/authMiddleware";
import { cache } from "../Middlewares/cacheMiddleware";
import { CustomRequest } from "../Types/CustomReequest";

const router=Router()

router.get('/wallet/:id/report',protect,getMonthlyReport)
router.get('/reports/user',protect,cache((req:CustomRequest)=>{
    const {month,year}= req.query;
    return `report:${req.user._id}:${year}-${month}`;
    },120)// chached 2 minute
    ,getUserMonthlyReport)

export default router