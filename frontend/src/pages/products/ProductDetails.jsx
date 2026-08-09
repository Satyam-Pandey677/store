import { useGetProductDetailsQuery, useReviewProductMutation } from "../../redux/Api/productApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import Loader from "../../component/Loader";
import { FaBox, FaClock, FaShoppingCart, FaStar } from "react-icons/fa";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import ProductTabs from "./ProductTabs";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cart/carSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productData, refetch } = useGetProductDetailsQuery(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const userInfo = useSelector((state) => state.auth);

  useEffect(() => {
    setProduct(productData?.data || null);
  }, [productData]);

  const [createReview, { isLoading: loadingProductReview }] = useReviewProductMutation();

  if (!product) {
    return <Loader />;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({ id, rating, comment }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.message || "Unable to submit review");
    }
  };

  const addToCatHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100 p-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-[420px] w-full rounded-[1.25rem] object-cover sm:h-[520px]"
            />
            <div className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700 shadow-sm">
              {product.brand || "Featured"}
            </div>
            <HeartIcon product={product} />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-600">Product overview</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{product.name}</h1>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {product.discription || "A carefully selected product designed for comfort, quality, and everyday use."}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">Price</p>
                  <p className="text-3xl font-bold text-slate-900">${product.price}</p>
                </div>
                <div className="rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-700">
                  Free shipping over $75
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FaClock className="text-pink-500" />
                    <span className="text-sm">Added {moment(product.createdAt).fromNow()}</span>
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FaStar className="text-pink-500" />
                    <span className="text-sm">{product.numReviews} reviews</span>
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FaStar className="text-pink-500" />
                    <span className="text-sm">Rated {Math.round(product.rating)} / 5</span>
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FaBox className="text-pink-500" />
                    <span className="text-sm">{product.countInStock > 0 ? `${product.countInStock} in stock` : "Out of stock"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-slate-700">
                  <FaShoppingCart className="text-pink-500" />
                  <span className="font-medium">Quantity</span>
                </div>
                {product.countInStock > 0 ? (
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 sm:w-32"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="text-sm font-semibold text-red-600">Unavailable right now</span>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={addToCatHandler}
                  disabled={product.countInStock === 0}
                  className="flex-1 rounded-full bg-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Add to cart
                </button>
                <div className="flex-1 rounded-full border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700">
                  Secure checkout
                </div>
              </div>
            </div>

            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </div>
        </div>

        <div className="mt-10">
          <ProductTabs
            loadingProductReview={loadingProductReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            product={product}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
