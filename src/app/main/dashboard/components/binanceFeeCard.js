import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { formatNumber } from '@fuse/utils';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const BinanceFeeCard = (props) => {
  const { value } = props;
  return (
    <Paper className="w-full p-[18px] rounded-[12px] border border-[#D0D7D3] shadow-none ">
      <div className="flex items-center gap-8">
        <Paper className="flex rounded-[10px] border border-[#757575] shadow-none p-[4px] bg-transparent">
          <img className="" src="assets/icons/binance.svg" alt="binance" />
        </Paper>
        <Typography className="font-semibold text-[20px] text-[#757575]">Binance Fees</Typography>
        <RemoveRedEyeOutlinedIcon sx={{ color: '#757575' }} />
      </div>
      <div className="flex items-end mt-5">
        <Typography className="font-bold text-[32px] font-Mint" color="text.primary">
          {formatNumber(value)}
        </Typography>
        <Typography className="font-medium text-[14px] ml-8 mb-4" color="text.primary">
          USDT
        </Typography>
      </div>
    </Paper>
  );
};

BinanceFeeCard.propTypes = {
  value: PropTypes.number,
};
export default BinanceFeeCard;
