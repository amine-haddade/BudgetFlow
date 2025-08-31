// routes/categoryRoutes.ts
import { Router } from "express";
import { protect } from "../Middlewares/authMiddleware";
import { validate } from "../Middlewares/validateMiddleware";
import { createCategorySchema, updateCategorySchema } from "../validators/Category";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../Controllers/CategoryController";

const router = Router();

// 🔹 CRUD des catégories
router.post("/", protect, validate(createCategorySchema), createCategory);
router.get("/", protect, getCategories);
router.put("/:id", protect, validate(updateCategorySchema), updateCategory);
router.delete("/:id", protect, deleteCategory);

export default router;
