import { Link, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../redux/Api/productApiSlice';
import Loader from '../component/Loader';
import Message from '../component/Message';
import Product from './products/Product';
import ProductCrousel from './products/ProductCrousel';
import SearchbarHeader from '../component/SearchbarHeader';

const categories = [
  { title: 'Trending Tech', subtitle: 'Smart gadgets and everyday essentials', accent: 'from-pink-500 to-rose-500' },
  { title: 'Fresh Fashion', subtitle: 'Comfortable styles that look polished', accent: 'from-slate-700 to-slate-900' },
  { title: 'Home Upgrade', subtitle: 'Small touches that make a big difference', accent: 'from-amber-500 to-orange-500' },
];

const highlights = [
  'Fast checkout and secure payments',
  'Curated picks updated every week',
  'Reliable delivery with friendly support',
];

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductQuery({ keyword });

  const products = data?.product || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SearchbarHeader />

        {!keyword && (
          <>  
            <section className="mb-8 grid gap-4 md:grid-cols-3">
              {categories.map((category) => (
                <div
                  key={category.title}
                  className={`rounded-[1.5rem] bg-gradient-to-br ${category.accent} p-6 text-white shadow-sm`}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">Curated picks</p>
                  <h2 className="mt-3 text-xl font-semibold">{category.title}</h2>
                  <p className="mt-2 text-sm text-white/90">{category.subtitle}</p>
                </div>
              ))}
            </section>

            <section className="mb-8 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Featured deals</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Trending picks for your next order</h2>
                </div>
                <Link to="/shop" className="text-sm font-semibold text-pink-600 transition hover:text-pink-700">
                  View all products
                </Link>
              </div>
              <ProductCrousel />
            </section>
          </>
        )}

        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Curated collection</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {keyword ? `Results for “${keyword}”` : 'Popular products'}
              </h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
            >
              Browse the full shop
            </Link>
          </div>

          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Message variant="danger">{isError.error || 'Unable to load products right now.'}</Message>
          ) : products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
              No products are available right now. Please check back soon.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;