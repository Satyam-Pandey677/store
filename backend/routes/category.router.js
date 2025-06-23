import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware.js";
import { createCategory, deleteCategory, getAllCategories, readCategory, updateCategory } from "../controllers/category.controller.js";

const router = Router()

router.route('/').post(authenticate, authorizeAdmin, createCategory)
router.route("/:categoryId")
            .put(authenticate,authorizeAdmin, updateCategory)
            .delete(authenticate, authorizeAdmin, deleteCategory)

router.route("/categories").get(getAllCategories)
router.route("/:id").get(readCategory)

export default router