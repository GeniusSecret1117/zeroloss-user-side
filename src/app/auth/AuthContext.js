import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FuseSplashScreen from "@fuse/core/FuseSplashScreen";
import { showMessage } from "app/store/fuse/messageSlice";
import { logoutUser, setUser, updateDispName, updateProImg } from "app/store/userSlice";
import { getProfile, setProfile } from "app/store/profileSlice";
import { getBinCred, setBinCred } from "app/store/binanceCredSlice";
import {
  getBinCap,
  setBinCap,
  updateFundingHistory,
  updateTransactionHistory,
} from "app/store/binanceCapitalSlice";
import jwtService from "./services/jwtService";
import binService from "./services/binanceService/binService";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    jwtService.on("onAutoLogin", () => {
      dispatch(showMessage({ message: "Signing in with JWT" }));

      /**
       * Sign in and retrieve user data with stored token
       */
      jwtService
        .signInWithToken()
        .then((user) => {
          success(user, "Signed in with JWT");
          dispatch(getProfile());
          if (user.connected === true) {
            dispatch(getBinCred());
            dispatch(getBinCap());
          }
        })
        .catch((error) => {
          pass(error.message);
        });
    });

    jwtService.on("showMessage", (message) => {
      pass(message);
    });

    jwtService.on("updateBinCred", (binCred) => {
      pass("Updated Binance Credentials!");
      dispatch(setBinCred(binCred));
    });

    jwtService.on("onLogin", (user) => {
      success(user, "Signed in");
      dispatch(getProfile());
      dispatch(getBinCred());
      if (user.connected == true) {
        dispatch(getBinCap());
      }
    });

    jwtService.on("onRegister", (user) => {
      success(user, "Signed in");
    });

    jwtService.on("otp", (message) => {
      pass(message);
    });

    jwtService.on("onLogout", () => {
      pass("Signed out");

      dispatch(logoutUser());
    });

    jwtService.on("onAutoLogout", (message) => {
      pass(message);

      dispatch(logoutUser());
    });

    jwtService.on("onNoAccessToken", () => {
      pass();
    });

    jwtService.on("onProfileUpdate", (profile) => {
      pass("Updated profile");
      dispatch(setProfile(profile));
      dispatch(updateDispName(profile.fullName));
    });

    jwtService.on("onProImgUpdate", (photoUrl) => {
      pass("Updated profile Image");
      dispatch(updateProImg(photoUrl));
    });

    // Bin Service
    binService.on("showMessage", (message) => {
      return dispatch(showMessage({ message }));
    });

    binService.on("updateFundingHistory", (fundingFee) => {
      return dispatch(updateFundingHistory(fundingFee));
    });

    binService.on("updateTransactionHistoryy", (transactionHistory) => {
      return dispatch(updateTransactionHistory(transactionHistory));
    });

    jwtService.init();

    function success(user, message) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      Promise.all([
        dispatch(setUser(user)),
        // You can receive data in here before app initialization
      ]).then((values) => {
        setWaitAuthCheck(false);
        setIsAuthenticated(true);
      });
    }

    function pass(message) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      setWaitAuthCheck(false);
      setIsAuthenticated(false);
    }
  }, [dispatch]);

  return waitAuthCheck ? (
    <FuseSplashScreen />
  ) : (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
