import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
  products: [],
  selectedProduct: {},
  status: "idle",
  filterBy: "",
  sortBy: { cat: "createdAt", type: "desc" },
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, { getState }) => {
    const { filterBy, sortBy } = getState().product;
    console.log("HERE", getState().product);

    const { data } = await api.get(
      `${process.env.STRAPI_URL}/products?_sort=${sortBy.cat}:${sortBy.type}&categories.name_contains=${filterBy}`
    );
    return data;
  }
);

export const filterByCategories = createAsyncThunk(
  "products/filterByCategories",
  async (cat) => {
    const url = cat
      ? `${process.env.STRAPI_URL}/products?categories.name_contains=${cat}`
      : `${process.env.STRAPI_URL}/products`;
    const { data } = await api.get(url);
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
    setFilter(state, action) {
      state.filterBy = action.payload;
    },
    setSort(state, action) {
      state.sortBy = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.filter = action.payload;
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
      state.filteredProducts = action.payload;
    },
    [filterByCategories.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getSelectedProduct, setFilter, setSort } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;
