import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFiltedProductsQuery } from "../redux/Api/productApiSlice";
import {
  setCategories,
  setProducts,
  setChcked,
} from "../redux/features/shop/sliceShop";
import Loader from "../component/Loader";
import { useFetchAllCategoriesQuery } from "../redux/Api/apiCategorySlice";
import ProductCard from "./products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, product, checked, radio } = useSelector(
    (state) => state.shop
  );
  const categoriesQuery = useFetchAllCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductQuery = useGetFiltedProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data || []));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductQuery.isLoading) {
        const filteredProducts = filteredProductQuery.data.filter((product) => {
          return (
            product.price.toString().includes(priceFilter) ||
            product.price == parseInt(priceFilter, 10)
          );
        });
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductQuery.data?.filter(
      (product) => product.brand == brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c != id);
    dispatch(setChcked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand != undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-[2rem] bg-linear-to-r from-slate-900 via-slate-800 to-pink-700 p-8 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-100">Discover more</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Browse our full collection</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
            Explore handpicked products with easy filters and a smoother shopping experience.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm lg:w-80">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Categories</h2>
              <div className="mt-4 space-y-3">
                {categories.data?.map((c) => (
                  <label key={c._id} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="h-4 w-4 rounded border-slate-300 text-pink-600 focus:ring-pink-500"
                    />
                    <span>{c.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Brands</h2>
              <div className="mt-4 space-y-3">
                {uniqueBrands?.map((brand) => (
                  <label key={brand} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="h-4 w-4 border-slate-300 text-pink-600 focus:ring-pink-500"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Price</h2>
              <input
                type="text"
                placeholder="Enter price"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />
            </div>

            <button
              className="w-full rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              onClick={() => window.location.reload()}
            >
              Reset filters
            </button>
          </aside>

          <main className="flex-1 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Shop collection</p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-900">{product.length} products</h2>
              </div>
              <div className="rounded-full bg-pink-50 px-4 py-2 text-sm font-medium text-pink-700">
                Free shipping on orders over $75
              </div>
            </div>

            {product.length === 0 ? (
              <div className="flex min-h-70 items-center justify-center rounded-4xl border border-dashed border-slate-300 bg-slate-50">
                <Loader />
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {product.map((p) => (
                  <ProductCard key={p._id} p={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
