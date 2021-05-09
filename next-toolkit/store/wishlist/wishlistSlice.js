import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  wishlist:
    typeof window !== "undefined"
      ? window.localStorage.getItem("wishlist")
        ? JSON.parse(window.localStorage.getItem("wishlist"))
        : []
      : [],
  error: "",
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action) {
      state.wishlist.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    removeFromWishlist(state, action) {
      const exist = current(state.wishlist).find(
        (product) => product.id === action.payload.id
      );
      console.log("EXIST", exist);
      const filteredArray = current(state.wishlist).filter(
        (product) => product.id !== action.payload.id
      );
      console.log("FILTERED", filteredArray);
      exist
        ? state.wishlist.splice(0, state.wishlist.length, ...filteredArray)
        : state.error === "Product does not exist";
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
