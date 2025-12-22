import ProductCrousel from "../pages/products/ProductCrousel"
import SmallProducts from "../pages/products/SmallProducts"
import { useGetTopProductQuery } from "../redux/Api/productApiSlice"
import Loader from "./Loader"

const Header = () => {
  const {data, isLoading, error} = useGetTopProductQuery()
  
  if(isLoading){
    return <Loader/>
  }

  if(error){
    return <h1>Error</h1>
  }

  return (
    <div >
    <ProductCrousel className="mx-auto"/> 


     <div className="my-25 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">STRANGER THINGS COLLECTION</h1>
        <p className="text-2xl">LIMITED EDITION</p>
    </div>

    
      <div className="flex justify-around  pr-10">
        <div className="xl:block lg:hidden md:hidden sm:hidden">

          <div className="grid grid-cols-4 gap-5">
            {data?.data.map((product) => (
              <div key={product._id}>
                <SmallProducts product={product} />
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Header