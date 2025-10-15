import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../component/Message";
import Loader from "../../component/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/Api/orderApiSlice";
import Product from "../products/Product";

const Order = () => {
  const { id: orderId } = useParams();

  

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const userInfo = useSelector((state) => state.auth);
  console.log(userInfo)

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal) {
      const loadingPayPalScript = async () => {
        paypalDispatch({
          type: "resetOption",
          value: {
            clientId: paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.order.totalPrice } }],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onError = (error) => {
    toast.error(error.message);
  };

  const deliverHandler = async() => {
    await deliverOrder(orderId)
    refetch()
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <div className="container flex flex-col ml-[10rem] md:flex-row]">
      <div className="md:w-2/3 pr-4">
        <div className="border gray-300 mt-5 pb-4 mb-5">
          {order?.orderItems?.length === 0 ? (
            <Message>Order Is Empty</Message>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Quality</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.order.orderItems?.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item?.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>

                      <td className="p-2">
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </td>
                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">{item.price}</td>
                      <td className="p-2 text-center">
                        $ {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Shopping</h2>
          <p className="mb-4 mt-4">
            <strong className="text-pink-500">Order:</strong> {order.order._id}
          </p>
          <p className="mb-4 mt-4">
            <strong className="text-pink-500">Name:</strong>{" "}
            {order.order.user.username}
          </p>
          <p className="mb-4 mt-4">
            <strong className="text-pink-500">Email:</strong>{" "}
            {order.order.user.email}
          </p>
          <p className="mb-4 mt-4">
            <strong className="text-pink-500">Address:</strong>{" "}
            {order.order.shippingAddress.address},{" "}
            {order.order.shippingAddress.city}{" "}
            {order.order.shippingAddress.postalCode}{" "}
            {order.order.shippingAddress.country}
          </p>
          <p className="mb-4 mt-4">
            <strong className="text-pink-500">Email:</strong>{" "}
            {order.order.paymentMethod}
          </p>
          {order.order.isPaid ? (
            <Message variant="success" className="text-pink-500">
              Paid on {order.order.paidAt}
            </Message>
          ) : (
            <Message variant="danger" className="text-pink-500">
              Not paid
            </Message>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>$ {order.order.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping Price: </span>
          <span>$ {order.order.shippingPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Taxes</span>
          <span>$ {order.order.taxPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total Price</span>
          <span>$ {order.order.totalPrice}</span>
        </div>

        {!order.order.isPaid && (
          <div>
            {loadingPay && <Loader />}
            {isPending ? (
              <Loader />
            ) : (
              <div>
              {userInfo.userInfo.data.isAdmin? 
             ( <h1 className="text-3xl text-pink-500">Not Paid</h1>)
               :
             ( <div>
                <div>
                  <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                  ></PayPalButtons>
                </div>
              </div>)
              }
              </div>
            )}
          </div>
        )}

        {loadingDeliver && <Loader/>}
        {userInfo.userInfo && userInfo.userInfo.data.isAdmin && order.order.isPaid && !order.order.isDelivered && (
          <div >
              <button type="buuton" className="bg-pink-500 text-white  w-full py-2" onClick={deliverHandler}>
                Mark As Delivered
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
