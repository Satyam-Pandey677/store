import { Link } from "react-router-dom"
import HeartIcon from "./HeartIcon"

const Product = ({ product }) => {
  const description = product?.discription?.slice(0, 80) || "Premium product selected for everyday convenience.";

  return (
    <div className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden bg-slate-100">
        <Link to={`/product/${product._id}`} className="block">
          <img
            src={product?.image}
            alt={product?.name}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700 shadow-sm">
          Fresh pick
        </span>
        <HeartIcon product={product} />
      </div>

      <div className="space-y-3 p-5">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-slate-900 transition hover:text-pink-600">
            {product?.name}
          </h3>
        </Link>

        <p className="text-sm leading-6 text-slate-600">{description}...</p>

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-xl font-bold text-slate-900">${product?.price}</p>
            <p className="text-sm text-slate-500">Free shipping</p>
          </div>
          <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-sm font-medium text-pink-700">
            Shop now
          </span>
        </div>
      </div>
    </div>
  )
}

export default Product