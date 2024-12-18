import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { formatNumber } from '@fuse/utils';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

const MarginBalanceCard = (props) => {
  const { value } = props;
  return (
    <Paper className="flex w-full items-center p-[12px] rounded-[12px] bg-[#FF6425] shadow-none ">
      <Paper className="flex rounded-[8px] bg-[#D05624] shadow-none p-[4px]">
        <TrendingUpOutlinedIcon sx={{ color: 'white' }} />
      </Paper>
      <div className="ml-[12px]">
        <Typography className="font-semibold text-[12px] text-white">
          Margin Balance
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

MarginBalanceCard.propTypes = {
  value: PropTypes.number,
};
export default MarginBalanceCard;
