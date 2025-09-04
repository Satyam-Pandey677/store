import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import Message from "../../component/Message"
import ProgessSteps from "../../component/ProgessSteps"
import Loader from "../../component/Loader"
import { useCreateOrderMutation } from "../../redux/Api/orderApiSlice"
import { clearCartItems } from "../../redux/features/cart/carSlice"



const PlaceOrder = () => {
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)

    const [createOrder, {isLoading, error}] = useCreateOrderMutation()

    useEffect(() => {
        if(!cart.shippingAddress.address){
            navigate("/shipping");
        }
    },[cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const dispatch = useDispatch()


  return (
    <>
    <ProgessSteps step1 step2 step3 />

    <div className="container mx-auto mt-8">
        {cart.cartItems.length == 0 ? (
            <Message>Your Cart Is Empty</Message>
        ):(
            <div className="overflow-x-auto">
                <table className="w-4 border-collapse">
                    <thead>
                        <tr>
                            <td className="px-1 py-2 text-left align-top">Image</td>
                            <td className="px-1 py-2 text-left ">Product</td>
                            <td className="px-1 py-2 text-left ">Quantity</td>
                            <td className="px-1 py-2 text-left ">Price</td>
                            <td className="px-1 py-2 text-left ">Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.cartItems.map((item, index) => {
                            <tr>
                                <td className="p-2">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )}
    </div>
    </>
  )
}

export default PlaceOrder