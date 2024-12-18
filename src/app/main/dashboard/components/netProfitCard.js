import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { formatNumber } from '@fuse/utils';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const NetProfitCard = (props) => {
  const { value } = props;
  return (
    <Paper className="w-full p-[18px] rounded-[12px] bg-[#083A3C] border border-[#D0D7D3] shadow-none ">
      <div className="flex items-center gap-8">
        <Paper className="flex rounded-[10px] border border-[#D3DBDB] shadow-none p-[4px] bg-transparent">
          <AccountBalanceWalletOutlinedIcon sx={{ color: '#D3DBDB' }} />
        </Paper>
        <Typography className="font-semibold text-[20px] text-[#D3DBDB]">
          Net Profit
        </Typography>
        <RemoveRedEyeOutlinedIcon sx={{ color: '#D3DBDB' }} />
      </div>
      <div className="flex items-end mt-5">
        <Typography className="font-bold text-[32px] font-Mint" color="secondary">
          {formatNumber(value)}
        </Typography>
        <Typography className="font-medium text-[14px] text-[#D8E5DF] ml-8 mb-4">
          USDT
        </Typography>
      </div>
    </Paper>
  );
};

NetProfitCard.propTypes = {
  value: PropTypes.number,
};
export default NetProfitCard;
