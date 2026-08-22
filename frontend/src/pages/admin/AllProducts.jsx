import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/Api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../component/Loader";
import { ArrowUpRight, PackageOpen } from "lucide-react";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  const navigate = useNavigate();

  console.log(products);
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <section className="space-y-8">
      <AdminMenu />
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-600">Catalog</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">All products</h1>
          <p className="mt-2 text-sm text-slate-500">Review your inventory and open any product to edit its details.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500"><PackageOpen size={17} className="text-pink-600" /> {products.data.length} products</div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.data.map((product) => (
          <article key={product._id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-pink-200 hover:shadow-lg hover:shadow-pink-100/50" onClick={() => navigate(`/admin/product/update/${product._id}`)}>
            <div className="relative flex h-56 items-center justify-center bg-slate-50 p-5">
              <img src={product.image} alt={product.name} className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
              <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">${product.price}</span>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold text-slate-900">{product.name}</h2>
                <p className="shrink-0 text-xs text-slate-400">{moment(product.createdAt).format("MMM D, YYYY")}</p>
              </div>
              <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">{product.discription?.substring(0, 110) || "No description available."}{product.discription?.length > 110 ? "..." : ""}</p>
              <Link to={`/admin/product/update/${product._id}`} onClick={(event) => event.stopPropagation()} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-pink-600 transition hover:text-pink-700">Update product <ArrowUpRight size={16} /></Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
