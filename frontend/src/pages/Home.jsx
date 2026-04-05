import { Link, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../redux/Api/productApiSlice';
import Loader from '../component/Loader';
import Header from '../component/Header';
import Message from '../component/Message';
import Product from './products/Product';

const Home = () => {
  const {keyword} = useParams()
  const {data, isLoading, isError} = useGetProductQuery({keyword})
  
  
  return (
    <div className='ml-10'>
      {!keyword ? <Header/> : null }
      {isLoading ? (<Loader/>): isError ? (<Message variant='danger'>{isError.error}</Message>):(
        <>
          <div className="flex justify-between items-center">
            <h1 className='ml-80 mt-40 text-[3rem]'>
              Speacial Products
            </h1>

            <Link to="/shop" className='bg-pink-600 font-bold rounded-full py-2 px-10 mr-72 mt-40'>
                Shop
            </Link>
            </div>

            <div className="flex justify-center flex-wrap mt-8">
              {data.product.map((product) => (
                <div key={product._id}>
                  <Product product={product}/>
                </div>
              ))}
            </div>
        </>
      )  }
    </div>
  )
}

export default Home;