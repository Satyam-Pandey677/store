import React, { useState } from "react";
import { AiFillShopping } from "react-icons/ai";
import Product from "./Product";
import Loader from "../../component/Loader";
import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favrates/favoriteSlice";

const Favorites = () => {

     const Favorites = useSelector(selectFavoriteProduct)



  return (
    <div className="px-36 mt-20">
      <div className="flex gap-5">
        <h1 className="text-[50px] font-bold">Wishlist </h1>
        <AiFillShopping
          className="mt-4 text-black"
          size={50}
        />
      </div>
      <div className="flex flex-wrap gap-5 mt-20" >
        {Favorites? (Favorites.map((product) => (
            <div key={product.id}>
                <Product product={product}/>
            </div>
        ))):(
            <Loader/>
        )
    }
      </div>
    </div>
  );
};

export default Favorites;
