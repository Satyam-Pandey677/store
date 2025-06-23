import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    updateCategory: builder.mutation({
      query: ({categoryId, updateCategory}) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: updateCategory,
      }),
    }),

    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
    }),

    fetchAllCategories: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}/categories`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchAllCategoriesQuery,
} = categoryApiSlice;
