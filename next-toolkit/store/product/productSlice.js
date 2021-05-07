import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
  products: [],
  selectedProduct: {},
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await api.get(`${process.env.STRAPI_URL}/products`);
    return data;
  }
);

export const filterByCategories = createAsyncThunk(
  "products/filterByCategories",
  async (cat) => {
    const { data } = await api.get(
      `${process.env.STRAPI_URL}/categories?name_contains=${cat}`
    );
    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getSelectedProduct(state, action) {
      console.log(action);
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [filterByCategories.pending]: (state, action) => {
      state.status = "loading";
    },
    [filterByCategories.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      state.filteredProducts = action.payload[0].products;
    },
    [filterByCategories.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;
