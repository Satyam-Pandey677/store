import { Link, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../redux/Api/productApiSlice';
import Loader from '../component/Loader';
import Header from '../component/Header';
import Message from '../component/Message';

const Home = () => {
  const {keyword} = useParams()
  const {data, isLoading, isError} = useGetProductQuery({keyword})
  
  
  return (
    <>
      {!keyword ? <Header/> : null }
      {isLoading ? (<isLoading/>): isError ? (<Message variant='danger'>{isError.error}</Message>):(
        <>
          <div className="flex justify-between items-center">
            <h1 className='ml-[20rem] mt-[10rem] text-[3rem]'>
              Speacial Products
            </h1>

            <Link to="/shop" className='bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]'>
                Shop
            </Link>
          </div>
        </>
      )  }
    </>
  )
}

export default Home;