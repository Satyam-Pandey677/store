import Message from "../../component/Message"
import { Link } from "react-router-dom"
import { useGetMyOrderQuery } from "../../redux/Api/orderApiSlice"
import Loader from "../../component/Loader";

const UserOrder = () => {

    const {data:orders, isLoading, error} = useGetMyOrderQuery();

    console.log(orders)

  return (
    <div className=" container mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Order</h2>

        {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error?.data?.error || error.error}</Message>):(
          <table className="w-full">
            <thead>
              <tr>
                <td className="py-2">IMAGE</td>
                <td className="py-2">ID</td>
                <td className="py-2">DATE</td>
                <td className="py-2">TOTAl</td>
                <td className="py-2">PAID</td>
                <td className="py-2">DELIVERED</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <img src={order.orderItems[0].image} alt={order.user} className="w-[6rem]" />

                  <td className="py-2 ">{order._id}</td>
                  <td className="py-2 ">{order.createdAt.substring(0,10)}</td>
                  <td className="py-2 ">$ {order.totalPrice}</td>
                  <td className="py-2 ">{order.isPaid ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">Completed</p>
                  ): (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">Pending</p>

                  )}</td>

                  <td className="px-2 py-2">
                    {order.isDelivered ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">Completed</p>
                    ):(
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">Pending</p>
                    )}
                  </td>
                  <td className="py-2 px-2">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-pink-500 text-back py-2 px-3 rounded">view Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  )
}

export default UserOrder