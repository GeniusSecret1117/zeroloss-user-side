import Typography from "@mui/material/Typography";
import { ProfileTextField } from "@fuse/core/Common/AuthTextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { PiTelegramLogo } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";

const PersonalInformationCard = ({
  fullName,
  email,
  telegram,
  whatsapp,
  handleFullNameChange,
  handleTelegramChange,
  handleWhatsappChange,
}) => {
  return (
    <div className="col-span-1 border border-[#D0D7D3] p-[24px] rounded-[12px]">
      <Typography className="text-[16px] font-semibold">
        Personal Information
      </Typography>
      <div className="my-16">
        <Typography className="text-[14px] font-normal my-4">
          Full Name
        </Typography>
        <ProfileTextField
          className="w-full"
          placeholder={fullName}
          onChange={handleFullNameChange}
          value={fullName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleOutlinedIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="my-16">
        <Typography className="text-[14px] font-normal my-4">
          Email Address
        </Typography>
        <ProfileTextField
          className="w-full"
          placeholder={email}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="my-16">
        <Typography className="text-[14px] font-normal my-4">
          Telegram ID
        </Typography>
        <ProfileTextField
          className="w-full"
          placeholder={telegram}
          value={telegram}
          onChange={handleTelegramChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PiTelegramLogo className="text-[20px] text-[#032123]" />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="my-16">
        <Typography className="text-[14px] font-normal my-4">
          WhatsApp Number *
        </Typography>
        <div className="flex items-center">
          <ProfileTextField
            className="w-full"
            placeholder="+1 (555) 555-5555"
            value={whatsapp}
            onChange={handleWhatsappChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaWhatsapp className="text-[20px] text-[#032123]" />
                </InputAdornment>
              ),
            }}
          />
          <div className="px-16">
            <Typography className="text-[14px] font-medium underline cursor-pointer w-max">
              Change Number
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationCard;
