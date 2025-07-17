import { useGetProductDetailsQuery } from "../../redux/Api/productApiSlice";
import { useParams } from "react-router-dom";
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

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productData, isLoading, error } = useGetProductDetailsQuery(id);
  console.log(productData);
  const product = productData.data;

  if (!product) {
    return <Loader />;
  }
  return (
    <div className="px-[9rem] mt-[3rem] flex justify-center gap-10">
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

        <div className="flex gap-25 ">
            <div className="flex justify-between w-[20rem] mt-[2rem] gap-20">
          <div className="one">
            <h1 className="flex items-center mb-6 w-[8rem]">
              <FaStore className="mr-2" /> Brand: {product.brand}
            </h1>
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
              {product.quantity}
            </h1>
            <h1 className="flex item-center mb-6 w-[7rem]">
              <FaBox className="mr-2 mt-1 " /> In Stock: {product.countInStock}
            </h1>
          </div>
            </div>
            <div className="flex flex-col gap-5 mt-15">
                <button className="w-[20rem] text-center py-2 bg-pink-600 text-[30px] rounded-lg hover:bg-pink-700 text-white font-bold">
                    Add Cart
                </button>
                <button className="w-[20rem] text-center py-2 bg-pink-600 text-[30px] rounded-lg hover:bg-pink-700 text-white font-bold">
                    Buy
                </button>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default ProductDetails;
