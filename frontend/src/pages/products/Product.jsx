import { Link } from "react-router-dom"
import HeartIcon from "./HeartIcon"

const Product = ({ product }) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden bg-slate-100">
        <Link to={`/product/${product._id}`} className="block">
          <img
            src={product?.image}
            alt={product?.name}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <HeartIcon product={product} />
      </div>

      <div className="space-y-3 p-5">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-slate-900 transition hover:text-pink-600">
            {product?.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">${product?.price}</span>
          <span className="inline-flex rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-700">
            Buy now
          </span>
        </div>
      </div>
    </div>
  )
}

export default Product