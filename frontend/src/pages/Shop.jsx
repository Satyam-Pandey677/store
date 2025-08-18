import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector } from "react-redux";
import { useGetFiltedProductsQuery} from "../redux/Api/productApiSlice"
import { setCategories, setProducts, setChcked} from "../redux/features/shop/sliceShop"
import Loader from "../component/Loader"
import {useFetchAllCategoriesQuery} from "../redux/Api/apiCategorySlice"
 
const Shop = () => {
    const dispatch = useDispatch()
    const {categories, product, checked, radio} = useSelector((state) => state.shop)
    console.log("Redux categories:", categories.data);
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
                <div className='bg-[#151515] p-3 mt-2 mb-2'>
                    <h2 className="h4 text-center py-2 bg-gray-400 rounded-full p-3">
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
                                    />
                                    <h2 className='text-white'>{c.name}</h2>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default Shop