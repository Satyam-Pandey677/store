import {useState} from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { useGetTopProductQuery } from '../../redux/Api/productApiSlice'
import SmallProducts from './SmallProducts'
import Loader from '../../component/Loader'


const ProductTabs = ({loadingProductReview, userInfo, submitHandler, rating, setRating, comment, setComment, product}) => {

    const {data, isLoading} = useGetTopProductQuery()

    const [activeTab, setActiveTab] = useState(1);

    if(isLoading){
        return <Loader/>
    }

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber)
    }

  return (
    <div className='flex flex-col md:flex-row'>
        <section className='mr-[5rem] '>
            <div className={`flex p-4 cursor-pointer text-lg ${activeTab == 1? 'font-bold' : ""}`} onClick={() => handleTabClick(1)}>
                Write your review
            </div>
            <div className={`flex p-4 cursor-pointer text-lg ${activeTab == 2? 'font-bold' : ""}`} onClick={() => handleTabClick(2)}>
                All Review
            </div>
            <div className={`flex p-4 cursor-pointer text-lg ${activeTab == 3? 'font-bold' : ""}`} onClick={() => handleTabClick(3)}>
                Related Products
            </div>
        </section >

        <section>
            {activeTab == 1 && (
                <div className='mt-4'>
                    {userInfo ? (
                        <form onSubmit={submitHandler}>
                            <div className='my-2'>
                                <label htmlFor="ratings" className='block text-xl mb-2'>
                                    Rating
                                </label>
                                <select id="rating" required
                                   value={rating} 
                                   onChange={e => setRating(e.target.value)}
                                   className='p-2 border rounded-lg xl:w-[40rem] text-block'
                                >
                                    <option value="">Select</option>
                                    <option value="1">Inferior</option>
                                    <option value="2">Decent</option>
                                    <option value="3">Great</option>
                                    <option value="4">Excellent</option>
                                    <option value="5">Execptional</option>
                                </select>
                            </div>

                            <div className='my-2'>
                                <label htmlFor="comment" className='block textxl mb-2'>
                                    <textarea id='comment' required value={comment} placeholder='Enter your review in this product' onChange={e => setComment(e.target.value)} className='p-2 border rounded-lg xl:w-[40rem] text-block'></textarea>
                                </label>
                            </div>
                            <button type='submit' disabled={loadingProductReview} className='bg-pink-600 text-white py-2 px-4 rounded-lg'>Submit</button>
                        </form> 
                    ): (
                        <p>Please <Link to='/login'>sign in</Link> to write a review</p>
                    )}
                </div>
            )}
        </section>

        <section>
            {activeTab == 2 && (
                <>
                <div>{product.review.length == 0 && <p>No Reviews</p>}</div>

                <div>
                    {product.review.map((review) => (
                        <div key={review._id} className='border rounded-full p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5'>
                            <div className="flex justify-between">
                                <strong className='text-[#B0b0b0b0]'>{review.name}</strong>
                                <p className='text-[#B0b0b0b0]'>{review.createdAt.substring(0,10)}</p>
                            </div>

                            <p className='my-4'>{review.comment}</p>
                            <Rating value={review.rating}/>
                        </div>
                    ))}
                </div>
                </>
            )}
        </section> 

        <section>
            {activeTab == 3 && (
                <section className='ml-[4rem] flex flex-wrap'>
                    {!data ? (
                        <Loader/>
                    ): (
                        data?.data.map((product) => (
                            <div key={product._id}>
                                <SmallProducts product={product}/>
                            </div>
                        ))
                    )}
                </section>
            )}
        </section>


    </div> 
  )
}

export default ProductTabs