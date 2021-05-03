import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
  reviews: [],
  status: "idle",
  totalResults: 0,
  error: null,
};

export const postReview = createAsyncThunk(
  "reviews/postReview",
  async (values) => {
    const { data } = await api.post("/reviews", values);
    return data;
  }
);

export const getProductReviews = createAsyncThunk(
  "reviews/getProductReviews",
  async (...params) => {
    console.log(params);
    const { data } = await api.get(
      `/reviews/product/${params[0].productId}?_start=${params[0].start}&_limit=${params[0].limit}`
    );
    return data;
  }
);
export const reviewSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [postReview.pending]: (state, action) => {
      state.status = "loading";
    },
    [postReview.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
    },
    [postReview.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [getProductReviews.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProductReviews.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      state.reviews = [...state.reviews, ...action.payload.reviews];
      state.totalResults = action.payload.total;
    },
    [getProductReviews.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [postReview.pending]: (state, action) => {
      state.status = "loading";
    },
    [postReview.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      state.reviews = [...state.reviews, action.payload];
    },
    [postReview.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { getProducts } = reviewSlice.actions;

export default reviewSlice.reducer;
