import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../constants"

const baseQuery = fetchBaseQuery({baseUrl : "https://store-5w0m.onrender.com"});

export const apiSlice = createApi({
    baseQuery ,
    tagTypes: ['Product','Order',"User", "Category"],
    endpoints: () => ({})
}) 
