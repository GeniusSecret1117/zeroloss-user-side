import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "app/store/userSlice";
import { Typography, Button } from "@mui/material";
import PersonalInformationCard from "./components/PersonalInformtionCard";
import SocilaMediaCard from "./components/SocilaMediaCard";
import jwtService from "../../auth/services/jwtService/jwtService";
import {
  updateFacebook,
  updateTwitter,
  updateInstagram,
  updateLinkedin,
  updateFullName,
  updateWhatsapp,
  updateTelegram,
} from "../../store/profileSlice";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
function Profile(props) {
  const { t } = useTranslation("profilePage");
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const loading = useSelector((state) => state.profile.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("inside profile db", loading);
    if (!loading) {
      console.log("inside not loading");
      setFullName(profile?.fullName || "Guest");
      setWhatsapp(profile?.whatsapp || "whatsapp");
      setTelegram(profile?.telegram || "telegram");
      setFacebook(profile?.facebook || "Guest");
      setInstagram(profile?.instagram || "instagram");
      setTwitter(profile?.twitter || "twitter");
      setLinkedin(profile?.linkedin || "linkedin");
    }
  }, [loading]);

  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState(profile?.fullName || "Guest");
  const [whatsapp, setWhatsapp] = useState(profile?.whatsapp || "whatsapp");
  const [telegram, setTelegram] = useState(profile?.telegram || "telegram");
  const [facebook, setFacebook] = useState(profile?.facebook || "Guest");
  const [instagram, setInstagram] = useState(profile?.instagram || "instagram");
  const [twitter, setTwitter] = useState(profile?.twitter || "twitter");
  const [linkedin, setLinkedin] = useState(profile?.linkedin || "linkedin");

  const handleFacebookChange = (e) => {
    setFacebook(e.target.value);
  };

  const handleTwitterChange = (e) => {
    setTwitter(e.target.value);
  };

  const handleInstagramChange = (e) => {
    setInstagram(e.target.value);
  };

  const handleLinkedinChange = (e) => {
    setLinkedin(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleWhatsappChange = (e) => {
    setWhatsapp(e.target.value);
  };

  const handleTelegramChange = (e) => {
    setTelegram(e.target.value);
  };

  const personalInfoProp = {
    fullName,
    email: user.data.email,
    telegram,
    whatsapp,
    handleFullNameChange,
    handleTelegramChange,
    handleWhatsappChange,
  };
  const socialMediaInfoProp = {
    facebook,
    instagram,
    twitter,
    linkedin,
    handleFacebookChange,
    handleInstagramChange,
    handleTwitterChange,
    handleLinkedinChange,
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const updateProImg = async () => {
    try {
      const formData = new FormData();
      formData.append("profileImage", profileImage);
      const respone = await jwtService.updateProImgData(formData);
      if (respone.status == 200) {
        console.log("updated image success", respone.data);
      } else {
        console.log("updated image error", respone.data);
      }
    } catch (error) {
      console.log("error update pro img error", error);
    }
  };

  const updateProfile = async () => {
    console.log(
      "profile beforePressing update-onsubmit before dispatch",
      profile
    );
    dispatch(updateFacebook(facebook));
    dispatch(updateTwitter(twitter));
    dispatch(updateInstagram(instagram));
    dispatch(updateLinkedin(linkedin));
    dispatch(updateFullName(fullName));
    dispatch(updateWhatsapp(whatsapp));
    dispatch(updateTelegram(telegram));
    const updatedProfile = {
      facebook,
      twitter,
      instagram,
      linkedin,
      fullName,
      whatsapp,
      telegram,
    };
    console.log("profile after dispatch", updatedProfile);
    jwtService
      .updateUserData(updatedProfile)
      .then((profile) => {
        console.log("update then user", profile);
        // No need to do anything, user data will be set at app/auth/AuthContext
      })
      .catch((error) => {
        console.log(
          "error while updating up",
          error || "error in updateprofile"
        );
      });

    console.log("profile beforePressi", profile);
  };

  return (
    <Root
      content={
        <div className="w-full container pt-[24px]">
          <div className="rounded-[16px] bg-[#F3F9F7] p-[24px]">
            <Typography className="font-semibold text-[40px]">
              Good Morning, {profile.fullName ?? "Guest"}
            </Typography>
            <Typography component="p" className="text-[20px] font-normal">
              Welcome to&nbsp;
              <span className="font-HandelGothic font-medium text-[#64B337]">
                ZEROLOSS
              </span>
              &nbsp;Dashboard
            </Typography>
            <Typography className="text-[20px] font-normal">
              Complete Your Profile First
            </Typography>
            <div className="rounded-[12px] border border-[#D0D7D3] p-[24px] mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-1 ">
                <Typography className="text-[20px] font-semibold">
                  Your Photo
                </Typography>
                <Typography className="text-[16px] font-normal">
                  This will be displayed on your profile
                </Typography>
                <div className="flex gap-8 mt-[12px]">
                  <Button
                    variant="outlined"
                    className="font-medium"
                    size="medium"
                    component="label"
                    role={user.role}
                    tabIndex={-1}
                  >
                    Upload New
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleFileSelect}
                    />
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="font-medium"
                    size="medium"
                    onClick={updateProImg}
                    disabled={!profileImage}
                  >
                    Save
                  </Button>
                </div>
              </div>
              <div className="col-span-1 flex flex-col items-start">
                <div className="flex gap-8">
                  <Typography component="p" className="text-[16px] font-normal">
                    <span className="font-HandelGothic">ZEROLOSS</span>
                    &nbsp;ID:
                  </Typography>
                  <Typography className="text-[16px] font-semibold">
                    {user.userId ?? ""}
                  </Typography>
                </div>
                <div className="flex gap-8 mt-8">
                  <Typography component="p" className="text-[16px] font-normal">
                    <span className="font-medium">BINANCE</span>
                    &nbsp;ID:
                  </Typography>
                  <Typography className="text-[16px] font-semibold">
                    {profile.binanceId ?? ""}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
              <PersonalInformationCard {...personalInfoProp} />
              <SocilaMediaCard {...socialMediaInfoProp} />
            </div>
            <div className="flex justify-center">
              <Button
                variant="contained"
                color="secondary"
                className="mt-16 font-medium text-[16px] min-w-[280px]"
                aria-label="Update"
                type="submit"
                size="large"
                onClick={updateProfile}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      }
      scroll="content"
    />
  );
}

export default Profile;
