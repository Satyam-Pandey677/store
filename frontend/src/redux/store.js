import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./Api/apiSlice";
import authReducer from "./features/auth/authSlice"
import favoritesReducer from "../redux/features/favrates/favoriteSlice"
import { getFavorateFromLocalStorage } from "../utils/localStorage";

const initialState = getFavorateFromLocalStorage() || []

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth : authReducer,
        favorites: favoritesReducer
    },

    preloadedState: {
        favorites : initialState
    },

    middleware: (getDefualtMiddleware) => 
        getDefualtMiddleware().concat(apiSlice.middleware),
    devTools:true
})

setupListeners(store.dispatch)
export default store