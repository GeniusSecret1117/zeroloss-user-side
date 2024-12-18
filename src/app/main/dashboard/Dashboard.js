import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { selectUser } from "app/store/userSlice";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DashboardTab from "./tabs/dashboard";
import PositionTab from "./tabs/position";
import OrdersTab from "./tabs/orders";
import PositionHistoryTab from "./tabs/positionHistory";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-toolbar": {},
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));
const EditIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "18px",
  height: "18px",
  "&:hover": {
    backgroundColor: "#1E6569",
  },
}));
const StyledButton = styled(Button)(({ isactive, theme }) => ({
  color: isactive ? theme.palette.success.contrastText : "#757575",
}));

function Dashboard(props) {
  const { t } = useTranslation("dashboardPage");
  const user = useSelector((state) => state.user);

  const [activeButton, setActiveButton] = useState("dashboard");

  const handleButtonClick = (name) => {
    setActiveButton(name);
  };
  return (
    <Root
      content={
        <div className="w-full">
          <div className="w-full p-16 bg-[#F3F9F7] mt-32 flex flex-col sm:flex-row justify-between">
            <div className="flex items-center w-full sm:w-auto justify-center">
              {user.data.photoURL ? (
                <Avatar
                  className="md:mx-4"
                  alt="user photo_one"
                  src={
                    user.data.photoUrl
                      ? `${process.env.REACT_APP_BASE_URL}/pro-img/${user.data.photoUrl}`
                      : ""
                  }
                />
              ) : (
                <Avatar
                  className="md:mx-4"
                  alt="user photo_two"
                  src={
                    user.data.photoUrl
                      ? `${process.env.REACT_APP_BASE_URL}/pro-img/${user.data.photoUrl}`
                      : ""
                  }
                />
              )}
              <div className="ml-8">
                <div className="flex items-center">
                  <Typography color="primary" className="font-semibold">
                    {user.data.displayName ?? "Guest"}
                  </Typography>
                  <EditIconButton
                    aria-label="delete"
                    size="small"
                    className="ml-4"
                  >
                    <CreateOutlinedIcon
                      sx={{ fontSize: 14, color: "#D7ECE2" }}
                    />
                  </EditIconButton>
                </div>
                <Typography color="primary" className="font-normal">
                  {user.data.email}
                </Typography>
                <div className="flex items-center">
                  <Typography className="font-HandelGothic font-medium text-[#083A3C]">
                    ZERO
                  </Typography>
                  <Typography
                    className="font-HandelGothic font-medium"
                    color="secondary"
                  >
                    LOSS
                  </Typography>
                  <Typography
                    className="ml-4 font-medium"
                    color="primary"
                  ></Typography>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-16 mt-8 sm:mt-0 overflow-y-hidden overflow-x-auto ml-0 sm:ml-16">
              <div className="flex gap-x-16">
                <StyledButton
                  isactive={activeButton === "dashboard"}
                  variant={activeButton === "dashboard" ? "contained" : "text"}
                  color="success"
                  onClick={() => handleButtonClick("dashboard")}
                >
                  Dashboard
                </StyledButton>
                <div className="w-[1px] h-[40px] bg-[#75757599]" />
              </div>
              <div className="flex gap-x-16">
                <StyledButton
                  isactive={activeButton === "positions"}
                  variant={activeButton === "positions" ? "contained" : "text"}
                  color="success"
                  onClick={() => handleButtonClick("positions")}
                >
                  Positions
                </StyledButton>
                <div className="w-[1px] h-[40px] bg-[#75757599]" />
              </div>
              <div className="flex gap-x-16">
                <StyledButton
                  isactive={activeButton === "orders"}
                  variant={activeButton === "orders" ? "contained" : "text"}
                  color="success"
                  onClick={() => handleButtonClick("orders")}
                >
                  Open Orders
                </StyledButton>
                <div className="w-[1px] h-[40px] bg-[#75757599]" />
              </div>
              <div>
                <StyledButton
                  isactive={activeButton === "history"}
                  variant={activeButton === "history" ? "contained" : "text"}
                  color="success"
                  onClick={() => handleButtonClick("history")}
                >
                  Position History
                </StyledButton>
              </div>
            </div>
          </div>
          <div className="w-full container">
            {activeButton === "dashboard" && <DashboardTab />}
            {activeButton === "positions" && <PositionTab />}
            {activeButton === "orders" && <OrdersTab />}
            {activeButton === "history" && <PositionHistoryTab />}
          </div>
        </div>
      }
      scroll="content"
    />
  );
}

export default Dashboard;
