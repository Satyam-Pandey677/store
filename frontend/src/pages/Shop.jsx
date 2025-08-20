import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector } from "react-redux";
import { useGetFiltedProductsQuery} from "../redux/Api/productApiSlice"
import { setCategories, setProducts, setChcked} from "../redux/features/shop/sliceShop"
import Loader from "../component/Loader"
import {useFetchAllCategoriesQuery} from "../redux/Api/apiCategorySlice"
import ProductCard from './products/ProductCard';
 
const Shop = () => {
    const dispatch = useDispatch()
    const {categories, product, checked, radio} = useSelector((state) => state.shop)
    const categoriesQuery = useFetchAllCategoriesQuery()
    const [priceFilter, setPriceFilter] = useState("")

    const filteredProductQuery = useGetFiltedProductsQuery({
        checked,
        radio
    })

    useEffect(() => {
        if(!categoriesQuery.isLoading && categoriesQuery.data){
            dispatch(setCategories(categoriesQuery.data || []))
        }
    },[categoriesQuery.data, dispatch])


    useEffect(() => {
        if(!checked.length || !radio.length){
            if(!filteredProductQuery.isLoading){
                const filteredProducts = filteredProductQuery.data.filter((product) => {
                    return (
                        product.price.toString().includes(priceFilter) || product.price == parseInt(priceFilter,10)
                    )
                })
                dispatch(setProducts(filteredProducts))
            }
        }
    },[checked, radio, filteredProductQuery.data, dispatch,priceFilter])

    const handleBrandClick =  (brand) => {
        const productsByBrand = filteredProductQuery.data?.filter((product) => product.brand == brand)
        dispatch(setProducts(productsByBrand))
    }

    const handleCheck = (value, id) => {
        const updatedChecked = value ? [...checked, id] : checked.filter((c) => c != id)
        dispatch(setChcked(updatedChecked))
    }

    const uniqueBrands = [
        ...Array.from(
            new Set(filteredProductQuery.data?.map((product) => product.brand). filter((brand) => brand != undefined)
            )
        )
    ]


    const handlePriceChange = (e) => {
        setPriceFilter(e.target.value)
    }

  return (
    <>
        <div className="container mx-auto">
            <div className='flex md:flex-row'>
                <div className='bg-[#fff] p-3 mt-2 mb-2 shadow-2xl rounded-lg'>
                    <h2 className="h4 text-center py-2 bg-gray-400 text-white font-bold rounded-full p-3">
                        Filter By Categories
                    </h2>

                    <div className="p-5 w-[15rem]">
                        {categories.data?.map((c) => (
                            <div key={c._id} className='mb-2'>
                                <div className='flex items-center mr-4'>
                                    <input 
                                        type="checkbox" 
                                        id='red-checkbox' 
                                        onChange={(e) => handleCheck(e.target.checked, c._id)} 
                                        className='w-4 h-4 text-pink-600 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                    />
                                    <label htmlFor='pink-checkbox' className='text-sm ml-2 font-medium '>
                                        {c.name}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                        <h2 className='h4 text-center py-2 bg-gray-400 text-white font-bold rounded-full mb-2'>
                            Filter By Brand
                        </h2>

                        <div className="pl-5">

                            {uniqueBrands?.map((brand) => (
                                <>
                                    <div className='flex items-center mr-4 mb-5'>
                                        <input 
                                            type="radio" 
                                            id={brand} 
                                            name='brand' 
                                            onChange={() => handleBrandClick(brand)}
                                            className='w-4 h-4 text-pink-600 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                        />
                                        <label htmlFor="pink-radio" className='ml-2  text-sm font-medium'>
                                            {brand}
                                        </label>
                                    </div> 
                                </>
                            ))}
                        </div>
                        <h2 className='h4 text-center py-2 bg-gray-400 text-white font-bold rounded-full mb-2'>
                            Filter By Price
                        </h2>
                        <div className='p-5 w-[15rem]'>
                            <input 
                                type="text" 
                                placeholder='Enter price' 
                                value={priceFilter} 
                                onChange={(e) => setPriceFilter(e.target.value)} 
                                className='w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300'    
                            />
                        </div>

                        <div className="p-5 pt-0">
                            <button className='w-full border my-4' onClick={() => window.location.reload()}>
                                Reset
                            </button>
                        </div>
                </div>

                <div className='p-3'>
                    <h2 className='h4 text-center mb-2'>{product.length} Products</h2>
                    <div className='flex flex-wrap'>
                        {product.length == 0 ? (
                            <Loader/>
                        ):(
                            product.map((p) => (
                                <div className='p-3' key={p._id}>
                                    <ProductCard p={p}/>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Shop