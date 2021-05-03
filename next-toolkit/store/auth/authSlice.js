import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { toast } from "react-toastify";
import Cookie from "js-cookie";

const initialState = {
  user: {},
  status: "idle",
  isAuth: !!Cookie.get("jwt"),
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/auth/local/register`, values);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/auth/local`, values);
      return data;
    } catch (error) {
      console.log("reject with value", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      Cookie.remove("jwt");
      state.isAuth = false;
    },
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [register.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [register.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload[0].messages[0].message;
      toast.error(action.payload[0].messages[0].message);
    },
    [login.pending]: (state, action) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      state.status = "succeeded";
      Cookie.set("jwt", action.payload.jwt);
      state.isAuth = true;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload[0].messages[0].message;
      toast.error(action.payload[0].messages[0].message);
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;
