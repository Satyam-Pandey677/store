import {Link} from "react-router-dom"
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useDispatch } from "react-redux"
import {addToCart} from "../../redux/features/cart/carSlice"
import {toast} from "react-toastify"
import HeartIcon from "./HeartIcon"

const ProductCard = ({p}) => {
    console.log(p)
    const dispatch = useDispatch()
  return (
    <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <section className="relative">
            <Link to={`/product/${p._id}`}>
                <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-700 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                    {p?.brand}
                </span>

                <img
                    className="cursor-pointer w-full" 
                    src={p.image} 
                    alt={p.name} 
                    style={{height:'170px', objectFit:"cover"}}
                />
            </Link>
                <HeartIcon product={p} />
        </section>

        <div className="p-5">
            <div className="flex justify-between">
                <h5 className=" mb-2 text-xl text-white dark:text-white">{p.name}</h5>
                <p className="text-black font-semibold text-pink-500">
                    {p.price?.toLocaleString('en-US', {
                        style:'currency',
                        currency:"USD"
                    })}
                </p>
            </div>
        </div>
    </div>
  )
}

export default ProductCard