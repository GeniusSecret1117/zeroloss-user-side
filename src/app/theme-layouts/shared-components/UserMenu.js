import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import { selectUser } from "app/store/userSlice";
import {
  changeLanguage,
  selectCurrentLanguage,
  selectLanguages,
} from "app/store/i18nSlice";

function UserMenu(props) {
  const user = useSelector((state) => state.user);
  const firstName = user.data.displayName ?? "Guest";

  const currentLanguage = useSelector(selectCurrentLanguage);
  const dispatch = useDispatch();

  const languages = useSelector(selectLanguages);

  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const handleLanguageChange = (event) => {
    dispatch(changeLanguage(event.target.value));
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        {user.data.photoUrl ? (
          <Avatar
            className="md:mx-4"
            alt="user photo"
            src={
              user.data.photoUrl
                ? `${process.env.REACT_APP_BASE_URL}/pro-img/${user.data.photoUrl}`
                : "https://picsum.photos/200"
            }
          />
        ) : (
          <Avatar className="md:mx-4">E</Avatar>
        )}
        <div className="hidden md:flex mx-4 items-end gap-x-6">
          <Typography
            component="span"
            className="font-semibold flex text-[18px]"
          >
            {firstName}
          </Typography>
          <ArrowDropDownIcon color="primary" />
        </div>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-8",
        }}
        sx={{
          "& .MuiPaper-root": { width: "250px", border: "1px solid #41D87B" }, // Set the desired width
        }}
      >
        <div className="py-10 px-20">
          <Typography className="font-semibold text-[20px]">
            {firstName}
          </Typography>
          <Typography className="font-normal text-[16px] text-[#282B2B99]">
            {user.userId}
          </Typography>
        </div>
        <Divider />
        <MenuItem
          component={Link}
          to="/profile"
          onClick={userMenuClose}
          role="button"
        >
          <ListItemIcon className="min-w-40">
            <PersonOutlineOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem role="button">
          <ListItemIcon className="min-w-40">
            <LanguageIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Language" />
          <FormControl sx={{ m: 0, p: 0, minWidth: 80 }}>
            <Select
              value={currentLanguage.id}
              onChange={handleLanguageChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
              IconComponent={KeyboardArrowDownIcon} // Custom dropdown icon
              MenuProps={{
                PaperProps: {
                  sx: {
                    border: "1px solid #41D87B", // Set border color for the dropdown dialog
                  },
                },
              }}
              sx={{
                minHeight: "auto",
                p: 0,
                "& .MuiSelect-select": {
                  padding: 0,
                  pl: 1,
                },
              }}
            >
              {languages.map((lng) => (
                <MenuItem key={lng.id} value={lng.id}>
                  <ListItemText primary={lng.title} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem
          component={Link}
          to="/change-password"
          onClick={userMenuClose}
          role="button"
        >
          <ListItemIcon className="min-w-40">
            <ManageAccountsOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </MenuItem>
        <div className="px-16 mt-8">
          <Button
            href="/sign-out"
            variant="contained"
            color="secondary"
            className="w-full font-medium"
            size="small"
            onClick={() => {
              userMenuClose();
            }}
          >
            Logout
          </Button>
        </div>
      </Popover>
    </>
  );
}

export default UserMenu;
