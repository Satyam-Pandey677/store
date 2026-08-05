import { Link } from "react-router-dom"
import { FiShoppingBag, FiHeart, FiGift, FiStar } from "react-icons/fi"
import ProductCrousel from "../pages/products/ProductCrousel"
import SmallProducts from "../pages/products/SmallProducts"
import { useGetTopProductQuery } from "../redux/Api/productApiSlice"
import Loader from "./Loader"

const Header = () => {
  const { data, isLoading, error } = useGetTopProductQuery()

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <h1 className="text-center text-red-600">Unable to load featured products.</h1>
  }

  return (
    <header className="mb-10 rounded-[2rem] bg-white p-6 shadow-sm shadow-slate-200">
      <div className="flex flex-col gap-6 lg:gap-8">
        <nav className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-extrabold text-slate-900">
            <FiShoppingBag className="text-pink-600" size={28} />
            StoreMate
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-700">
            <Link to="/" className="rounded-full px-4 py-2 transition hover:bg-pink-600 hover:text-white">
              Home
            </Link>
            <Link to="/shop" className="rounded-full px-4 py-2 transition hover:bg-pink-600 hover:text-white">
              Shop
            </Link>
            <Link to="/favorite" className="rounded-full px-4 py-2 transition hover:bg-pink-600 hover:text-white">
              Favorites
            </Link>
            <Link to="/cart" className="rounded-full px-4 py-2 transition hover:bg-pink-600 hover:text-white">
              Cart
            </Link>
          </div>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_0.75fr] lg:items-stretch">
          <div className="rounded-[2rem] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-500 p-8 text-white shadow-lg">
            <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm uppercase tracking-[0.3em] text-white/90">
              New arrivals
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Explore trending styles, fast shipping, and daily deals.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/85">
              Shop top-rated products, discover fresh collections, and enjoy a smooth checkout experience built for modern shoppers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                Shop now
              </Link>
              <Link to="/favorite" className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                View favorites
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {[
                { icon: <FiGift size={20} />, label: "Free shipping over $99" },
                { icon: <FiStar size={20} />, label: "Top rated brands" },
                { icon: <FiHeart size={20} />, label: "Curated favorites" },
                { icon: <FiShoppingBag size={20} />, label: "Secure checkout" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-3xl bg-white/10 px-4 py-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 text-white">
                    {item.icon}
                  </div>
                  <p className="text-sm text-white/90">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-100 p-5">
            <h2 className="mb-5 text-xl font-semibold text-slate-900">Featured products</h2>
            <ProductCrousel />
            <div className="mt-6 hidden gap-4 xl:grid grid-cols-2">
              {data?.data.slice(0, 4).map((product) => (
                <SmallProducts key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header