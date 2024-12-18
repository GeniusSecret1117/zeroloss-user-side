import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { formatNumberWithOutDecimal } from '@fuse/utils';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';

const InActiveCard = (props) => {
  const { value } = props;
  return (
    <Paper className="flex w-full justify-between flex-wrap items-center px-[12px] py-[18px] rounded-[12px] bg-[#E5E5E5] border border-[#03212333] shadow-none ">
      <div className="flex items-center flex-wrap">
        <Paper className="flex rounded-[8px] bg-[#CBC9C9] shadow-none p-[4px]">
          <PersonOffOutlinedIcon color="primary" />
        </Paper>
        <div className="ml-[12px]">
          <Typography className="font-semibold text-[16px]" color="primary">
            Inactive Referrals
          </Typography>
          <Typography className="font-bold text-[24px] font-Mint" color="primary">
            {formatNumberWithOutDecimal(value)}
          </Typography>
        </div>
      </div>
      <div className="flex items-center">
        <AvatarGroup
          sx={{
            '& .MuiAvatar-root': {
              borderColor: '#F3F9F7',
            },
          }}
        >
          <Avatar src="assets/images/avatars/female-18.jpg" />
          <Avatar src="assets/images/avatars/female-11.jpg" />
          <Avatar src="assets/images/avatars/male-09.jpg" />
          <Avatar src="assets/images/avatars/male-16.jpg" />
        </AvatarGroup>
      </div>
    </Paper>
  );
};

InActiveCard.propTypes = {
  value: PropTypes.number,
};
export default InActiveCard;
