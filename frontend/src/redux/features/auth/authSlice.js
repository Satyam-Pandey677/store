import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")):null,
    token: localStorage.getItem('token') || null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredientials : (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo",JSON.stringify(action.payload))

            if (action.payload?.token) {
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token)
            }

            const expirationTime = new Date().getTime() +30*24 * 60*60*1000;
            localStorage.setItem('expirationTime',expirationTime)
        },

        logout : (state) => {
            state.userInfo = null,
            state.token = null,
            localStorage.removeItem("userInfo")
            localStorage.removeItem("token")
            localStorage.removeItem("expirationTime")
        }
    }
})

export const {setCredientials, logout} = authSlice.actions

export default authSlice.reducer