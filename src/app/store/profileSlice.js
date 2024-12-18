import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import JwtService from "../auth/services/jwtService";

export const setProfile = createAsyncThunk(
  "profile/setProfile",
  async (profile, { dispatch, getState }) => {
    const updatedProfile = { ...profile };
    return updatedProfile;
  }
);

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { dispatch, getState }) => {
    const profile = await JwtService.getProfileData();
    return profile;
  }
);

const initialState = {
  binanceId: "",
  fullName: "",
  whatsapp: "",
  telegram: "",
  facebook: "",
  instagram: "",
  twitter: "",
  linkedin: "",
  loading: true,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateBinanceId: (state, action) => {
      state.binanceId = action.payload;
    },
    updateFullName: (state, action) => {
      state.fullName = action.payload;
    },
    updateWhatsapp: (state, action) => {
      state.whatsapp = action.payload;
    },
    updateTelegram: (state, action) => {
      state.telegram = action.payload;
    },
    updateFacebook: (state, action) => {
      state.facebook = action.payload;
    },
    updateInstagram: (state, action) => {
      state.instagram = action.payload;
    },
    updateTwitter: (state, action) => {
      state.twitter = action.payload;
    },
    updateLinkedin: (state, action) => {
      state.linkedin = action.payload;
    },
  },
  extraReducers: {
    [setProfile.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [getProfile.fulfilled]: (state, action) => {
      (state.binanceId = action.payload.binanceId),
        (state.fullName = action.payload.fullName),
        (state.whatsapp = action.payload.whatsapp),
        (state.telegram = action.payload.telegram),
        (state.facebook = action.payload.facebook),
        (state.instagram = action.payload.instagram),
        (state.twitter = action.payload.twitter),
        (state.linkedin = action.payload.linkedin);
      state.loading = false;
    },
  },
});

export const {
  updateBinanceId,
  updateFullName,
  updateLinkedin,
  updateWhatsapp,
  updateTelegram,
  updateFacebook,
  updateInstagram,
  updateTwitter,
} = profileSlice.actions;
export default profileSlice.reducer;
