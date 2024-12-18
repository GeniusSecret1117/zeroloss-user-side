import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { formatNumber } from '@fuse/utils';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';

const FeeCard = (props) => {
  const { value } = props;
  return (
    <Paper className="flex w-full justify-between flex-wrap items-center px-[12px] py-[18px] rounded-[12px] bg-[#E1FAEB] border border-[#03212333] shadow-none ">
      <div className="flex items-center flex-wrap">
        <Paper className="flex rounded-[8px] bg-[#C4F3D6] shadow-none w-[36px] h-[36px] items-center justify-center">
          <RequestQuoteOutlinedIcon color="primary" />
        </Paper>
        <div className="ml-[12px]">
          <Typography className="font-semibold text-[16px]" color="primary">
            Fees
          </Typography>
          <Typography className="font-bold text-[24px] font-Mint" color="primary">
            {formatNumber(value)}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

FeeCard.propTypes = {
  value: PropTypes.number,
};
export default FeeCard;
