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
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import ProductTabs from "./ProductTabs";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cart/carSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productData, isLoading, refetch ,error } = useGetProductDetailsQuery(id);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [product , setProduct] = useState([])
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const userInfo = useSelector(state => state.auth)
  useEffect(() => {
    setProduct(productData?.data)
    console.log(productData?.data)
  },[productData])

  const [createReview, {isLoading:loadingProductReview}] = useReviewProductMutation()

  if (!product) {
    return <Loader />;
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
  
  

  const addToCatHandler = () => {
    dispatch(addToCart({...product, qty}))
    navigate("/cart");
  }
  

  return (
    <div className="px-36 ">
    <div className="mt-12 flex justify-center gap-10">
        <div className="relative w-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-200 rounded"
        />
        <HeartIcon product={product} />
      </div>
      <div className="w-20 p-5">
        <h1 className="text-[50px]">{product.name}</h1>
        <span className="text-[25px] text-gray-400">{product.brand}</span>

        <hr className="my-8 " />
        <h1 className="text-[35px] font-bold text-gray-600">
          $ {product.price}
        </h1>
        <span className="text-gray-600">incl. of all taxes</span>

        <div className=" flex gap-25 ">
        <div className="flex justify-between w-[20rem] mt-8 gap-15">
          <div className="one">
            
            <h1 className="flex items-center mb-6 w-40">
              <FaClock className="mr-2" /> Added:{" "}
              {moment(product.createdAt).fromNow()}
            </h1>
            <h1 className="flex items-center mb-6 w-32">
              <FaStar className="mr-2" /> Reviews: {product.numReviews}
            </h1>
          </div>

          <div className="two">
            <h1 className="flex item-center mb-6 w-28">
              <FaStar className="mr-2 mt-1 " /> Ratings:{" "}
              {Math.round(product.rating)}
            </h1>
            <h1 className="flex item-center mb-6 w-28">
              <FaShoppingCart className="mr-2 mt-1 " /> Quantity:{" "}
              {product.countInStock > 0 && (
                    <div>
                        <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            className="p-2 w-24 rounded-lg text-black"
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
            <h1 className="flex item-center mb-6 w-28">
              <FaBox className="mr-2 mt-1 " /> In Stock: {product.countInStock}
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-15">
                <button onClick={addToCatHandler} disabled={product.countInStock == 0}  className="w-[20rem] text-center py-2 bg-pink-600 text-[30px] rounded-lg hover:bg-pink-700 text-white font-bold">
                    Add Cart
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
    
    <div className="mt-20 container flex flex-wrap item-start justify-between ml-40">
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
