import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import api from "../../api";
import Cookie from "js-cookie";

const initialState = {
  status: "pending",
  cart:
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("cart"))
      : [],
  price:
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("orderPrice"))
      : 0,
  error: "",
};

export const createOrder = createAsyncThunk("orders/create", async (order) => {
  const { data } = await api.post(`${process.env.STRAPI_URL}/orders`, order);
  return data;
});
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { payload } = action;
      const newItem = state.cart.find(
        (x) => x.product.id === payload.product.id
      );

      !newItem
        ? state.cart.push({
            product: payload.product,
            qty: Number(payload.qty),
          })
        : state.cart.map((x) =>
            x.product.id === payload.product.id
              ? (x.qty += Number(payload.qty))
              : x
          );
      localStorage.setItem("cart", JSON.stringify(current(state.cart)));
      state.price = state.cart.reduce((acc, item) => {
        return acc + item.product.price * item.qty;
      }, 0);
      localStorage.setItem("orderPrice", state.price);

      // console.log(JSON.stringify(current(state.cart)));
      // () => Cookie.set("cart", current(state.cart));
    },
    removeFromCart(state, action) {
      const { payload } = action;
      const exist = state.cart.find((x) => x.product.id === payload.id);
      exist
        ? state.cart.map((x) => (x.product.id === payload.id ? x.qty-- : x))
        : state.error === "Product does not exist";
      localStorage.setItem("cart", JSON.stringify(current(state.cart)));
    },
  },
  extraReducers: {
    [createOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [createOrder.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
    },
    [createOrder.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart } = orderSlice.actions;

export const cart = (state) => state.order.cart;

export default orderSlice.reducer;
