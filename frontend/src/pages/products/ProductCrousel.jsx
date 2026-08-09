import { Link } from "react-router-dom";
import { useGetTopProductQuery } from "../../redux/Api/productApiSlice";
import Message from "../../component/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCrousel = () => {
  const { data, isLoading, error } = useGetTopProductQuery();
  const products = data?.data || [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  if (isLoading) {
    return null;
  }

  if (error) {
    return <Message variant="danger">{error?.data?.message || error.message}</Message>;
  }

  return (
    <div className="w-full">
      {products.length > 0 ? (
        <Slider {...settings} className="overflow-hidden rounded-[1.5rem]">
          {products.map((product) => (
            <div key={product._id}>
              <div className="relative h-[320px] overflow-hidden rounded-[1.5rem] sm:h-[400px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                  <p className="mb-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/90">
                    Featured product
                  </p>
                  <h3 className="text-2xl font-semibold sm:text-3xl">{product.name}</h3>
                  <p className="mt-2 max-w-xl text-sm text-slate-200 sm:text-base">
                    {product.discription?.slice(0, 90) || 'A handpicked item designed to elevate your everyday routine.'}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-900">
                      ${product.price}
                    </span>
                    <Link
                      to={`/product/${product._id}`}
                      className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                    >
                      Shop now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : null}
    </div>
  );
};

export default ProductCrousel;
