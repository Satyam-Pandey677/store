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

  const addToCartHandler = (product, qty) => {
      dispatch(addToCart({...product,qty}))
  } 

  const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
  };

  const checkOutHandler =() =>{
    navigate('login?redirect=/shipping')
  }

  return (
    <>
      <div className="container flex justify-around item-start flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/shop" className="text-pink-500">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <div className="h1 text-2xl font-semibold mb-4">
                Shopping Carts
              </div>


              {cartItems.map((item) => (
                <div
                  key={item?._id}
                  className="flex item-enter mb-[1rem] pb-2"
                >
                  <div className="w-[10rem] h-[10rem]">
                    <img 
                      src={item?.image} 
                      alt={item?.name} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item._id}`} className="text-pink-500 text-[20px] font-bold">
                      {item.name}
                    </Link>
                    <div className="mt-2">{item.brand}</div>
                    <div className="mt-2 font-extrabold">$ {item.price}</div>
                  </div>
                  <div className="w-24">
                      <select  id="" className="w-full p-1 border rounded text-black" value={item.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={x+1} key={x+1 } className="text-black">{x+1}</option>
                        ))}
                      </select>
                  </div>

                  <div>
                    <button className="text-red-500 mr-[5rem]" onClick={() => removeFromCartHandler(item._id)}>
                      <FaTrash className="ml-[1rem] mt-[.3rem] text-2xl"/>
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-8 w-[40 rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items {cartItems.reduce((acc, item) => acc + item.qty, 0)} 
                  </h2>
                  <div className="text-2xl font-bold">
                    $ {cartItems.reduce((acc,item) => acc + item.qty * item.price,0).toFixed(2)}
                  </div>

                  <button 
                  className="bg-pink-400 mt-4 py-2 px-4 rounded-full text-lg w-full"
                  disabled={cartItems.length == 0} 
                  onClick={checkOutHandler}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
