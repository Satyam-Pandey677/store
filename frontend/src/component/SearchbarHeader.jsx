import { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import debounce from "lodash/debounce"
import { Link } from "react-router-dom";

const SearchbarHeader = () => {
  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = async (value) => {
    if (!value.trim()) {
      setProductList([]);
      return;
    }

    try {
      const res = await fetch(`https://store-5w0m.onrender.com/api/products/search?search=${encodeURIComponent(value)}`);
      const data = await res.json();
      setProductList(Array.isArray(data) ? data : []);
    } catch (error) {
      setProductList([]);
    }
  };

  const debouncedSearch = useMemo(() => debounce((value) => handleSearch(value), 250), []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value.trim()) {
      setProductList([]);
      return;
    }
    debouncedSearch(value);
  };

  return (
    <div className="relative mb-8">
      <div className="mx-auto max-w-3xl rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <FaSearch className="text-slate-400" size={22} />
          <input
            value={query}
            onChange={handleChange}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full bg-transparent text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {productList.length > 0 && (
        <div className="absolute left-0 right-0 z-20 mx-auto mt-2 max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          {productList.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`}>
              <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 transition hover:bg-slate-50">
                <img src={product.image} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                <div>
                  <p className="font-medium text-slate-900">{product.name}</p>
                  <p className="text-sm text-slate-500">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchbarHeader;
