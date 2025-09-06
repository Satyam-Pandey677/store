import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../component/Message";
import ProgessSteps from "../../component/ProgessSteps";
import Loader from "../../component/Loader";
import { useCreateOrderMutation } from "../../redux/Api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/carSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  return (
    <>
      <ProgessSteps step1 step2 step3 />

      <div className="container mx-auto mt-8">
        {cart.cartItems.length == 0 ? (
          <Message>Your Cart Is Empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
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
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="p-2">
                        <Link to={`/product/${item._id}`}>
                            {item.name}
                        </Link>
                    </td>
                    <td className="p-2 ">{item.qty}</td>
                    <td className="p-2 ">{item.price.toFixed(2)}</td>
                    <td className="p-2 ">{item.qty * item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-5" >
                        Order Summery
                    </h2>

                    <div className="flex justify-between p-8  flex-wrap">
                        <ul className="text-lg">
                            <li>
                                <span className="font-semibold mb-4">Items: </span>${cart.itemsPrice}
                            </li>
                            <li>
                                <span className="font-semibold mb-4">Shipping: </span>${cart.shippingPrice}
                            </li>
                            <li>
                                <span className="font-semibold mb-4">Tax: </span>${cart.taxPrice}
                            </li>
                            <li>
                                <span className="font-semibold mb-4">Total: </span>${cart.totalPrice}
                            </li>
                        </ul>


                        {error && <Message variant='danger'>{error.message}</Message>}
                        <div>    
                        <h2 className="h-2 text-2xl font-semibold mb-4">Shipping</h2>
                        <p>
                            <strong>Address</strong> {" "}
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                        </div>
                    </div>
                 </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PlaceOrder;
