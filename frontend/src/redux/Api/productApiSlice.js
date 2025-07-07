import { UPLOAD_URL, PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProduct:builder.query({
           query : ({keyword})=> ({
            url: `${PRODUCT_URL}`,
            params: {keyword}
            }),
            keepUnusedDataFor:5,
            providesTags:["Product"]
        }),

        getProductById : builder.query({
            query: (productId) => `${PRODUCT_URL}/${productId}`,
            providesTags:(result,error,productId) => [
                {type:"Product", id:productId}
            ]
        }),

        allProducts : builder.query({
            query:()=> `${PRODUCT_URL}/allproducts`
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`
            }),
            keepUnusedDataFor:5
        }),

        createProduct : builder.mutation({
            query: (productData) => ({
                url : `${PRODUCT_URL}`,
                method:"POST",
                body:productData
            }),
            invalidatesTags:["Product"]
        }),

        upateProduct: builder.mutation({
            query:(productId, formData)=>({
                url:`${PRODUCT_URL}/${productId}`,
                method:"PUT",
                "body":formData
            })
        }),

        uploadProductImage : builder.mutation({
            query: (data) => ({
                url:`${UPLOAD_URL}`,
                method:"POST",
                body:data
            })
        }),

        deleteProduct: builder.mutation({
            query:(productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method:"DELETE"
            }),
            providesTags:["Product"]
        }),

        reviewProduct: builder.mutation({
            query:(reviewData ) => ({
                url:`${PRODUCT_URL}/${reviewData.productId}/review`,
                method:"POST",
                body:reviewData
            })
        }),

        getTopProduct: builder.query({
            query: () => `${PRODUCT_URL}/top`,
            keepUnusedDataFor:5
        }),

        getNewProduct: builder.query({
            query: () => `${PRODUCT_URL}/new`,
            keepUnusedDataFor:5
        })
    }),
})

export const {
    useAllProductsQuery,
    useGetProductQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetNewProductQuery,
    useGetProductByIdQuery,
    useGetProductDetailsQuery,
    useGetTopProductQuery,
    useReviewProductMutation,
    useUpateProductMutation,
    useUploadProductImageMutation
} = productApiSlice