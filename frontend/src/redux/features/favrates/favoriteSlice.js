import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name:'favorite',
    initialState:[],
    reducers:{
        addToFavorites:(state, action) => {
            if(!state.some((product) => product._id ===action.payload._id)){
                state.push(action.payload)
            }
        },
        removeFromFavrites : (state, action) => {
            return state.filter((product) => product._id != action.payload._id )
        },

        setFavorites:(state, action)=>{
            return action.payload;
        }
    }
}) 

export const {addToFavorites,removeFromFavrites,setFavorites } = favoriteSlice.actions
export const selectFavoriteProduct = (state ) => state.favorites
export default favoriteSlice.reducer;