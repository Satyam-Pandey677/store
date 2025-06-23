import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware.js";
import { createCategory } from "../controllers/category.controller.js";

const router = Router()

router.route('/').post(authenticate, authorizeAdmin, createCategory)

export default router