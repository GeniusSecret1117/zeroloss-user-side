import { useState } from "react";
import Typography from "@mui/material/Typography";
import { ProfileTextField } from "@fuse/core/Common/AuthTextField";
import InputAdornment from "@mui/material/InputAdornment";
import { RiFacebookBoxLine, RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";

const SocialMediaCard = ({
  facebook,
  instagram,
  twitter,
  linkedin,
  handleFacebookChange,
  handleInstagramChange,
  handleTwitterChange,
  handleLinkedinChange,
}) => {
  return (
    <div className="col-span-1 border border-[#D0D7D3] p-[24px] rounded-[12px]">
      <Typography className="text-[16px] font-semibold">
        Connect your Social Media
      </Typography>
      <div className="my-16">
        <Typography className="text-[14px] font-normal my-4">
          Facebook
        </Typography>
        <ProfileTextField
          className="w-full"
          value={facebook}
          onChange={handleFacebookChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiFacebookBoxLine className="text-[20px] text-[#032123]" />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="my-16">
        <Typography className="text-[14px] font-normal my-4">
          Instagram
        </Typography>
        <ProfileTextField
          className="w-full"
          value={instagram}
          onChange={handleInstagramChange}
          InputProps={{
            readOnly: false,
            startAdornment: (
              <InputAdornment position="start">
                <FaInstagram className="text-[20px] text-[#032123]" />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="my-16">
        <Typography className="text-[14px] font-normal my-4">
          Twitter
        </Typography>
        <ProfileTextField
          className="w-full"
          value={twitter}
          onChange={handleTwitterChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiTwitterXLine className="text-[20px] text-[#032123]" />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="my-16">
        <Typography className="text-[14px] font-normal my-4">
          LinkedIn
        </Typography>
        <ProfileTextField
          className="w-full"
          value={linkedin}
          onChange={handleLinkedinChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LiaLinkedin className="text-[20px] text-[#032123]" />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default SocialMediaCard;
