import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { formatNumber } from '@fuse/utils';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

const WalletBalanceCard = (props) => {
  const { value } = props;
  return (
    <Paper className="flex w-full items-center p-[12px] rounded-[12px] bg-[#41D87B] shadow-none ">
      <Paper className="flex rounded-[8px] bg-[#2EB562] shadow-none p-[4px]">
        <AccountBalanceWalletOutlinedIcon sx={{ color: 'white' }} />
      </Paper>
      <div className="ml-[12px]">
        <Typography className="font-semibold text-[12px] text-white">
          Wallet Balance(USDT)
        </Typography>
        <div className="flex items-start mt-5">
          <Typography className="font-bold text-[16px] font-Mint text-white">
            {formatNumber(value)}
          </Typography>
          <Typography className="font-normal text-[12px] text-white ml-4">
            USDT
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

WalletBalanceCard.propTypes = {
  value: PropTypes.number,
};
export default WalletBalanceCard;
