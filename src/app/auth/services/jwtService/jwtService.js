import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import jwtDecode from "jwt-decode";
import jwtServiceConfig from "./jwtServiceConfig";

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();
    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expird");
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.signUp, data).then((response) => {
          if (response.data.data) {
            resolve(response.data.data);
            this.emit('otp', 'Success Sign up');
          } else {
            reject(response.message);
          }
        })
        .catch((error, status) => {
          if (error.response) {
              const status = error.response.status;
              const message = status === 409
                  ? 'This email is already registered and verified.'
                  : 'Error Sign up';
              this.emit('otp', message);
              throw new Error(message);
          } else {
              this.emit('otp', 'Unexpected error occurred.');
              throw new Error('Unexpected error occurred.');
          }
        });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      const data = {
        email,
        password,
      };
      axios.post(jwtServiceConfig.signIn, data).then((response) => {
        if (response.data.data) {
          this.setSession(response.data.access_token);
          resolve(response.data.data);
          this.emit("onLogin", response.data.data);
        } else {
          reject(response.message);
        }
      });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(jwtServiceConfig.accessToken, {
          headers: {
            Authorization: `Bearer ${this.getAccessToken()}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data) {
            this.setSession(response.data.access_token);
            resolve(response.data.data);
          } else {
            this.logout();
            reject(new Error("Failed to login with token."));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error("Failed to login with token."));
        });
    });
  };

  verifyUserOtp = (otp, email) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.verifyOtp, { otp, email })
        .then((response) => {
          if (response.status == 200) {
            resolve(response);
            this.emit("otp", "Email Verification Succeccfull");
          } else if (response.status == 500) {
            this.emit("otp", "Invalid OTP");
            reject(response.data.message);
            
          } else {
            reject(response.data.message);
            this.emit("otp", response.data.message);
          }
        })
        .catch((error) => {
          this.emit("otp", "Invalid OTP");
          reject(error.message || "An error occurred");
        });
    });
  };

  updateBinCredData = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(jwtServiceConfig.updateBinCred, data, {
          headers: {
            Authorization: `Bearer ${this.getAccessToken()}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          resolve(response.data.data);
          this.emit("updateBinCred", response.data.data);
        })
        .catch((error) => {
          reject(error.message);
          this.emit(
            "showMessage",
            error.message || "Error while updating Bin Credentials!"
          );
        });
    });
  };

  updateUserData = (profile) => {
    return new Promise((resolve, reject) => {
      axios
        .put(jwtServiceConfig.updateProfile, profile, {
          headers: {
            Authorization: `Bearer ${this.getAccessToken()}`,
            "Content-Type": "application/json",
          },
        })
        .then((resposne) => {
          resolve(resposne.data.data);
          this.emit("onProfileUpdate", resposne.data.data);
        })
        .catch((err) => {
          reject(err.message);
        }); 
    });
  };

  updateProImgData = (formData) => {
    return new Promise((resolve, reject) => {
      axios
        .put(jwtServiceConfig.updateProImg, formData, {
          headers: {
            Authorization: `Bearer ${this.getAccessToken()}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          resolve(response.data);
          this.emit("onProImgUpdate", response.data.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  };

  getBinCredData = async () => {
    try {
      const response = await axios.get(jwtServiceConfig.getBinCred, {
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`,
          "Content-Type": "application/json",
        },
      });

      return response.data.data;
    } catch (error) {
      return error.message;
    }
  };

  getProfileData = async () => {
    try {
      const response = await axios.get(jwtServiceConfig.getProfile, {
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      return error.message;
    }
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem("jwt_access_token");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit("onLogout", "Logged out");
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    }
    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };
  changePassword = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.changePd, data).then((response) => {
        console.log(response);
      });
    });
  };
  resendCode = (email,otp) =>{
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.resendCode, {email}).then((response) => {
        this.emit("otp", "Resend verifycode successfuly");
        console.log(response);
      }).catch((error) => {
        this.emit("otp", "Invalid Resend OTP");
      });
    });
  }
  inviteFriends = (data) =>{
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.inviteFrend, {data}).then((response) => {
        this.emit("otp", "invite your friend successfuly!");
        console.log(response);
        resolve(response.data);
      }).catch;
    });
  }
  getReferral = () =>{
    return new Promise((resolve, reject) => {
      axios.get(jwtServiceConfig.getReferral).then((response) => {
        resolve(response.data.data[0]);
      }).catch;
    });
    
  }
  getProfitData = () =>{
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.getReferral,{startTime,endTime}).then((response) => {
        resolve(response.data.data[0]);
      }).catch;
    });
    
  }
}

const instance = new JwtService();

export default instance;
