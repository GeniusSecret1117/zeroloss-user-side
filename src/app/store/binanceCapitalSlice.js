import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BinService from "../auth/services/binanceService/binService";

export const getBinCap = createAsyncThunk(
  "binance/getBinCap",
  async (_, { dispatch, getState }) => {
    const binCap = await BinService.getBinCap();
    return binCap;
  }
);

export const setBinCap = createAsyncThunk(
  "binance/setBinCap",
  async (binCap, { dispatch, getState }) => {
    return binCap;
  }
);

export const updateFundingHistory = createAsyncThunk(
  "binance/setFundingHistory",
  async (fundingHistory, { dispatch, getState }) => {
    return fundingHistory;
  }
);

export const updateTransactionHistory = createAsyncThunk(
  "binance/setFundingHistory",
  async (transactionHistory, { dispatch, getState }) => {
    return transactionHistory;
  }
);

const initialState = {
  balance: {
    walletBalance: 0,
    unrealizedPNL: 0,
    marginBalance: 0,
    loading: true,
  },
  income: [],
  incomeByRange: [],
  position: [],
  allOpenOrders: [],
  allOrders: [],
  fundingFee: [],
  transactionHistory: [],
  tradeHistory: [],
};

export const binanceCapSlice = createSlice({
  name: "binCap",
  initialState,
  reducers: {},
  extraReducers: {
    [getBinCap.fulfilled]: (state, action) => {
      state.balance.walletBalance = action.payload.balance.walletBalance;
      state.balance.unrealizedPNL = action.payload.balance.unrealizedPNL;
      state.balance.marginBalance = action.payload.balance.marginBalance;

      state.income = action.payload.income;

      state.incomeByRange = action.payload.incomeByRange;

      state.position = action.payload.position;

      state.openOrders = action.payload.openOrders;

      state.allOrders = action.payload.allOrders;

      state.fundingFee = action.payload.fundingFee;

      state.transactionHistory = action.payload.transactionHistory;

      state.tradeHistory = action.payload.tradeHistory;

      state.loading = false;
    },
    [setBinCap.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateFundingHistory.fulfilled]: (state, action) => {
      state.fundingFee = action.payload.fundingFee;
      state.loading = false;
    },
    [updateTransactionHistory.fulfilled]: (state, action) => {
      state.transactionHistory = action.payload.transactionHistory;
      state.loading = false;
    },
  },
});

export const {} = binanceCapSlice.actions;

export default binanceCapSlice.reducer;
