import { useState,useEffect} from 'react';
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
import JwtService from "src/app/auth/services/jwtService";
import { fontSize } from '@mui/system';

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
    fontSize:'20px',
    height: '60px', // Set height of the container
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
  console.log('333:',props);

  const [emails, setEmails] = useState([]); // List of entered emails
  const [currentEmail, setCurrentEmail] = useState(""); // Current input
 
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return emailRegex.test(email.trim());
  };



   // Add email to the list if valid
   const addEmail = () => {
    if (isValidEmail(currentEmail)) {
      setEmails([...emails, currentEmail.trim()]); // Trim and add the email
      setCurrentEmail(""); // Clear the input
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {      
      inviteFrend();
    }    
    if (e.key === " " || e.key === ",") {
      e.preventDefault(); // Prevent default spacebar or Enter behavior
      addEmail(); // Add the email to the list
    }
  };
  const inviteFrend =()=>{
       if (emails.length>0) {
        JwtService.inviteFriends(emails)        
        .then((res) => {
          setEmails([]);
        })
        .catch((error) => {
          console.log("error", error);
        });
      }
  }  
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
          limitTags={3}
          id="multiple-limit-tags"
          options={emails}
          getOptionLabel={(option) => option}
          value={emails}
          onChange={(event, newValue) => setEmails(newValue)}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              onChange={(e)=>setCurrentEmail(e.target.value)}
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
            onDelete: (event) => {
              const deletedEmail = event.target.closest('.MuiChip-root').textContent.trim();
              if (deletedEmail) {
                const updatedEmails = emails.filter(email => email !== deletedEmail);
                setEmails(updatedEmails); 
              }
            },
            sx: {
              backgroundColor: '#BFDACD99', // Set Chip background color
            },
          }}
          className="w-full"
          
        />
        <SendIconButton aria-label="delete" size="small" className="" onClick={handleKeyDown}>
          <SendOutlinedIcon sx={{ fontSize: 17 }} color="primary" />
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
            defaultValue={`https://157.173.221.60/sign-up?ref=${props.referralcode}`}
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
