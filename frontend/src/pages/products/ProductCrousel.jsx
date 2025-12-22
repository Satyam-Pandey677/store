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
          className="xl:w-300 lg:w-200 md:w-4xl sm:w-160 sm:block"
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
                  className="w-full rounded-lg object-cover h-120 z-0"
                />
                <div className="absolute bottom-6 left-6 bg-black/60 z-20 text-white px-4 py-2 rounded-md">
                  <h2 className="text-xl font-bold">{name}</h2>
                </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCrousel;
