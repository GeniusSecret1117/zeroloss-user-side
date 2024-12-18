/* eslint-disable import/prefer-default-export */
import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const AuthTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#E8EFED',
    borderRadius: '8px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
});

export const ProfileTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#BFDACD',
    borderRadius: '8px',
    height: '40px', // Set height
    padding: '0 14px', // Adjust padding for proper text alignment
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 0', // Adjust input padding to vertically center the text
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #D3DBDB',
  },
});


export const PasswordTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#E8EFED',
    borderRadius: '8px',
    height: '40px', // Set height
    padding: '0 14px', // Adjust padding for proper text alignment
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 0', // Adjust input padding to vertically center the text
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #989694',
  },
});