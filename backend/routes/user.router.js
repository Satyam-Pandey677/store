import { Router } from "express";
import { createUser, loginUser, logOut, getAllUsers, getCurrentUserProfile, updateUserProfile, deleteUserById, getUserById, updateUserByID } from "../controllers/user.controller.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware.js";

const router = Router()

router
    .route("/")
    .post(createUser)
    .get(authenticate,authorizeAdmin,getAllUsers)

router.route("/auth").post(loginUser)
router.route("/logout").post(logOut)

router
    .route("/profile")
    .get(authenticate, getCurrentUserProfile)
    .put(authenticate,updateUserProfile)

router
    .route("/:id")
    .delete(authenticate,authorizeAdmin,deleteUserById)
    .get(authenticate, authorizeAdmin, getUserById)
    .put(authenticate,authorizeAdmin, updateUserByID)

export default router