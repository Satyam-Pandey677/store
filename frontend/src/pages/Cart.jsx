import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/carSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
      dispatch(addToCart({...product,qty}))
  } 

  const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
  };

  const checkOutHandler =() =>{
    navigate('/shipping')
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {cartItems?.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Your cart is empty</h2>
            <p className="mt-3 text-slate-600">Add a few favorites and come back here to checkout.</p>
            <Link
              to="/shop"
              className="mt-6 inline-flex rounded-full bg-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Shopping cart</p>
                  <h2 className="mt-1 text-2xl font-semibold text-slate-900">{cartItems.length} items</h2>
                </div>
                <div className="rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-700">
                  Secure checkout
                </div>
              </div>

              <div className="space-y-4">
                {cartItems?.map((item) => (
                  <div
                    key={item?._id}
                    className="flex flex-col gap-4 rounded-[1.25rem] border border-slate-200 p-4 sm:flex-row sm:items-center"
                  >
                    <div className="h-28 w-full overflow-hidden rounded-[1rem] sm:h-24 sm:w-24">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <Link to={`/product/${item._id}`} className="text-lg font-semibold text-slate-900 transition hover:text-pink-600">
                        {item.name}
                      </Link>
                      <p className="mt-1 text-sm text-slate-500">{item.brand}</p>
                      <p className="mt-2 text-lg font-bold text-slate-900">${item.price}</p>
                    </div>

                    <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                      <select
                        value={item.qty}
                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 sm:w-24"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>

                      <button
                        className="flex items-center gap-2 rounded-full border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Order summary</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">Ready to checkout?</h3>

              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Items</span>
                  <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
                  <span>Total</span>
                  <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                </div>
              </div>

              <button
                className="mt-6 w-full rounded-full bg-pink-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
                disabled={cartItems?.length === 0}
                onClick={checkOutHandler}
              >
                Proceed to checkout
              </button>

              <Link
                to="/shop"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
