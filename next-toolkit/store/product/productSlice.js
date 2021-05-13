import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
  products: [],
  selectedProduct: {},
  status: "idle",
  filterBy: null,
  sortBy: { cat: "createdAt", type: "desc" },
  csr: false,
  totalProducts: null,
  currentPage: 1,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params) => {
    const OFFSET = 8;
    let start = params.start ? params.start : 0;
    let limit = params.limit ? params.limit : OFFSET;

    const page = params.page ? params.page : 1;

    if (params.page) {
      start = (page - 1) * OFFSET;
    }

    const sortBy = params.sort
      ? { cat: params.sort.split(":")[0], type: params.sort.split(":")[1] }
      : { cat: "createdAt", type: "desc" };

    console.log("FETCH PRODUCTS PARAMS", sortBy);
    const url = params.filter
      ? `${process.env.STRAPI_URL}/products?_sort=${sortBy.cat}:${sortBy.type}&categories.name_contains=${params.filter}&_start=${start}&_limit=${limit}`
      : `${process.env.STRAPI_URL}/products?_sort=${sortBy.cat}:${sortBy.type}&_start=${start}&_limit=${limit}`;
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

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (searchTerm) => {
    const url = `${process.env.STRAPI_URL}/products/search?name_contains=${searchTerm}`;
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
    setTotalProducts(state, action) {
      state.totalProducts = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.csr = true;
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      state.currentPage = action.payload.pageNumber;
      state.totalResults = action.payload.totalResults;
      state.totalPages = action.payload.totalPages;
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
    [searchProducts.pending]: (state, action) => {
      state.status = "loading";
    },
    [searchProducts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    },
    [searchProducts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getSelectedProduct,
  setFilter,
  setSort,
  setTotalProducts,
} = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;
