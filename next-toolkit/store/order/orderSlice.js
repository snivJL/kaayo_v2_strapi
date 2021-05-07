import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import api from "../../api";
import Cookie from "js-cookie";

const initialState = {
  status: "pending",
  cart:
    typeof window !== "undefined"
      ? window.localStorage.getItem("cart")
        ? JSON.parse(window.localStorage.getItem("cart"))
        : []
      : [],
  price:
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("orderPrice"))
      : 0,
  error: "",
  phone: "",
  fullname: "",
  address: "",
  city: "",
  ward: "",
  district: "",
  paymentMethod: "",
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
    updateCart(state, action) {
      state.cart.splice(0, state.cart.length, ...action.payload);
      state.price = state.cart.reduce((acc, item) => {
        return acc + item.product.price * item.qty;
      }, 0);
      localStorage.setItem("cart", JSON.stringify(current(state.cart)));
      localStorage.setItem("orderPrice", state.price);
    },
    clearCart(state, action) {
      if (action.payload) {
        const newArray = current(state.cart).filter((i) => {
          console.log("in filter", action.payload, i.product.id);
          return i.product.id !== action.payload;
        });
        console.log(
          "FILTERED ARRAY",
          newArray,
          action.payload,
          current(state.cart)
        );
        state.cart.splice(0, state.cart.length, ...newArray);
      } else {
        state.cart.splice(0, state.cart.length, []);
      }

      localStorage.setItem("cart", JSON.stringify(current(state.cart)));
      localStorage.setItem("orderPrice", state.price);
    },
    addEmail(state, action) {
      state.email = action.payload.email;
    },
    addShipping(state, action) {
      const { payload } = action;
      state.phone = payload.phone;
      state.fullname = payload.fullname;
      state.address = payload.address;
      state.city = payload.city;
      state.ward = payload.ward;
      state.district = payload.district;
    },
    addPaymentMethod(state, action) {
      const { payload } = action;
      state.paymentMethod = payload;
    },
  },
  extraReducers: {
    [createOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [createOrder.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.orderId = action.payload.id;
      localStorage.removeItem("cart");
    },
    [createOrder.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  updateCart,
  clearCart,
  addEmail,
  removeFromCart,
  addShipping,
  addPaymentMethod,
} = orderSlice.actions;

export const cart = (state) => state.order.cart;

export default orderSlice.reducer;
