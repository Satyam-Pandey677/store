import { useGetProductDetailsQuery, useReviewProductMutation } from "../../redux/Api/productApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import Loader from "../../component/Loader";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Rating from "./Rating";
import ProductTabs from "./ProductTabs";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productData, isLoading, refetch ,error } = useGetProductDetailsQuery(id);
  const navigate = useNavigate()

  const [product , setProduct] = useState([])
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const userInfo = useSelector(state => state.auth)
  useEffect(() => {
    setProduct(productData?.data)
  },[productData])

  const [createReview, {isLoading:loadingProductReview}] = useReviewProductMutation()

  if (!product) {
    return <Loader />;
  }

  const addToCart = () => {

  }

  const submitHandler = async(e) => {
    e.preventDefault()

    try {
      await createReview({id, rating, comment }).unwrap()
      refetch()
      toast.success("Review created succesfully")
      
    } catch (error) {
      toast.error(error.message)
    }
  }
  
console.log(product.rating)
  return (
    <div className="px-[9rem] ">
    <div className="mt-[3rem] flex justify-center gap-10">
        <div className="relative w-[50rem]">
        <img
          src={product.image}
          alt={product.name}
          className="w-[50rem] rounded"
        />
        <HeartIcon product={product} />
      </div>
      <div className="w-[50rem] p-5">
        <h1 className="text-[50px]">{product.name}</h1>
        <span className="text-[25px] text-gray-400">{product.brand}</span>

        <hr className="my-[2rem] " />
        <h1 className="text-[35px] font-bold text-gray-600">
          $ {product.price}
        </h1>
        <span className="text-gray-600">incl. of all taxes</span>

        <div className=" flex gap-25 ">
        <div className="flex justify-between w-[20rem] mt-[2rem] gap-15">
          <div className="one">
            
            <h1 className="flex items-center mb-6 w-[10rem]">
              <FaClock className="mr-2" /> Added:{" "}
              {moment(product.createdAt).fromNow()}
            </h1>
            <h1 className="flex items-center mb-6 w-[8rem]">
              <FaStar className="mr-2" /> Reviews: {product.numReviews}
            </h1>
          </div>

          <div className="two">
            <h1 className="flex item-center mb-6 w-[7rem]">
              <FaStar className="mr-2 mt-1 " /> Ratings:{" "}
              {Math.round(product.rating)}
            </h1>
            <h1 className="flex item-center mb-6 w-[7rem]">
              <FaShoppingCart className="mr-2 mt-1 " /> Quantity:{" "}
              {product.countInStock > 0 && (
                    <div>
                        <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            className="p-2 w-[6rem] rounded-lg text-black"
                            >
                                {[...Array(product.countInStock).keys()].map((x) => (
                                    <option key={x+1} value={x+1} className="outline">
                                        {x+1}
                                    </option>
                                ))}

                        </select>
                    </div>
              )}
            </h1>
            <h1 className="flex item-center mb-6 w-[7rem]">
              <FaBox className="mr-2 mt-1 " /> In Stock: {product.countInStock}
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-15">
                <button onClick={addToCart} disable={product.countInStock === 0}  className="w-[20rem] text-center py-2 bg-pink-600 text-[30px] rounded-lg hover:bg-pink-700 text-white font-bold">
                    Add Cart
                </button>
                <button className="w-[20rem] text-center py-2 bg-pink-600 text-[30px] rounded-lg hover:bg-pink-700 text-white font-bold">
                    Buy
                </button>
        </div>
        </div>
        <div className="flex justify-between flex-wrap">
                <Rating 
                    value={product.rating}
                    text = {`${product.numReviews} reviews`}
                />
          </div> 
      </div>
    </div>
    
    <div className="mt-[5rem] container flex flex-wrap item-start justify-between ml-[10rem]">
      <ProductTabs 
        loadingProductReview={loadingProductReview} 
        userInfo={userInfo}
        submitHandler = {submitHandler}
        rating = {rating}
        setRating = {setRating}
        comment= {comment}
        setComment = {setComment}
        product = {product}
      />
    </div>
        
    </div>
  );
};

export default ProductDetails;
