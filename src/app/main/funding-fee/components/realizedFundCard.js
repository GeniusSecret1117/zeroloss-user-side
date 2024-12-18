import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { formatNumber } from '@fuse/utils';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

const RealizedFundCard = (props) => {
  const { value } = props;
  return (
    <Paper className="flex w-full justify-between flex-wrap items-center px-[12px] py-[18px] rounded-[12px] bg-[#FF6425] border border-[#03212333] shadow-none ">
      <div className="flex items-center flex-wrap">
        <Paper className="flex rounded-[8px] bg-[#D05624] shadow-none w-[36px] h-[36px] items-center justify-center">
          <TrendingUpOutlinedIcon sx={{ color: '#fff' }} />
        </Paper>
        <div className="ml-[12px]">
          <Typography className="font-semibold text-[16px] text-white">
            Realized Funding profit
          </Typography>
          <Typography className="font-bold text-[24px] font-Mint text-white">
            {formatNumber(value)}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

RealizedFundCard.propTypes = {
  value: PropTypes.number,
};
export default RealizedFundCard;
