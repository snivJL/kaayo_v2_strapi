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
  appliedCoupon:
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("appliedCoupon"))
      : {},
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
  discount: 0,
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

export const applyCoupon = createAsyncThunk(
  "coupons/applyCoupon",
  async (params, { rejectWithValue, getState }) => {
    try {
      const { values } = params;
      let cart = [...getState().order.cart];
      let updatedCart = [];

      const { data } = await api.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/coupons`
      );

      const coupon = data.filter((c) => c.name === values.coupon)[0];
      if (coupon) {
        //Update each cart item if categories match coupon
        cart.map((i) => {
          let filtered = i.product.categories.filter((value) =>
            coupon.categories.some((el) => el.name === value.name)
          );
          const updatedItem =
            filtered.length > 0
              ? {
                  ...i,
                  product: {
                    ...i.product,
                    discount: (i.product.price * coupon.discount) / 100,
                  },
                }
              : i;
          updatedCart = [...updatedCart, updatedItem];
        });
        const totalPrice = updatedCart.reduce((acc, item) => {
          return acc + (item.product.price - item.product.discount) * item.qty;
        }, 0);
        return { updatedCart, totalPrice, coupon };
      } else {
        return rejectWithValue({ error: "Coupon not found or expired" });
      }
    } catch (error) {
      console.error("reject with value: ", error.message);
      return rejectWithValue(error.message ? error.message : error);
    }
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
      //  reset coupon for now until more specs "if item added to cart"
      if (state.appliedCoupon) state.appliedCoupon = null;
    },
    removeFromCart(state, action) {
      const { payload } = action;
      const exist = state.cart.find((x) => x.product.id === payload.id);
      exist
        ? state.cart.map((x) => (x.product.id === payload.id ? x.qty-- : x))
        : state.error === "Product does not exist";
      localStorage.setItem("cart", JSON.stringify(current(state.cart)));
      //  reset coupon for now until more specs "if item added to cart"
      if (state.appliedCoupon) state.appliedCoupon = null;
    },
    updateCart(state, action) {
      state.cart.splice(0, state.cart.length, ...action.payload);
      state.price = state.cart.reduce((acc, item) => {
        return acc + item.product.price * item.qty;
      }, 0);
      localStorage.setItem("cart", JSON.stringify(current(state.cart)));
      localStorage.setItem("orderPrice", state.price);
      //  reset coupon for now until more specs "if item added to cart"
      if (state.appliedCoupon) state.appliedCoupon = null;
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
      state.price = state.cart.reduce((acc, item) => {
        return acc + item.product.price * item.qty;
      }, 0);
      localStorage.setItem("cart", JSON.stringify(current(state.cart)));
      localStorage.setItem("orderPrice", state.price);
      //  reset coupon for now until more specs "if item added to cart"
      if (state.appliedCoupon) state.appliedCoupon = null;
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
    removeCoupon(state) {
      state.appliedCoupon = null;
      state.cart.map((x) =>
        x.product.discount > 0
          ? { ...x, product: { ...x.product, discount: 0 } }
          : x
      );
      state.price = state.cart.reduce((acc, item) => {
        return acc + item.product.price * item.qty;
      }, 0);
      localStorage.setItem("cart", JSON.stringify(current(state.cart)));
      localStorage.setItem("orderPrice", state.price);
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
    [applyCoupon.pending]: (state, action) => {
      state.status = "loading";
    },
    [applyCoupon.fulfilled]: (state, action) => {
      const { updatedCart, coupon, totalPrice } = action.payload;
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      state.cart = updatedCart;
      state.status = "succeeded";
      state.error = "";
      state.appliedCoupon = coupon;
      state.price = totalPrice;
      localStorage.setItem("orderPrice", totalPrice);
      localStorage.setItem("appliedCoupon", JSON.stringify(coupon));
    },
    [applyCoupon.rejected]: (state, action) => {
      console.log("ERROR", action);
      state.status = "failed";
      state.error = action.payload.error;
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
  removeCoupon,
} = orderSlice.actions;

export const cart = (state) => state.order.cart;

export default orderSlice.reducer;
