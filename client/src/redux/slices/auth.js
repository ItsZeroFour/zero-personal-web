import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchAuth = createAsyncThunk("/auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchRegister = createAsyncThunk(
  "/auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk("/auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

const initialState = {
  data: null,
  status: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    // Login
    [fetchAuth.pending]: (state) => {
      state.status = null;
      state.data = null;
    },

    [fetchAuth.fulfilled]: (state, action) => {
      state.status = action.payload;
      state.data = action.payload;
    },

    [fetchAuth.rejected]: (state, action) => {
      state.status = action.payload;
      state.data = null;
    },

    // Auth me
    [fetchAuthMe.pending]: (state) => {
      state.status = null;
      state.data = null;
    },

    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = action.payload;
      state.data = action.payload;
    },

    [fetchAuthMe.rejected]: (state, action) => {
      state.status = action.payload;
      state.data = null;
    },

    // Register
    [fetchRegister.pending]: (state) => {
      state.status = null;
      state.data = null;
    },

    [fetchRegister.fulfilled]: (state, action) => {
      state.status = action.payload;
      state.data = action.payload;
    },

    [fetchRegister.rejected]: (state, action) => {
      state.status = action.payload;
      state.data = null;
    },
  },
});

export const authReducer = authSlice.reducer;

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const { logout } = authSlice.actions;
