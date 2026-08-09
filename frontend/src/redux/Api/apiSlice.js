import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../constants"

const baseQuery = fetchBaseQuery({
    baseUrl : BASE_URL,
    credentials:"include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState()?.auth?.token || document.cookie

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }

        return headers
    }
});

export const apiSlice = createApi({
    baseQuery ,
    tagTypes: ['Product','Order',"User", "Category"],
    endpoints: () => ({})
}) 
