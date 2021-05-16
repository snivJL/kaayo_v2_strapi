import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

let initialState = {
  coupons: [],
  status: "idle",
};

export const isCouponValid = createAsyncThunk(
  "coupons/isCouponValid",
  async (params, { rejectWithValue, getState }) => {
    try {
      const { values } = params;
      const cart = getState().order.cart;
      console.log("IN COUPON REDUCER", values, cart);
      console.log("order state", getState().order);
      const { data } = await api.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/coupons`
      );

      const exist = data.filter((c) => c.name === values.coupon);
      console.log(exist, "Coupon FOUND");

      console.log(data, "ALL COUPONS");

      // const url = `${process.env.STRAPI_URL}/coupons/${couponId}`;
      // const { data } = await api.get(url);
      return data;
    } catch (error) {
      console.error("reject with value", error.message);
      return rejectWithValue(error.message ? error.message : error);
    }
  }
);
const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: {
    [isCouponValid.pending]: (state, action) => {
      state.status = "loading";
    },
    [isCouponValid.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      state.coupons = action.payload;
    },
    [isCouponValid.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const {} = couponSlice.actions;

export default couponSlice.reducer;
