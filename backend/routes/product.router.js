import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/", (req, res) => {
    res.send("everything is good")
})

export default router