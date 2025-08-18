import { asyncHandler } from "../utils/asyncHandler.js";
import Product from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const AddProduct = asyncHandler(async(req, res) => {
  const {name, discription, price, category, quantity, brand} = req.fields;

  if(!name || !discription || !price || !category || !quantity || !brand){
    throw new ApiError(500, "All fields are required" )
  }

  const product = await Product.create({...req.fields})

  if(!product) {
    throw new ApiError(500, "somthing went wrong")
  }

  return res.status(201)
  .json(new ApiResponse(
    201,
    product,
    "Product created succesfully"
  ))

})

const deleteProduct = asyncHandler(async(req, res) => {
    const {id} = req.params
    if(!id){
        throw new ApiError(500, "required id")
    }

    const deletedProduct = await Product.findByIdAndDelete(id)

    return res.status(200)
    .json(new ApiResponse(
        200,
        deletedProduct,
        "deleted Successfully"
    ))
})

const getProductById = asyncHandler(asyncHandler(async(req, res) => {
    const {id} = req.params
    if(!id){
        throw new ApiError(500, "Id Id required")
    }
    const product = await Product.findById(id)

    if(!product){
        throw new ApiError(404, "product not Found")
    }

    return res.status(200)
    .json(new ApiResponse(
        200,
        product,
        "product fetched successfully"
    ))
}))

const getAllproduct = asyncHandler(async(req, res) => {
  
     const pageSize = 6;
     const keyword = req.query.keyword ? 
         {name: {$regex : req.query.keyword, $options:"i"}}: {};
    console.log(keyword)
     
     const count = await Product.countDocuments({...keyword});
     const product = await Product.find({...keyword}).limit(pageSize)
 
     res.json({
         product,
         page:1,
         pages:Math.ceil(count/pageSize),
         hasMore:false
     })
   
})

const updateProduct = asyncHandler(async(req,res) => {
    const {id} = req.params
    if(!id) {
        throw new ApiError(500, "id is required")
    }
    const product = await Product.findById(id)
    if(!product){
        throw new ApiError(404, "Product not found")
    }
    const updatedProduct = await Product.findByIdAndUpdate(id,{...req.fields},{new:true})
    if(!updatedProduct){
        throw new ApiError(500, "Something went wrong while updating a product")
    }

    return res. status(200)
    .json(new ApiResponse(
        200,
        updatedProduct,
        "updated product successfully"
    ))
})

const fetchAllProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({}).populate("category").limit(12)

    return res.status(200)
    .json(new ApiResponse(
        200,
        products,
        "all products fetched"
    ))
})

const addProductReview = asyncHandler(async(req, res) => {
    const {rating, comment} = req.body
    console.log(rating)
    const product = await Product.findById(req.params.id)
    if(product){
        const alreadyReviewed = product.review.find(r => r.user.toString() === req.user._id.toString() )
        if(alreadyReviewed){
            throw new ApiError(400, "Product Already Reviewed")
        }

        const review = {
            name: req.user.username,
            rating:Number(rating ),
            comment,
            user: req.user._id
        }

        product.review.push(review)
        product.numReviews = product.review.length

        product.rating = product.review.reduce((acc, item) => item.rating + acc,0)/product.review.length

        await product.save()

        res.status(200).json({message:" review is added"})
    }else{
        throw new ApiError(404, "Product not found")
    }
})

const getTopProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(4)
    return res.status(200)
    .json( new ApiResponse(
        200, 
        products,
        "Top Products fetch"
    ))
})

const getNewProduct = asyncHandler(async(req, res) => {
    const product =await Product.find().sort({_id:-1}).limit(12)
    return res.status(200)
    .json( new ApiResponse(
        200, 
        product,
        "New Products fetch"
    ))
})

const filterProducts = asyncHandler(async(req, res) => {
    try {
            const {checked, radio} = req.body;

            let arg = {}
            if (checked.length > 0) arg.category = checked
            if(radio.length) arg.price = {$gte: radio[0], $lte: radio[1]} 

            const products = await Product.find(arg)
            res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Server Error"})
    }
})

export { AddProduct, deleteProduct, getProductById, getAllproduct, updateProduct, fetchAllProducts, addProductReview, getTopProducts, getNewProduct, filterProducts };
