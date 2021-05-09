import { combineReducers } from "redux";

import count from "./count/countSlice";
import product from "./product/productSlice";
import auth from "./auth/authSlice";
import review from "./review/reviewSlice";
import order from "./order/orderSlice";
import wishlist from "./wishlist/wishlistSlice";

const reducers = combineReducers({
  count,
  product,
  auth,
  review,
  order,
  wishlist,
});

export default reducers;
