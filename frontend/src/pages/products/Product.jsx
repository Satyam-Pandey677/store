import { Link } from "react-router-dom"
import HeartIcon from "./HeartIcon"

const Product = ({product}) => {
  return (
    <div className="w-[18rem] ml-8 p-3 relative">
        <div className="relative h-87.5">
            <img src={product?.image} alt={product?.name} className="w-[30rem] rounded h-full" />
            <HeartIcon product={product}/>
        </div>

        <div className="p-4">
            <Link to={`/product/${product._id}`}>
                <div className="flex justify-between item-center">
                    <div className="text-lg">
                        {product?.name}
                    </div>
                    <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300 ">$ ${product?.price}</span>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Product