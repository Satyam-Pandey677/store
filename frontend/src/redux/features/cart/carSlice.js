import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../utils/cart";

const initialState = localStorage.getItem("cart") ? json.parse(localStorage.getItem("cart")) : {cartItems: [], shippingAddress: {}, PaymentMethod: "PayPal"};

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        addToCart : (state, action )=> {
            const {user, rating, numReviews, reviews, ...item} = action.payload
            const existItem = state.cartItems.find((x) => x.id === item.id)

            if(existItem){
                state.cartItems = state.cartItems.map((x)= > x.id === existItem._id ? item : x);
            }else{
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state, item)
        },
        removeFromCart : (state, action )=> {
        state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
        return updateCart(state)
    },

    saveShippingAdrress : (state, action )=> {
        state.shippingAddress = action.payload
        localStorage.setItem('cart', JSON.stringify(state))
    },

    savePaymentMethod : (state, action )=> {
        state.paymentMethod = action.payload
        localStorage.setItem('cart', JSON.stringify(state))
    }, 

    clearCartItems : (state, action )=> {
        state.cartItems = []
        localStorage.setItem('cart', JSON.stringify(state))
    },
    
    resetCart : (state) => (state = initialState)
    },
})

export const {addToCart, removeFromCart, savePaymentMethod, saveShippingAdrress, clearCartItems, resetCart} = cartSlice.actions