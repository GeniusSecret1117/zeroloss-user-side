import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import {
  updateApiKey,
  updateSecretKey,
  updateIpAdd,
} from "app/store/binanceCredSlice";
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { PiLinkSimpleBold, PiTelegramLogo } from "react-icons/pi";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import CopyAllOutlinedIcon from "@mui/icons-material/CopyAllOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { FaWhatsapp } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";
import { RiFacebookLine, RiTwitterXLine } from "react-icons/ri";
import { LuInstagram } from "react-icons/lu";
import clsx from "clsx";
import JwtService from "src/app/auth/services/jwtService";

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

const notificationAlertArray = [
  {
    title: "WhatsApp Notification",
    icon: <FaWhatsapp className="text-[14px] text-[#032123]" />,
    enable: true,
  },
  {
    title: "Telegram Notification",
    icon: <PiTelegramLogo className="text-[14px] text-[#032123]" />,
    enable: false,
  },
];

const socialAccountsArray = [
  {
    title: "WhatsApp",
    icon: <FaWhatsapp className="text-[14px] text-[#032123]" />,
    connected: true,
  },
  {
    title: "Telegram",
    icon: <PiTelegramLogo className="text-[14px] text-[#032123]" />,
    connected: false,
  },
  {
    title: "Facebook",
    icon: <RiFacebookLine className="text-[14px] text-[#032123]" />,
    connected: false,
  },
  {
    title: "Twitter",
    icon: <RiTwitterXLine className="text-[14px] text-[#032123]" />,
    connected: false,
  },
  {
    title: "Instagram",
    icon: <LuInstagram className="text-[14px] text-[#032123]" />,
    connected: false,
  },
];

const socialPostingArray = [
  {
    title: "WhatsApp Auto Post",
    icon: <FaWhatsapp className="text-[14px] text-[#032123]" />,
    enable: true,
  },
  {
    title: "Telegram Auto Post",
    icon: <PiTelegramLogo className="text-[14px] text-[#032123]" />,
    enable: false,
  },
  {
    title: "Facebook Auto Post",
    icon: <RiFacebookLine className="text-[14px] text-[#032123]" />,
    enable: false,
  },
  {
    title: "Twitter Auto Post",
    icon: <RiTwitterXLine className="text-[14px] text-[#032123]" />,
    enable: false,
  },
  {
    title: "Instagram Auto Post",
    icon: <LuInstagram className="text-[14px] text-[#032123]" />,
    enable: false,
  },
];

function Settings(props) {
  const { t } = useTranslation("profilePage");
  const user = useSelector(selectUser);
  const [exchange, setExchange] = useState(10);
  const [notificationAlerts, setNotificationAlerts] = useState(
    notificationAlertArray
  );
  const [socialAccounts, setSocialAccounts] = useState(socialAccountsArray);
  const [postAccounts, setPostAccounts] = useState(socialPostingArray);

  const binCred = useSelector((state) => state.binCred);
  const dispatch = useDispatch();
  useSelector((state) => state.binCred);
  const loading = useSelector((state) => state.binCred.loading);

  const [apiKey, setApiKey] = useState(binCred.apiKey);
  const [secretKey, setSecretKey] = useState(binCred.apiKey);
  const [ipAddresses, setIpAddresses] = useState(binCred.ipAddresses);

  useEffect(() => {
    if (!loading) {
      setApiKey(binCred.apiKey);
      setSecretKey(binCred.secretKey);
      setIpAddresses(binCred.ipAddresses);
      console.log("ip adress", ipAddresses);
    }
  }, [loading]);

  const handleChange = (event) => {
    setExchange(event.target.value);
  };
  const handleCheckboxToggle = (index) => {
    setNotificationAlerts((prev) =>
      prev.map((alert, i) =>
        i === index ? { ...alert, enable: !alert.enable } : alert
      )
    );
  };

  const handleSocialToggle = (index) => {
    setSocialAccounts((prev) =>
      prev.map((alert, i) =>
        i === index ? { ...alert, connected: !alert.connected } : alert
      )
    );
  };

  const handlePostingToggle = (index) => {
    setPostAccounts((prev) =>
      prev.map((alert, i) =>
        i === index ? { ...alert, enable: !alert.enable } : alert
      )
    );
  };

  const updateBinCred = async () => {
    dispatch(updateApiKey(apiKey));
    dispatch(updateSecretKey(secretKey));
    dispatch(updateIpAdd(ipAddresses));

    const data = {
      api_key: apiKey,
      secret_key: secretKey,
      ip_addresses: ipAddresses,
    };

    await JwtService.updateBinCredData(data);
  };

  return (
    <Root
      content={
        <div className="w-full container p-[12px]">
          <div className="flex items-center mt-[20px]">
            <SettingsOutlinedIcon className="text-[40px] text-[#032123]" />
            <Typography
              className="font-semibold text-[40px] ml-8"
              color="primary"
            >
              Settings
            </Typography>
          </div>
          <div className="flex items-center mt-[20px]">
            <PiLinkSimpleBold className="text-[24px] text-[#032123]" />
            <Typography className="font-semibold text-[24px] ml-8">
              Connect Exchange
            </Typography>
          </div>
          <div className="rounded-[12px] bg-[#E1FAEB] p-[12px] mt-[12px] w-full">
            <Typography className="font-semibold text-[20px] ml-8 my-8">
              Connect via API Keys
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Exchange</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={exchange}
                label="Exchange"
                onChange={handleChange}
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                  backgroundColor: "#F0FEF7", // Background color
                  borderRadius: "8px", // Border radius
                }}
              >
                <MenuItem value={10}>Binance</MenuItem>
              </Select>
            </FormControl>
            <div className="rounded-[8px] border border-[#75757577] bg-[#F0FEF7] w-full p-[12px] my-16 items-center flex gap-16">
              <img className="" src="assets/icons/api.svg" alt="api" />
              <div className="w-full">
                <Typography className="font-normal text-[14px]">
                  API Key
                </Typography>
                <Typography className="font-normal text-[14px]">
                  {binCred.apiKey}
                </Typography>
                <input
                  type="text"
                  value={apiKey || ""}
                  placeholder="Enter your api key here"
                  onChange={(e) => setApiKey(e.target.value)} // Update the state with the input value
                  className="w-full mt-2 p-[12px] text-[16px] bg-[#F0FEF7] border border-[#75757577] rounded-[8px] font-medium focus:outline-none focus:border-[#4CAF50]"
                />
              </div>
            </div>
            <div className="rounded-[8px] border border-[#75757577] bg-[#F0FEF7] w-full p-[12px] my-16 items-center flex gap-16">
              <img className="" src="assets/icons/secret.svg" alt="secret" />
              <div className="w-full">
                <Typography className="font-normal text-[14px]">
                  Secret key
                </Typography>
                <Typography className="font-normal text-[14px]">
                  {binCred.secretKey}
                </Typography>
                <input
                  type="text"
                  value={secretKey || ""}
                  placeholder="Enter your secret key here"
                  onChange={(e) => setSecretKey(e.target.value)} // Update the state with the input value
                  className="w-full mt-2 p-[12px] text-[16px] bg-[#F0FEF7] border border-[#75757577] rounded-[8px] font-medium focus:outline-none focus:border-[#4CAF50]"
                />
              </div>
            </div>

            <ul className="list-disc pl-20">
              <li className="font-normal text-[16px]">
                <span className="font-medium">Note:&nbsp;</span>
                Please make sure the entered IP addresses are correct before
                updating. Invalid IPs might cause connectivity issues.
              </li>
            </ul>
            <div className="flex items-center mt-[20px] border-b border-[#083A3C40]">
              <Typography className="font-semibold text-[20px] ml-8 my-8">
                Whitelist IPs
              </Typography>
            </div>
            <div className="rounded-[8px] border border-[#75757577] bg-[#F0FEF7] w-full p-[12px] my-16 items-center flex gap-16">
              <img
                className=""
                src="assets/icons/whitelist.svg"
                alt="whitelist"
              />
              <div className=" w-[calc(100%-50px)]">
                <Typography className="font-normal text-[14px]">
                  IP Address to Whitelist
                </Typography>
                <div className="flex items-center justify-between">
                  <div className="w-full">
                    <Typography className="font-medium text-[16px] overflow-hidden whitespace-nowrap text-ellipsis mr-80">
                      <input
                        type="text"
                        value={ipAddresses.join(",")}
                        placeholder="Enter comma-separated IP addresses"
                        onChange={(e) =>
                          setIpAddresses(
                            e.target.value.split(",").map((ip) => ip.trim())
                          )
                        } // Split and trim input value to update the state
                        className="w-full mt-2 p-[12px] text-[16px] bg-[#F0FEF7] border border-[#75757577] rounded-[8px] font-medium focus:outline-none focus:border-[#4CAF50]"
                      />
                    </Typography>
                  </div>
                  <IconButton color="primary" className="">
                    <CopyAllOutlinedIcon className="text-[20px]" />
                  </IconButton>
                </div>
              </div>
            </div>
            <ul className="list-disc pl-20">
              <li className="font-normal text-[16px]">
                <span className="font-medium">Note:&nbsp;</span>
                Please make sure the entered IP addresses are correct before
                updating. <br /> Invalid IPs might cause connectivity issues.
              </li>
            </ul>
            <div className="mt-8">
              <Button
                variant="contained"
                color="secondary"
                className="mt-16 font-medium text-[16px]"
                aria-label="Update"
                size="large"
                onClick={updateBinCred}
              >
                Connect to Zeroloss
              </Button>
            </div>
          </div>
          <div className="flex items-center mt-[20px]">
            <NotificationsIcon className="text-[24px] text-[#032123]" />
            <Typography className="font-semibold text-[24px] ml-8">
              Notification Alerts
            </Typography>
          </div>
          <div className="p-16">
            {notificationAlerts.map((notificationAlert, index) => (
              <div
                key={index}
                className="flex justify-between items-center my-8 flex-wrap"
              >
                <div className="flex gap-8 items-center">
                  {notificationAlert.icon}
                  <Typography className="font-normal text-[16px] ml-8">
                    {notificationAlert.title}
                  </Typography>
                </div>
                <div className="flex gap-8 items-center">
                  <div
                    className={clsx(
                      "text-[16px] font-normal border rounded-[4px] min-w-[80px] px-8 flex justify-center items-center",
                      notificationAlert.enable
                        ? "border-[#41D87B] bg-[#41D87B1A]"
                        : "border-[#757575] bg-[#7575751A]"
                    )}
                  >
                    {notificationAlert.enable ? "Enable" : "Disable"}
                  </div>
                  <Checkbox
                    checked={notificationAlert.enable}
                    onChange={() => handleCheckboxToggle(index)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center mt-[20px]">
            <PiLinkSimpleBold className="text-[24px] text-[#032123]" />
            <Typography className="font-semibold text-[24px] ml-8">
              Social Accounts
            </Typography>
          </div>
          <div className="p-16">
            {socialAccounts.map((socialAccount, index) => (
              <div
                key={index}
                className="flex justify-between items-center my-8 flex-wrap"
              >
                <div className="flex gap-8 items-center">
                  {socialAccount.icon}
                  <Typography className="font-normal text-[16px] ml-8">
                    {socialAccount.title}
                  </Typography>
                </div>
                <div className="flex gap-8 items-center">
                  <div
                    className={clsx(
                      "text-[16px] font-normal border rounded-[4px] h-[32px] flex items-center justify-center",
                      socialAccount.connected
                        ? "border-[#41D87B] bg-[#41D87B1A] w-[100px]"
                        : "border-[#FF143E] bg-[#FF143E1A] w-[132px]"
                    )}
                  >
                    {socialAccount.connected ? "Connected" : "Not Connected"}
                  </div>
                  {!socialAccount.connected && (
                    <Button
                      variant="contained"
                      color="secondary"
                      className="font-normal text-[16px]"
                      sx={{
                        borderRadius: "4px !important",
                        minHeight: "32px !important",
                        maxHeight: "32px !important",
                        height: "32px !important",
                      }}
                      onClick={() => handleSocialToggle(index)}
                    >
                      connect
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center mt-[20px]">
            <PiLinkSimpleBold className="text-[24px] text-[#032123]" />
            <Typography className="font-semibold text-[24px] ml-8">
              Auto-Posting on Social Accounts
            </Typography>
          </div>
          <div className="p-16">
            {postAccounts.map((postAccount, index) => (
              <div
                key={index}
                className="flex justify-between items-center my-8 flex-wrap"
              >
                <div className="flex gap-8 items-center">
                  {postAccount.icon}
                  <Typography className="font-normal text-[16px] ml-8">
                    {postAccount.title}
                  </Typography>
                </div>
                <div className="flex gap-8 items-center">
                  <div
                    className={clsx(
                      "text-[16px] font-normal border rounded-[4px] min-w-[80px] px-8 flex justify-center items-center",
                      postAccount.enable
                        ? "border-[#41D87B] bg-[#41D87B1A]"
                        : "border-[#757575] bg-[#7575751A]"
                    )}
                  >
                    {postAccount.enable ? "Enable" : "Disable"}
                  </div>
                  <Checkbox
                    checked={postAccount.enable}
                    onChange={() => handlePostingToggle(index)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              variant="contained"
              color="secondary"
              className="mt-16 font-medium text-[16px] min-w-[280px]"
              aria-label="Update"
              type="submit"
              size="large"
            >
              Save Change
            </Button>
          </div>
        </div>
      }
      scroll="content"
    />
  );
}

export default Settings;
