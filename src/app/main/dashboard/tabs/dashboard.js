import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import Typography from "@mui/material/Typography";
import { formatNumberWithDecimal } from "@fuse/utils";
import ProfitCard from "../components/profitCard";
import WalletBalanceCard from "../components/walletBalanceCard";
import UnrealizedCard from "../components/unrealizedCard";
import MarginBalanceCard from "../components/marginBalanceCard";
import ProfitCarousel from "../components/profitCarousel";
import ProfitChart from "../components/profitChart";
import ProfitTable from "../components/profitTable";

// const profitData = [
//   { period: "7D", value: 2149350, percentage: 10 },
//   { period: "14D", value: 2149350, percentage: 10 },
//   { period: "1M", value: 2149350, percentage: 10 },
//   { period: "3M", value: 2149350, percentage: 10 },
//   { period: "1Y", value: 2149350, percentage: 10 },
//   { period: "ALL", value: 2149350, percentage: 10 },
// ];
const DashboardTab = () => {
  const user = useSelector((state) => state.user);
  const balance = useSelector((state) => state.binCap.balance);

  const profitData = useSelector((state) => state.binCap.incomeByRange) ?? [];
  let todayProfit = 0;
  if (profitData.length > 0) {
    todayProfit = profitData.find((item) => item.period === "1D")?.value || 0;
  }
  

  return (
    <div className="mt-[20px] p-16">
      <Typography className="font-semibold text-[32px]" color="primary">
        Good Morning, {user.data.displayName ?? "Guest"}
      </Typography>
      <Typography color="primary">Welcome to Zeroloss Dashboard </Typography>
      <div className="mt-[32px] grid grid-cols-1 md:grid-cols-2 gap-x-16">
        <div>
          <Typography className="font-medium text-[14px]">
            Today Profit
          </Typography>
          <div className="flex items-end gap-x-2">
            <Typography
              className="font-Mint text-[30px] pb-[8px]"
              color="primary"
            >
              $
            </Typography>
            <Typography
              className="font-Mint text-[60px] font-semibold"
              color="primary"
            >
              {formatNumberWithDecimal(todayProfit).integer}
            </Typography>
            <Typography
              className="font-Mint text-[30px] pb-[8px]"
              color="primary"
            >
              .{formatNumberWithDecimal(todayProfit).decimal}
            </Typography>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {profitData.map((item, index) => (
            <ProfitCard key={index} {...item} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-[42px]">
        <WalletBalanceCard value={parseFloat(balance?.walletBalance) || 0} />
        <UnrealizedCard value={parseFloat(balance?.unrealizedPNL) || 0} />
        <MarginBalanceCard value={parseFloat(balance?.marginBalance) || 0} />
      </div>
      <div className="flex mt-[40px] flex-wrap">
        <Typography component="h2" className="font-semibold text-[40px]">
          Your 7 Days Profit using&nbsp;
          <span className="font-HandelGothic font-medium text-success">
            ZERO
          </span>
          <span className="font-HandelGothic font-medium text-[#64B337]">
            LOSS
          </span>
        </Typography>
      </div>
      <ProfitCarousel />
      <div className="mt-[32px] grid grid-cols-1 md:grid-cols-3 gap-[16px]">
        <ProfitChart />
        <ProfitTable />
      </div>
    </div>
  );
};

export default DashboardTab;
