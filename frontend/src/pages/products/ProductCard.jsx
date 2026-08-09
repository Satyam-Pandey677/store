import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/carSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      autoClose: 2000,
    });
  };

  return (
    <div className="group overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <section className="relative overflow-hidden bg-slate-100">
        <Link to={`/product/${p._id}`}>
          <img
            className="h-56 w-full cursor-pointer object-cover transition duration-500 group-hover:scale-105"
            src={p.image}
            alt={p.name}
          />
        </Link>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700 shadow-sm">
          {p?.brand || "New"}
        </span>
        <HeartIcon product={p} />
      </section>

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <Link to={`/product/${p._id}`}>
            <h5 className="text-lg font-semibold text-slate-900 transition hover:text-pink-600">
              {p.name}
            </h5>
          </Link>
          <p className="text-lg font-bold text-pink-600">
            ${p.price}
          </p>
        </div>

        <p className="text-sm leading-6 text-slate-600">
          {p?.discription?.substring(0, 70) || "Premium product crafted for daily use."}...
        </p>

        <div className="flex items-center justify-between pt-2">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center text-sm font-semibold text-pink-600 transition hover:text-pink-700"
          >
            See details
            <span className="ml-2">→</span>
          </Link>

          <button
            className="rounded-full bg-slate-900 p-2.5 text-white transition hover:bg-pink-600"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard