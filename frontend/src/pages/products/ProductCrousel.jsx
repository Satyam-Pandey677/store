import { useGetTopProductQuery } from "../../redux/Api/productApiSlice";
import Message from "../../component/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCrousel = () => {
  const { data, isLoading, error } = useGetTopProductQuery();

  const settings = {
    dots: false,
    Infinity: true,
    speed: 500,
    slidesToShow: 1,
    slideToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 xl:block lg:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[75rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {data?.data.map(
            ({
              image,
              _id,
              name,
              price,
              discription,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} >
                <div className="relative overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem] z-0"
                />
                <div className="absolute bottom-6 left-6 bg-black/60 z-20 text-white px-4 py-2 rounded-md">
                  <h2 className="text-xl font-bold">{name}</h2>
                </div>
                </div>
                {/* <div className="flex justify-between w-[20rem]">
                            <div className="one">
                                <p>${price}</p> <br />
                                <p className="w-[25rem]">{discription.substring(0,170)}...</p>
                            </div>
                            <div className="flex justify-between w-[20rem]">
                                <div className="one">
                                    <h1 className="flex items-center mb-6 w-[8rem]">
                                        <FaStore className="mr-2"/> Brand: {brand}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[10rem]">
                                        <FaClock className="mr-2"/> Added:{" "} {moment(createdAt).fromNow()}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[8rem]">
                                        <FaStar className="mr-2"/> Reviews: {numReviews}
                                    </h1>
                                </div>

                                <div className="two">
                                    <h1 className="flex item-center mb-6 w-[7rem]">
                                        <FaStar className="mr-2 mt-1 "/> Ratings:{" "} {Math.round(rating)}
                                    </h1>
                                    <h1 className="flex item-center mb-6 w-[7rem]">
                                        <FaShoppingCart className="mr-2 mt-1 "/> Quantity:{" "} {quantity}
                                    </h1>
                                    <h1 className="flex item-center mb-6 w-[7rem]">
                                        <FaBox className="mr-2 mt-1 "/> In Stock:{" "} {countInStock}
                                    </h1>
                                </div>
                            </div>
                        </div> */}
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCrousel;
