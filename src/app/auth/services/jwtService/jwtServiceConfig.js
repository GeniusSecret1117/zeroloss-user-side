const jwtServiceConfig = {
  signIn: "api/auth/login",
  signUp: "api/auth/register",
  changePd:"api/auth/change-password",
  verifyOtp: "api/auth/verify-otp",
  accessToken: "api/auth/access-token",
  updateProfile: "api/profile",
  updateProImg: "api/profile/profile-image",
  getProfile: "api/profile",
  getBinCred: "api/binance",
  updateBinCred: "api/binance",
  resendCode :"api/auth/request-otp",
  
};

export default jwtServiceConfig;
