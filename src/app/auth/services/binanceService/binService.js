import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import jwtDecode from "jwt-decode";
import binServiceConfig from "./binServiceConfig";

class BinService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  getBinCap = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(binServiceConfig.getBinCap, {
          headers: {
            Authorization: `Bearer ${this.getAccessToken()}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getPeriodFundingHistory = (startTime, endTime) => {
    return new Promise((resolve, reject) => {
      if (
        !startTime ||
        startTime == null ||
        startTime == undefined ||
        !endTime ||
        endTime == null ||
        endTime == undefined ||
        isNaN(new Date(startTime)) ||
        isNaN(new Date(endTime))
      ) {
        console.log("either of them are empty");
        this.emit("showMessage", "Invalid Dates");
        reject();
        return;
      }

      if (new Date(startTime) >= new Date(endTime)) {
        this.emit("showMessage", "Invalid Dates");
        reject();
        return;
      }

      axios
        .post(
          binServiceConfig.getPeriodFundingHistory,
          { startTime, endTime },
          {
            headers: {
              Authorization: `Bearer ${this.getAccessToken()}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("getPeriod funding fee", response.data.data);
          this.emit("updateFundingHistory", response.data.data);
          resolve(response.data.data);
        })
        .catch((error) => {
          this.emit(
            "showMessage",
            "Error while fetching Time based Funding. Please try again."
          );
          reject(error);
        });
    });
  };

  getPeriodTransactionHistory = (startTime, endTime) => {
    return new Promise((resolve, reject) => {
      if (
        !startTime ||
        startTime == null ||
        startTime == undefined ||
        !endTime ||
        endTime == null ||
        endTime == undefined ||
        isNaN(new Date(startTime)) ||
        isNaN(new Date(endTime))
      ) {
        this.emit("showMessage", "Invalid Dates");
        reject();
        return;
      }

      if (new Date(startTime) >= new Date(endTime)) {
        this.emit("showMessage", "Invalid Dates");
        reject();
        return;
      }

      axios
        .post(
          binServiceConfig.getPeriodTransactionHistory,
          { startTime, endTime },
          {
            headers: {
              Authorization: `Bearer ${this.getAccessToken()}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("getPeriod funding fee", response.data.data);
          this.emit("updateTransactionHistoryy", response.data.data);
          resolve(response.data.data);
        })
        .catch((error) => {
          this.emit(
            "showMessage",
            "Error while fetching Time based Transaction History. Please try again."
          );
          reject(error);
        });
    });
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };
  buyOrder = (data) =>{
    return new Promise((resolve, reject) => {
      axios
        .post(
          binServiceConfig.buyOrder,
          {data},
          {
            headers: {
              Authorization: `Bearer ${this.getAccessToken()}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log('111:',response.data.data);
          
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

const instance = new BinService();

export default instance;
