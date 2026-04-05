import React, { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import debounce from "lodash/debounce"
import { useSearchProductQuery } from "../redux/Api/productApiSlice";
import { PRODUCT_URL } from "../redux/constants";
import { Link } from "react-router-dom";

const SearchbarHeader = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(productList.length)


  const handleSearch = async(value) => {
    console.log(value);
    const res = await fetch(`http://localhost:4000/api/products/search?search=${value}`);
    const data = await res.json();
    console.log(data)
    setProductList(data)

  };

  const debouncedSearch = debounce((value) => handleSearch(value),500) 
    

  const handleChange = (e) => {

     if (!e.target.value.trim()) {
    setProductList([]); // clear UI
    return;
  }
    debouncedSearch(e.target.value)
  }

    return (
    
    <div className="w-full h-15 border-b mb-5 flex justify-center align-middle">
      <div className="w-100 border border-black rounded-full mb-2 px-5 flex align-middle relative">
        <input
          className=" w-full h-full focus:outline-0 text-[18px] text-gray-400 "
          onChange={(e) => handleChange(e)}
        />
        <FaSearch className="h-full cursor-pointer" size={26} />
        <div className={`absolute w-full h-full -bottom-13 z-10  ${productList.length<1?"hidden":"grid"}       `}>
            {
                productList.map((product) => (
                    <Link key={product._id} to={`/product/${product._id}`}>
                        <div className="flex bg-white border p-2">
                            <img src={product.image} alt="" className="w-10" />
                            <p className="text-gray-500 text-[20px]">{product.name}</p>
                        </div>
                    </Link>
                ))
            }
        </div>
      </div>
    </div>
  );
};

export default SearchbarHeader;
