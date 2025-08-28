import { Router } from "express";
import { authUser, logoutUser, registerUser } from "../Controllers/AuthController";
import { refreshToken } from "../Controllers/refreshController";
import { validate } from "../Controllers/validateMiddleware";
import { loginSchema, registerSchema } from "../validators/userValidator";

const router=Router()

router.post('/register',validate(registerSchema),registerUser);
router.post('/login',validate(loginSchema),authUser);
router.get('/refresh-token',refreshToken);
router.delete('/logout',logoutUser);


export default router
