import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { toast } from "react-toastify";
import Cookie from "js-cookie";

const initialState = {
  user: {},
  status: "idle",
  isAuth: !!Cookie.get("jwt"),
  jwt: Cookie.get("jwt"),
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
      console.log(values, "REDUCER");
      const { data } = await api.post(`/auth/local`, values);
      Cookie.set("jwt", data.jwt);
      return data;
    } catch (error) {
      console.log("reject with value", error.message);
      return rejectWithValue(error.message ? error.message : error);
    }
  }
);

export const setUser = createAsyncThunk(
  "auth/setUser",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await api.get("http://localhost:1337/users/me");

      return data;
    } catch (error) {
      return rejectWithValue(error.message ? error.message : error);
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
    setUser(state, action) {
      state.user = action.payload;
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
      state.jwt = action.payload.jwt;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload[0].messages[0].message;
      toast.error(action.payload[0].messages[0].message);
    },
    [setUser.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [setUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    },
    [setUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload[0];
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;
