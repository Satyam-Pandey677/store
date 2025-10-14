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

const updateCategory = asyncHandler(async(req, res) => {
    const {name} = req.body
    const {categoryId}= req.params

    if(!categoryId) {
        throw new ApiError(404, "Category Not Found")
    }

    const exist = await Category.findOne({name})
    if(exist) {
        throw new ApiError(409, "Category name already exist")
    }

    const updateCategory = await Category.findByIdAndUpdate(categoryId,{name},{new:true})

    if(!updateCategory){
        throw new ApiError(500, "Something went wrong while updating category")
    }

    return res.status(200)
    .json(new ApiResponse(
        200,
        updateCategory,
        "Category Updated Successfully"
    ))
})

const deleteCategory = asyncHandler(async(req, res) => {
    const {categoryId} = req.params
    
    if(!categoryId){
        throw new ApiError(404, "Category Not Found")
    }

    const deletedCategory = await Category.findByIdAndDelete(categoryId)

    return res.status(200)
    .json(new ApiResponse(
        200,
        deletedCategory,
        "Category Deleted Successfully"
    ))
})

const getAllCategories = asyncHandler(async(req, res) => {
    const categories = await Category.find()

    if(!categories){
        throw new ApiError(404, "No categories found")
    }

    return res.status(200)
    .json(new ApiResponse(
        200,
        categories,
        "All Cetogries fetched"
    ))
})

const readCategory =asyncHandler(async(req, res) => {
    const {id} = req.params


    const category = await Category.findOne({_id:id})

    if(!category){
        throw new ApiError(404, "catogory not found")
    }

    return res.status(200)
    .json(new ApiResponse(
        200,
        category,
        "Category fetched"
    ))
})



export{
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    readCategory
}