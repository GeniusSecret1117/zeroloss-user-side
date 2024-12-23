import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { formatNumber } from "@fuse/utils";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { LiaFacebookMessenger } from "react-icons/lia";
import { RiDownloadLine } from "react-icons/ri";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useSelector } from "react-redux";
import BinService from "../../../../app/auth/services/binanceService/binService";

const ShareIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  width: "32px",
  height: "32px",
  boxShadow: "4px 4px 4px 0px #00000040",
  "&:hover": {
    backgroundColor: "#1E6569",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#DAF0F0",
  width: 30,
  height: 30,
  minWidth: 30, // Ensure the button stays square
  minHeight: 30,
}));

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 720 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 720, min: 0 },
    items: 1,
  },
};
const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className="mt-12 flex justify-end">
      <StyledButton
        variant="contained"
        disabled={currentSlide === 0}
        onClick={() => previous()}
      >
        <KeyboardArrowLeftOutlinedIcon />
      </StyledButton>
      <StyledButton variant="contained" onClick={() => next()} className="ml-8">
        <ChevronRightOutlinedIcon />
      </StyledButton>
    </div>
  );
};
const ProfitCarousel = (props) => {
  const userId = useSelector((state) => state.user.userId);
  const incomeByRange =
  useSelector((state) => state.binCap.incomeByRange) || [];

  const [profitData,setProfitData] = useState([]);
  const [dtStart,setDtStart] = useState(0);
  const [dtEnd,setDtEnd] = useState(0);
  const [dailyAveragesDatas, setDailyAveragesDatas] = useState([]);


  useEffect(() => {
    const startTime = new Date(new Date().getFullYear(), 0, 1).getTime();
    const endTime = new Date().getTime();
   
     getProfitData(startTime,endTime);
  },[]);

  const getProfitData = async (star ,end) =>{  
    
   
    
    const startTime = new Date(star).getTime();
    const endTime = new Date(end).getTime();

    console.log(">>>>>>>>>>>>>>",startTime ,endTime);
    const dailyIncome = {};  // Initialize the object

    await BinService.fetchProfitByPeriod(startTime, endTime)
    .then((response) => {
      console.log(response.profit);
        const monthlyProfit = {};
        response.profit.forEach(entry => {
            const date = new Date(entry.time);
            const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
            const profit = parseFloat(entry.income);
    
            if (!monthlyProfit[monthYear]) {
                monthlyProfit[monthYear] = 0;
            }
            monthlyProfit[monthYear] += profit;
        });
    
        console.log('>>>>>>>>>>>>>>>>>',monthlyProfit);
        
        // Calculate average income for each day
        // const dailyAverages = Object.entries(dailyIncome).map(([date, incomes]) => {
        //     const total = incomes.reduce((sum, value) => sum + value, 0);
        //     const average = total / incomes.length;
        //     return { date, averageIncome: parseFloat(average.toFixed(8)) };
        // });
        // console.log("ksdksdkskksdkd",dailyAverages);
        
        // setDailyAveragesDatas(dailyAverages);
    })
    .catch((err) => {
        console.error('Error fetching profit by period:', err);
    });

  }
  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    
    if (selection.period > 0) {
      setIsStartDate(true);
      setDtStart(selection.startDate);
      setDtEnd(selection.endDate);
      return;
    }

    const currentDay = new Date();

    if (
      selection.startDate &&
      selection.endDate &&
      (selection.startDate.getTime() !== selection.endDate.getTime() ||
        !isStartDate)
    ) {
      setDtStart(selection.startDate);
      setDtEnd(selection.endDate);
    } else {
      setDtStart(selection.startDate);
      setDtEnd(selection.endDate);
    }
    setIsStartDate((prev) => !prev);
  };
  const generatePastWeekDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);  // Format: YYYY-MM-DD
    }
    return dates;
  };
  
  // Fill in missing days with empty placeholders
  const fillMissingDays = (dailyAveragesDatas) => {
    const pastWeekDates = generatePastWeekDates();
    const filledData = pastWeekDates.map(date => {
      const existing = dailyAveragesDatas.find(item => item.date === date);
      return existing || { date, averageIncome: 0, percentage: 0 };  // Default empty data
    });
  
    return filledData;
  };
  
  // Fill data if necessary
  const filledDailyData = fillMissingDays(dailyAveragesDatas);
  
  // Render ProfitCards for each day
  const renderProfitCards = () => {
    return filledDailyData.map((data, index) => (
      <ProfitCard
        key={index}
        userId={userId}
        period={data.date || "N/A"}
        value={data.averageIncome || 0}
        percentage={data.percentage || 0}
        time={data.date || "N/A"}
      />
    ));
  };
  

  return (
    <div className="w-full mt-[32px]">
      <Carousel
        responsive={responsive}
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
      {renderProfitCards()}
      </Carousel>
    </div>
  );
};

const ProfitCard = (props) => {
  const { userId, period, value, percentage, time } = props;
  // console.log("time ", time);
  // console.log(
  //   "time ",
  //   new Date(time).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //   }) || 0
  // );
  return (
    <Paper className="w-full items-center p-[12px] border border-[#C4F3D6] rounded-[12px] bg-[#083A3C] shadow-none ">
      <div className="flex justify-between">
        <div className="bg-[#C4F3D633] rounded-[8px] border border-[#7575754D] p-[6px] flex items-center">
          <img
            className="w-[32px] h-[32px]"
            src="assets/images/logo.png"
            alt="logo"
          />
          <Typography className="font-normal text-white ml-[6px] text-[16px]">
            Zeroloss id :
          </Typography>
          <Typography className="font-bold text-white ml-[6px] text-[16px]">
            {userId || 0}
          </Typography>
        </div>
        <img
          className="w-[48px] h-[48px]"
          src="assets/images/logo.png"
          alt="logo"
        />
      </div>
      <div className="mt-[32px] flex items-center">
        <Typography className="font-normal text-white ml-[6px] text-[16px]">
          Date :
        </Typography>
        <Typography className="font-bold text-white ml-[6px] text-[16px]">
          {new Date(time).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }) || 0}
        </Typography>
      </div>
      <div className="mt-[12px] ">
        <Typography className="font-normal text-white ml-[6px] text-[16px]">
          Your Profit
        </Typography>
        <div className="flex items-start justify-between">
          <Typography className="font-Mint font-bold text-[32px] text-white">
            ${formatNumber(value || 0)}
          </Typography>
          <div className="bg-[#41D87B4D] rounded-[12px] border border-[#C4F3D64D] p-[6px] flex items-center">
            <Typography
              className="font-medium text-[12px] text-[#41D87B]"
              color="secondary"
            >
              {formatNumber(percentage || 0)}
            </Typography>
            <TrendingUpOutlinedIcon
              className="ml-8"
              sx={{ color: "#41D87B", fontSize: 14 }}
            />
          </div>
        </div>
      </div>
      <div className="mt-[12px] flex">
        <Typography className="font-normal text-white text-[16px]">
          Exchange :
        </Typography>
        <img
          className="ml-[6px]"
          src="assets/images/icons/binance.svg"
          alt="binance"
        />
        <Typography className="font-bold text-[#F3BA2F] ml-[6px] text-[16px]">
          Binance
        </Typography>
      </div>
      <div className="mt-[12px] flex justify-between">
        <Typography className="font-bold text-white text-[16px]">
          Share Now
        </Typography>
        <div className="flex flex-wrap">
          <ShareIconButton>
            <ShareOutlinedIcon sx={{ fontSize: 20, color: "#032123" }} />
          </ShareIconButton>
          <ShareIconButton className="ml-6">
            <FaWhatsapp className="text-[20px] text-[#032123]" />
          </ShareIconButton>
          <ShareIconButton className="ml-6">
            <PiTelegramLogo className="text-[20px] text-[#032123]" />
          </ShareIconButton>
          <ShareIconButton className="ml-6">
            <FaInstagram className="text-[20px] text-[#032123]" />
          </ShareIconButton>
          <ShareIconButton className="ml-6">
            <LiaFacebookMessenger className="text-[24px] text-[#032123]" />
          </ShareIconButton>
          <ShareIconButton className="ml-6">
            <RiDownloadLine className="text-[20px] text-[#032123]" />
          </ShareIconButton>
        </div>
      </div>
    </Paper>
  );
};

export default ProfitCarousel;
