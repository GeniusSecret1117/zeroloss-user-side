import FuseAuthorization from "@fuse/core/FuseAuthorization";
import axios from "axios";

const getPersonalInfoData = async () => {
  axios.get("http://127.0.0.1:8080/api/profile/", {
    headers: {
      Authorization: `Bearer  ${localStorage.getItem("jwt_access_token")}`,
      "Content-Type": "application/json",
    },
  });
};

export { getPersonalInfoData };
