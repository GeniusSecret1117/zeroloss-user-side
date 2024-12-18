import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import JwtService from "../auth/services/jwtService";

export const getBinCred = createAsyncThunk(
  "binance/getBinCred",
  async (_, { dispatch, getState }) => {
    const binCred = await JwtService.getBinCredData();
    return binCred;
  }
);

export const setBinCred = createAsyncThunk(
  "binance/setBinCred",
  async (binCred, { dispatch, getState }) => {
    return binCred;
  }
);

const initialState = {
  apiKey: "",
  secretKey: "",
  ipAddresses: ["0.0.0.0", "0.0.0.0"],
  loading: true,
};

export const binCredSlice = createSlice({
  name: "binCred",
  initialState,
  reducers: {
    updateApiKey: (state, action) => {
      state.apiKey = action.payload;
    },
    updateSecretKey: (state, action) => {
      state.secretKey = action.payload;
    },
    updateIpAdd: (state, action) => {
      state.ipAddresses = action.payload;
    },
  },
  extraReducers: {
    [getBinCred.fulfilled]: (state, action) => {
      state.apiKey = action.payload.api_key;
      state.secretKey = action.payload.secret_key;
      state.ipAddresses = action.payload.ip_addresses;
      state.loading = false;
    },
    [setBinCred.fulfilled]: (state, action) => {
      state.apiKey = action.payload.api_key;
      state.secretKey = action.payload.secret_key;
      state.ipAddresses = action.payload.ip_addresses;
      state.loading = false;
    },
  },
});

export const { updateApiKey, updateSecretKey, updateIpAdd } =
  binCredSlice.actions;
export default binCredSlice.reducer;
