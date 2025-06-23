import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createCategory = asyncHandler(async(req, res) => {
    const {name} = req.body
    
    if(!name) {
        throw new ApiError(500, "Name is required")
    }

    const existCategory = await Category.findOne({name})

    if(existCategory){
        throw new ApiError(500, "Category already exist")
    }

    const category = await Category.create({name})

    return res.status(201)
    .json(new ApiResponse(
        200,
        category,
        "Catogory Created Successfully"
    ))
})
export{
    createCategory
}