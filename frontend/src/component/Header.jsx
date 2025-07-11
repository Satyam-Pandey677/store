import SmallProducts from "../pages/products/SmallProducts"
import { useGetTopProductQuery } from "../redux/Api/productApiSlice"
import Loader from "./Loader"

const Header = () => {
  const {data, isLoading, error} = useGetTopProductQuery()
  console.log(data)
  
  if(isLoading){
    return <Loader/>
  }

  if(error){
    return <h1>Error</h1>
  }

  return (
    <>
      <div className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden sm:hidden">
          <div className="grid grid-cols-2">
            {data?.data.map((product) => (
              <div key={product._id}>
                <SmallProducts product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header