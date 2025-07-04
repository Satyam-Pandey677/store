import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./Api/apiSlice";
import authReducer from "./features/auth/authSlice"

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth : authReducer
    },

    middleware: (getDefualtMiddleware) => 
        getDefualtMiddleware().concat(apiSlice.middleware),
    devTools:true
})

setupListeners(store.dispatch)
export default store