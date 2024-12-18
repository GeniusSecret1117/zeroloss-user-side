/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import { setInitialSettings } from "app/store/fuse/settingsSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import settingsConfig from "app/configs/settingsConfig";
import jwtService from "../auth/services/jwtService";
import { setProfile } from "./profileSlice";

export const setUser = createAsyncThunk(
  "user/setUser",
  async (user, { dispatch, getState }) => {
    /*
    You can redirect the logged-in user to a specific route depending on his role
    */
    if (user.loginRedirectUrl) {
      console.log("login redirect url true", user.loginRedirectUrl);
      settingsConfig.loginRedirectUrl = user.loginRedirectUrl; // for example 'apps/academy'
    } else {
      settingsConfig.loginRedirectUrl = "profile"; // for example 'apps/academy'
    }
    return user;
  }
);

export const updateUserSettings = createAsyncThunk(
  "user/updateSettings",
  async (settings, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = _.merge({}, user, { data: { settings } });

    dispatch(updateUserData(newUser));

    return newUser;
  }
);

export const updateUserShortcuts = createAsyncThunk(
  "user/updateShortucts",
  async (shortcuts, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = {
      ...user,
      data: {
        ...user.data,
        shortcuts,
      },
    };
    console.log("updateusershortcuts");
    dispatch(updateUserData(newUser));

    return newUser;
  }
);

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState();

  if (!user.role || user.role.length === 0) {
    // is guest
    return null;
  }

  history.push({
    pathname: "/",
  });

  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }

  jwtService
    .updateUserData(user)
    .then(() => {
      dispatch(showMessage({ message: "User data saved with api" }));
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.message }));
    });
};

export const getProfileData = () => async (dispatch, getState) => {
  dispatch();
};

const initialState = {
  userId: 0,
  role: [], // guest
  data: {
    displayName: "Guest",
    photoUrl: "",
    email: "",
    shortcuts: ["", "", "", ""],
  },
  connected: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedOut: (state, action) => initialState,
    updateProImg: (state, action) => {
      state.data.photoUrl = action.payload;
    },
    updateDispName: (state, action) => {
      state.data.displayName = action.payload;
    },
  },
  extraReducers: {
    [updateUserSettings.fulfilled]: (state, action) => action.payload,
    [updateUserShortcuts.fulfilled]: (state, action) => action.payload,
    [setUser.fulfilled]: (state, action) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.data.displayName = action.payload.data.displayName;
      state.data.email = action.payload.data.email;
      state.data.photoUrl = action.payload.data.photoUrl;
      state.data.shortcuts = action.payload.data.shortcuts;
      state.data.connected = action.payload.connected;
    },
    // [invokeProfileUpdate.fulfilled]: (state, action) => action.payload,
  },
});

export const { userLoggedOut, updateProImg, updateDispName } = userSlice.actions;

export const selectUser = ({ user }) => user;

export const selectUserShortcuts = ({ user }) => user.data.shortcuts;

export default userSlice.reducer;
