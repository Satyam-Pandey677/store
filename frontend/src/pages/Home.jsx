import { Link, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../redux/Api/productApiSlice';
import Loader from '../component/Loader';
import Header from '../component/Header';
import Message from '../component/Message';

const Home = () => {
  const {keyword} = useParams()
  const {data, isLoading, error} = useGetProductQuery({keyword})
  
  
  return (
    <>
      {!keyword ? <Header/> : null }
    </>
  )
}

export default Home;