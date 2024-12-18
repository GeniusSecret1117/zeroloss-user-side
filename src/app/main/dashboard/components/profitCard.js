import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { formatNumber } from "@fuse/utils";

const ProfitCard = (props) => {
  const { period, value, percentage, time } = props;
  return (
    <Paper className="flex justify-between w-full items-center px-[12px] py-[6px] border border-[#03212333] rounded-[6px] bg-[#E1FAEB] shadow-none ">
      <Paper className="flex rounded-[12px] bg-[#C4F3D6] shadow-none py-[6px] px-[8px]">
        <Typography color="primary" className="font-semibold text-[14px]">
          {period}
        </Typography>
      </Paper>
      <div className="flex flex-col items-end">
        <Typography
          color="primary"
          className="font-medium font-Mint text-[14px]"
        >
          {formatNumber(value)}
        </Typography>
        <Typography color="primary" className="font-bold text-[10px]">
          +{formatNumber(percentage)}%
        </Typography>
      </div>
    </Paper>
  );
};

ProfitCard.propTypes = {
  period: PropTypes.string,
  value: PropTypes.number,
  percentage: PropTypes.number,
};
export default ProfitCard;
