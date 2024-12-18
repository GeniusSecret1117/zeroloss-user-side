import { combineReducers } from "@reduxjs/toolkit";
import fuse from "./fuse";
import i18n from "./i18nSlice";
import user from "./userSlice";
import profile from "./profileSlice";
import binCred from "./binanceCredSlice";
import binCap from "./binanceCapitalSlice";

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    fuse,
    i18n,
    user,
    profile,
    binCred,
    binCap,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === "user/userLoggedOut") {
    // state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
