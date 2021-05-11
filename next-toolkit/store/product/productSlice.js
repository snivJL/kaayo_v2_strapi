import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
  products: [],
  selectedProduct: {},
  status: "idle",
  filterBy: null,
  sortBy: { cat: "createdAt", type: "desc" },
  csr: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ start = 0, limit = 10 }, { getState }) => {
    const { filterBy, sortBy } = getState().product;
    console.log("HERE", start, limit);
    // const start = params.start ? params.start : 1;
    // const limit = params.limit ? params.limit : 8;
    const url = `${process.env.STRAPI_URL}/products?_sort=${sortBy.cat}:${sortBy.type}&categories.name_contains=${filterBy}&_start=${start}&_limit=${limit}`;
    console.log("URL", url);
    const { data } = await api.get(url);
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

export const countProducts = createAsyncThunk(
  "products/countProducts",
  async (undefined, { getState }) => {
    const { filterBy } = getState().product;
    const url = `${process.env.STRAPI_URL}/products/count?categories.name_contains=${filterBy}`;
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
      state.csr = true;
    },
    setSort(state, action) {
      state.sortBy = action.payload;
      state.csr = true;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.csr = true;
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
    [countProducts.pending]: (state, action) => {
      // state.status = "loading";
    },
    [countProducts.fulfilled]: (state, action) => {
      // state.status = "succeeded";
      state.totalProducts = action.payload;
    },
    [countProducts.rejected]: (state, action) => {
      // state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getSelectedProduct, setFilter, setSort } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;
