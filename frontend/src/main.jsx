import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Home from "./pages/Home.jsx";

import PrivateRoute from "./component/PrivateRoute.jsx";
import Profile from "./pages/user/Profile.jsx";
import MyAdminRoute from "./pages/admin/MyAdminRoute.jsx";
import UserList from "./pages/admin/UserList.jsx";
import CategoryList from "./pages/admin/CategoryList.jsx";
import ProductList from "./pages/admin/ProductList.jsx";
import UpdateProduct from "./pages/admin/UpdateProduct.jsx";
import AllProducts from "./pages/admin/AllProducts.jsx";
import Favorites from "./pages/products/Favorites.jsx";
import ProductDetails from "./pages/products/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";
import Shipping from "./pages/order/Shipping.jsx";
import PlaceOrder from "./pages/order/PlaceOrder.jsx";

import {PayPalScriptProvider} from  "@paypal/react-paypal-js"
import Order from "./pages/order/Order.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} element = {<Home/>}/>
      <Route path="/favorite" element = {<Favorites/>}/>
      <Route path="/product/:id" element= {<ProductDetails/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/shop" element={<Shop/>}/>

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
    
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<MyAdminRoute />}>
        <Route path="userlist" element={<UserList/>} />
        <Route path="categorylist" element={<CategoryList/>}/>
        <Route path="productlist" element={<ProductList/>}/>
        <Route path="allproductlist" element={<AllProducts/>}/>
        <Route path="product/update/:id" element={<UpdateProduct/>}/>
        
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
