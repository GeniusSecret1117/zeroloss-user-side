import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import { FaWhatsapp } from 'react-icons/fa';
import { PiTelegramLogo } from 'react-icons/pi';
import { FaFacebookF, FaLinkedin } from 'react-icons/fa6';
import { AiFillInstagram } from 'react-icons/ai';

import { RiTwitterXLine } from 'react-icons/ri';

const emailOptions = [
  'user1@example.com',
  'user2@example.com',
  'user3@example.com',
  'user4@example.com',
  'user5@example.com',
];

const SendIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#BFDACD',
  width: '24px',
  height: '24px',
  '&:hover': {
    backgroundColor: '#BFDACD99',
  },
}));

const ShareIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#BFDACD',
  width: '32px',
  height: '32px',
  '&:hover': {
    backgroundColor: '#1E6569',
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    border: 'none', // Disable border
    borderRadius: '24px',
    height: '50px', // Set height of the container
    padding: '0px 5px',
    display: 'flex',
    alignItems: 'center', // Center the content vertically
    '&:hover': {
      border: 'none', // Remove border on hover
    },
    '&.Mui-focused': {
      border: 'none', // Remove border when focused
      boxShadow: 'none', // Remove box shadow when focused
    },
  },
  '& .MuiInputBase-input': {
    padding: '0px', // Remove inner padding to align with height
    lineHeight: '50px', // Ensure line height matches the container height
  },
}));

const Invites = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(emailOptions);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setFilteredOptions(
        emailOptions.filter((email) => email.toLowerCase().includes(inputValue.toLowerCase()))
      );
    }
  };

  return (
    <div className="col-span-6 px-[28px] py-[36px] rounded-[12px] bg-[#F3F9F7] flex flex-col justify-center">
      <Typography className="font-semibold text-[20px]" color="primary">
        Invite your friends
      </Typography>
      <Typography component="p" className="font-normal text-[16px]">
        Invite your audience, friends and familys' email address and send them invitations to
        join&nbsp;
        <span className="font-HandelGothic text-success">ZERO</span>
        <span className="font-HandelGothic text-[#64B337]">LOSS</span>.
      </Typography>
      <div className="w-full flex border rounded-[24px] border-[#D0D7D3] items-center px-8 mt-[24px]">
        <Autocomplete
          multiple
          limitTags={2}
          id="multiple-limit-tags"
          options={filteredOptions}
          getOptionLabel={(option) => option}
          defaultValue={[emailOptions[0], emailOptions[1]]}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              onInput={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Email address"
              variant="outlined"
            />
          )}
          sx={{
            '&.MuiAutocomplete-root': {
              border: 'none', // Disable border
              boxShadow: 'none', // Remove any shadow
            },
            '& .MuiAutocomplete-input': {
              border: 'none', // Remove input border
            },
            '& .MuiOutlinedInput-root': {
              border: 'none', // Ensure TextField has no border
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
          ChipProps={{
            sx: {
              backgroundColor: '#BFDACD99', // Set Chip background color
            },
          }}
          className="w-full"
        />
        <SendIconButton aria-label="delete" size="small" className="">
          <SendOutlinedIcon sx={{ fontSize: 14 }} color="primary" />
        </SendIconButton>
      </div>
      <Typography className="font-semibold text-[20px] mt-[24px]" color="primary">
        Share the referral link
      </Typography>
      <Typography component="p" className="font-normal text-[16px]">
        You can also share your referral link by copying and sending it or sharing it on your social
        media.
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-10 gap-16 mt-[24px]">
        <Paper className="flex items-center col-span-6 px-16 py-4 border border-[#D0D7D3] h-[50px] rounded-[24px] bg-[#BFDACD] shadow-none">
          <Input
            className="flex flex-1 px-8"
            disableUnderline
            fullWidth
            defaultValue="https://www.zeroloss.com/referral/1234567890"
            readOnly
          />
          <IconButton color="primary">
            <ContentCopyOutlinedIcon className="text-[14px]" />
          </IconButton>
        </Paper>
        <div className="flex flex-wrap col-span-4 justify-center items-center">
          <ShareIconButton className="ml-6">
            <FaWhatsapp className="text-[20px] text-[#032123]" />
          </ShareIconButton>
          <ShareIconButton className="ml-6">
            <PiTelegramLogo className="text-[20px] text-[#032123]" />
          </ShareIconButton>
          <ShareIconButton className="ml-6">
            <FaFacebookF className="text-[20px] text-[#032123]" />
          </ShareIconButton>
          <ShareIconButton className="ml-6">
            <AiFillInstagram className="text-[20px] text-[#032123]" />
          </ShareIconButton>
          <ShareIconButton className="ml-6">
            <FaLinkedin className="text-[24px] text-[#032123]" />
          </ShareIconButton>
          <ShareIconButton className="ml-6">
            <RiTwitterXLine className="text-[24px] text-[#032123]" />
          </ShareIconButton>
        </div>
      </div>
    </div>
  );
};

export default Invites;
