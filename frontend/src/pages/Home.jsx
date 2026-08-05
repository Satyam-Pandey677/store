import { Link, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../redux/Api/productApiSlice';
import Loader from '../component/Loader';
import Header from '../component/Header';
import Message from '../component/Message';
import Product from './products/Product';
import SearchbarHeader from '../component/SearchbarHeader';

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductQuery({ keyword });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SearchbarHeader />

        {!keyword && (
          <section className="mb-10 overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm shadow-slate-200">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div className="max-w-xl">
                <p className="mb-3 inline-flex rounded-full bg-pink-100 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-pink-700">
                  Featured collection
                </p>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  Discover your next favorite product.
                </h1>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Handpicked items from our best sellers, curated to help you shop faster and smarter.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center rounded-full bg-pink-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-pink-700"
                  >
                    Browse all products
                  </Link>
                  <Link
                    to="/cart"
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    View cart
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] bg-slate-100 p-6">
                <Header />
              </div>
            </div>
          </section>
        )}

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">{isError.error}</Message>
        ) : (
          <>
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">New arrivals</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Special products</h2>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
              >
                Shop all products
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data?.product?.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;