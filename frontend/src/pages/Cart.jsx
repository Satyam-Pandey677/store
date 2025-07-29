import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/carSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  
  console.log(cartItems)

  return (
    <>
      <div className="container flex justify-around item-start flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <div className="h1 text-2xl font-semibold mb-4">
                Shopping Carts
              </div>


              {cartItems.map((item) => (
                <div
                  key={item?.data._id}
                  className="flex item-enter mb-[1rem] pb-2"
                >
                  <div className="w-[5rem] h-[5rem]">
                    <img 
                      src={item?.image} 
                      alt={item?.name} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
