import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
  orderStatus: "pending",
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
  email: "",
  phone: "",
  fullname: "",
  address: "",
  city: "",
  ward: "",
  district: "",
  paymentMethod: "",
  orderDetail: { cart: [] },
};

export const createOrder = createAsyncThunk(
  "orders/create",
  async (order, { getState }) => {
    const email = getState().auth.user.email
      ? getState().auth.user.email
      : getState().order.email;
    const { data } = await api.post(`${process.env.STRAPI_URL}/orders`, {
      ...order,
      status: getState().order.orderStatus,
      email,
    });
    return data;
  }
);

export const getSingleOrder = createAsyncThunk(
  "orders/getSingleOrder",
  async (orderId) => {
    const { data } = await api.get(
      `${process.env.STRAPI_URL}/orders/${orderId}`
    );
    return data;
  }
);

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

        state.cart.splice(0, state.cart.length, ...newArray);
      } else {
        state.cart.splice(0, state.cart.length);
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
      state.cart.splice(0, state.cart.length);
      localStorage.removeItem("cart");
      localStorage.removeItem("orderPrice");
      state.status = "succeeded";
      state.orderId = action.payload.id;
    },
    [createOrder.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [getSingleOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [getSingleOrder.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.orderDetail = action.payload;
    },
    [getSingleOrder.rejected]: (state, action) => {
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
  clearItemFromCart,
} = orderSlice.actions;

export const cart = (state) => state.order.cart;

export default orderSlice.reducer;
