import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineConnector from '@mui/lab/TimelineConnector';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const Referrals = (props) => {
  return (
    <div className="col-span-4 px-[24px] py-[12px] rounded-[12px] bg-[#F3F9F7]">
      <Typography className="font-semibold text-[42px]" color="primary">
        Referrals
      </Typography>
      <Typography component="p" className="font-normal text-[16px]">
        Invite your audience, friends and family to&nbsp;
        <span className="font-HandelGothic text-success">ZERO</span>
        <span className="font-HandelGothic text-[#64B337]">LOSS</span>.
      </Typography>
      <Typography className="font-normal text-[16px]">
        Earn up to 20% in monthly recurring income.
      </Typography>
      <Timeline
        className="mt-20"
        position="right"
        sx={{
          '& .MuiTimelineItem-root:before': {
            display: 'none',
          },
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot
              color="secondary"
              className="w-32 h-32 p-0  mt-[20px] flex items-center justify-center"
            >
              <CheckOutlinedIcon sx={{ fontSize: 24, color: '#F3F9F7' }} />
            </TimelineDot>
            <TimelineConnector sx={{ backgroundColor: 'secondary.main' }} />
          </TimelineSeparator>

          <TimelineContent className="flex flex-col items-start pb-12">
            <Typography className="font-semibold text-[20px]" color="primary">
              Send Invitation
            </Typography>
            <Typography component="p" className="font-normal text-[16px]">
              Send your referral link to friends and tell them how cool&nbsp;
              <span className="font-HandelGothic text-success">ZERO</span>
              <span className="font-HandelGothic text-[#64B337]">LOSS</span>&nbsp; is!
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot
              color="secondary"
              className="w-32 h-32 p-0  mt-[20px] flex items-center justify-center"
            >
              <CheckOutlinedIcon sx={{ fontSize: 24, color: '#F3F9F7' }} />
            </TimelineDot>
            <TimelineConnector sx={{ backgroundColor: 'secondary.main' }} />
          </TimelineSeparator>

          <TimelineContent className="flex flex-col items-start pb-12">
            <Typography className="font-semibold text-[20px]" color="primary">
              Registration
            </Typography>
            <Typography component="p" className="font-normal text-[16px]">
              Invite your audience, friends, and family to sign up using your referral link.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot
              color="secondary"
              className="w-32 h-32 p-0  mt-[20px] flex items-center justify-center"
            >
              <Typography className="font-bold text-[10px]" color="primary">
                20%
              </Typography>
            </TimelineDot>
          </TimelineSeparator>

          <TimelineContent className="flex flex-col items-start pb-12">
            <Typography className="font-semibold text-[20px]" color="primary">
              Get Commission
            </Typography>
            <Typography component="p" className="font-normal text-[16px]">
              Earn up to{' '}
              <span
                className="font-bold text-[10px] bg-[#41D87B] rounded-full inline-flex items-center justify-center w-[27px] h-[27px]"
                color="primary"
              >
                20%
              </span>{' '}
              in monthly recurring referral incentives, based on the monthly profit.
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
};

export default Referrals;
