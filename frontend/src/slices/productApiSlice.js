import { apiSlice } from "./apiSlice";
import { PRODUCT_URL } from "../constants";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    addProduct: builder.mutation({
      query: () => ({
        url: PRODUCT_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
