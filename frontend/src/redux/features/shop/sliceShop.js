import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    product: [],
    checked:[],
    radio:[],
    brandCheckboxes:{},
    chechedBrand:[],
}

const shopSlice = createSlice({
    name:"shop",
    initialState,
    reducers : {
        setCategories : (state,action) => {
            state.categories = action.payload
        },
        setProducts : (state,action) => {
            state.product = action.payload
        },
        setChcked: (state,action) => {
            state.checked = action.payload
        },
        setRadio : (state,action) => {
            state.radio = action.payload
        },
        setBrand : (state,action) => {
            state.chechedBrand = action.payload
        }    
    }
})

export const {setCategories, setBrand, setChcked, setProducts, setRadio} = shopSlice.actions

export default shopSlice.reducer;