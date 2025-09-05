import { Router } from "express";

import { exportCSV } from "../Controllers/exportController";

const router=Router()

router.get('/wallet/:id/export',exportCSV)

export default router