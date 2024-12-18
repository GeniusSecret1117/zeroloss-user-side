import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { endOfDay, isSameDay, startOfDay, subDays } from "date-fns";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import {
  Typography,
  Paper,
  Input,
  Tabs,
  Tab,
  Popover,
  Button,
} from "@mui/material";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import { enUS } from "date-fns/locale";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import clsx from "clsx";
import { formatDate, formatNumber } from "@fuse/utils";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import TradeHistoryTable from "./components/tradeHistoryTable";
import StyledDateRangePicker from "../../shared-components/StyledDateRangePicker";
import TotalCard from "./components/totalCard";
import FeeCard from "./components/feesCard";
import RealizedProfitCard from "./components/realizedProfitCard";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const ResetButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#D7ECE2",
  borderRadius: 4,
  height: 24,
  minHeight: 24,
}));
const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#41D87B",
  borderRadius: 4,
  height: 24,
  minHeight: 24,
}));

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-toolbar": {},
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));
const ranges = ["Today", "7D", "14D", "1M", "3M", "1Y", "ALL"];

function TradeHistory(props) {
  const { t } = useTranslation("tradeHistoryPage");
  const tradeHistory = useSelector((state) => state.binCap.tradeHistory) || [];
  const [searchText, setSearchText] = useState("");

  const [tabValue, setTabValue] = useState(0);
  const currentRange = Object.keys(ranges)[tabValue];

  let totalAmount = 0;
  let totalFees = 0;
  let totalRealizedProfit = 0;

  tradeHistory.map((item, index) => {
    totalAmount += parseFloat(item.quoteQty);
    totalFees += parseFloat(item.commission);
    totalRealizedProfit += parseFloat(item.realizedPnl);
  });

  const handleSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const [dtStart, setDtStart] = useState();
  const [dtEnd, setDtEnd] = useState();
  const [isStartDate, setIsStartDate] = useState(true);

  const customRanges = [
    {
      label: "Last 30 days",
      range: () => ({
        startDate: startOfDay(subDays(new Date(), 30)),
        endDate: startOfDay(subDays(new Date(), 1)),
        period: 30,
      }),
      isSelected: (range) => {
        const definedRange = customRanges[0].range(); // Assuming 'index' is defined in the scope where this function is used
        return (
          isSameDay(range.startDate, definedRange.startDate) &&
          isSameDay(range.endDate, definedRange.endDate)
        );
      },
    },
    {
      label: "Last 90 days",
      range: () => ({
        startDate: startOfDay(subDays(new Date(), 90)),
        endDate: startOfDay(subDays(new Date(), 1)),
        period: 90,
      }),
      isSelected: (range) => {
        const definedRange = customRanges[1].range(); // Assuming 'index' is defined in the scope where this function is used
        return (
          isSameDay(range.startDate, definedRange.startDate) &&
          isSameDay(range.endDate, definedRange.endDate)
        );
      },
    },
    {
      label: "Last 180 days",
      range: () => ({
        startDate: startOfDay(subDays(new Date(), 180)),
        endDate: startOfDay(subDays(new Date(), 1)),
        period: 180,
      }),
      isSelected: (range) => {
        const definedRange = customRanges[2].range(); // Assuming 'index' is defined in the scope where this function is used
        return (
          isSameDay(range.startDate, definedRange.startDate) &&
          isSameDay(range.endDate, definedRange.endDate)
        );
      },
    },
    {
      label: "All time",
      range: () => ({
        startDate: new Date(2022, 0, 1),
        endDate: endOfDay(subDays(new Date(), 1)),
        period: 0,
      }),
      isSelected: (range) => {
        const definedRange = customRanges[3].range(); // Assuming 'index' is defined in the scope where this function is used
        return (
          isSameDay(range.startDate, definedRange.startDate) &&
          isSameDay(range.endDate, definedRange.endDate)
        );
      },
    },
  ];

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

  enUS.localize.month = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber);
    return date.toLocaleString("en-US", { month: "long" });
  };

  enUS.localize.day = (dayNumber) => "SMTWTFS"[dayNumber];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleReset = () => {
    setSearchText("");
    setDtStart(undefined);
    setDtEnd(undefined);
  };

  return (
    <Root
      content={
        <div className="w-full container p-12">
          <div className="flex items-center mt-[20px]">
            <WatchLaterOutlinedIcon className="text-[40px] text-[#032123]" />
            <Typography
              className="font-semibold text-[40px] ml-8"
              color="primary"
            >
              Your Trade History
            </Typography>
          </div>
          <div className="flex justify-between mt-[20px] items-center flex-wrap gap-8">
            <Paper className="flex p-4 items-center w-full px-16 py-4 border-1 h-40 rounded-[8px] bg-[#F0FEF7] shadow-none max-w-[270px]">
              <FuseSvgIcon size={20}>heroicons-solid:search</FuseSvgIcon>
              <Input
                placeholder="Search here"
                className="flex flex-1 px-8"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  "aria-label": "Search",
                }}
                sx={{
                  "& input::placeholder": {
                    color: "#032123",
                    opacity: 1,
                  },
                }}
                onChange={handleSearchText}
              />
            </Paper>
            <div className="flex gap-8 flex-wrap">
              <Tabs
                value={tabValue}
                onChange={(ev, value) => setTabValue(value)}
                indicatorColor="secondary"
                textColor="inherit"
                variant="scrollable"
                scrollButtons={false}
                className="-mx-4 min-h-[32px]"
                classes={{
                  indicator:
                    "flex justify-center items-center bg-transparent w-full h-full",
                }}
              >
                {Object.entries(ranges).map(([key, label]) => (
                  <Tab
                    className={clsx(
                      "text-[16px] font-medium w-auto px-12 opacity-100 min-h-[32px] max-h-[32px] min-w-48",
                      currentRange === key
                        ? "text-white bg-[#0C4547] rounded-[8px]"
                        : "text-[#032123]"
                    )}
                    disableRipple
                    key={key}
                    label={label}
                  />
                ))}
              </Tabs>
              <div className="flex gap-8 items-center">
                <Typography className="text-[14px] text-[#757575] font-medium">
                  Date
                </Typography>
                <Paper
                  aria-describedby={id}
                  onClick={handleClick}
                  className="flex items-center border-1 border-[#1E6569] h-[24px] rounded-[4px] px-8 justify-between bg-[#D7ECE2] shadow-none w-[230px] cursor-pointer"
                >
                  <Typography
                    className="text-[14px] font-medium"
                    color="success"
                  >
                    {formatDate(dtStart)}
                  </Typography>
                  <EastOutlinedIcon className="text-[8px]" />
                  <Typography
                    className="text-[14px] font-medium"
                    color="success"
                  >
                    {formatDate(dtEnd)}
                  </Typography>
                  <CalendarMonthOutlinedIcon className="text-[10px]" />
                </Paper>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <StyledDateRangePicker
                    className=""
                    onChange={handleOnChange}
                    showSelectionPreview
                    ranges={[
                      {
                        startDate: dtStart,
                        endDate: dtEnd,
                        key: "selection",
                      },
                    ]}
                    staticRanges={customRanges}
                    months={2}
                    direction="horizontal"
                    locale={enUS}
                  />
                </Popover>
              </div>
              <div className="flex gap-8 items-center">
                <ResetButton onClick={handleReset}>Reset</ResetButton>
                <SearchButton>Search</SearchButton>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-[24px]">
            <TotalCard value={formatNumber(Number(totalAmount))} />
            <FeeCard value={formatNumber(Number(totalFees))} />
            <RealizedProfitCard
              value={formatNumber(Number(totalRealizedProfit))}
            />
          </div>
          <div className="mt-[24px]">
            <TradeHistoryTable props={tradeHistory} />
          </div>
        </div>
      }
      scroll="content"
    />
  );
}

export default TradeHistory;
