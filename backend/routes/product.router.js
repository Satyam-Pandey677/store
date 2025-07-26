import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware.js";
import checkId from "../middleware/checkId.miiddleware.js";
import formidable from "express-formidable"
import { AddProduct, deleteProduct, fetchAllProducts, getAllproduct, getProductById, updateProduct, addProductReview, getTopProducts, getNewProduct } from "../controllers/product.controller.js";

const router = Router()

router.route("/")
    .post(authenticate, authorizeAdmin,formidable(),  AddProduct)
    .get(getAllproduct)

router.route("/allproducts").get(fetchAllProducts)

router.route("/:id/review").post(authenticate, addProductReview)

router.route("/top").get(getTopProducts)
router.route("/new").get(getNewProduct)

router.route("/:id").delete(authenticate,authorizeAdmin,deleteProduct)
    .put(authenticate, authenticate, formidable(), updateProduct)
    .get(getProductById)



export default router