import path from "path";
import  { Router } from "express";
import multer from "multer";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Readable } from "stream";


const router = Router()

const storage = multer.memoryStorage()

const fileFilter =  (req,file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetypes = /image\/jpeg|image\/jpg|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase()
    const mimetype = file.mimetype

    if(filetypes.test(extname) && mimetypes.test(mimetype)){
        cb(null, true)
    }else{
        cb(new Error("Image only"), false)
    }
}

export const upload = multer({storage, fileFilter})
const uploadSingleImage = upload.single("image") 

router.post("/", (req, res) => {
    uploadSingleImage(req, res,async (err) => {
        if(err){
            res.status(400).send({message: err.message})
        }else if(req.file){
            const image = await uploadOnCloudinary(req.file)
            console.log(image)
            
            res.status(200)
            .send({
                message: "Image uploaded succesfully",
                image:image.secure_url
            })
        }else{
            throw new ApiError(400, "No File Provided")
        }
    })
})

export default router