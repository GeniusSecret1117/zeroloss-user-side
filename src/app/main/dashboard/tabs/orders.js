import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import Typography from "@mui/material/Typography";
import { formatNumber } from "@fuse/utils";
import styled from "@emotion/styled";
import OrdersTable from "../components/ordersTable";

const HeaderTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "16px",
  fontWeight: "400",
}));

const OrdersTab = () => {
  const position = useSelector((state) => state.binCap.position) || [];
  const allOpenOrders =
    useSelector((state) => state.binCap.allOpenOrders) || [];
  let totalPositionAmt = 0;
  let totalOrderValue = 0;
  let totalProfitValue = 0;
  //sum of open position amount - position
  totalPositionAmt = position.reduce(
    (sum, item) => sum + parseFloat(item.positionAmt),
    0
  );
  //sum of profit value - position
  totalProfitValue = position.reduce(
    (sum, item) => sum + parseFloat(item.unRealizedProfit),
    0
  );
  console.log("total ProfitValue amt : ", totalProfitValue);
  //sum of order value - allOpenOrders
  totalOrderValue = allOpenOrders.reduce(
    (total, item) => total + parseFloat(item.origQty) * parseFloat(item.price),
    0
  );
  console.log("Total Order Value: item", allOpenOrders);

  return (
    <div className="mt-[20px] p-16 w-full">
      <div className="flex items-center">
        <img className="w-[40px]" src="assets/icons/order.png" alt="order" />
        <Typography className="font-semibold text-[40px] ml-8" color="primary">
          Open Orders
        </Typography>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-[40px]">
        <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#DCE0DD] rounded-[12px] p-[12px] gap-[12px] bg-[#F3F9F7]">
          <div>
            <HeaderTitle>Sum of Open Positions</HeaderTitle>
            <div className="border border-[#C4F3D6] rounded-[6px] p-8 mt-[6px] text-center">
              <Typography
                color="success"
                className="font-semibold text-[24px] font-Mint"
              >
                {formatNumber(totalPositionAmt)}
              </Typography>
            </div>
          </div>
          <div>
            <HeaderTitle>Profit Value</HeaderTitle>
            <div className="border border-[#C4F3D6] rounded-[6px] p-8 mt-[6px] bg-[#083A3C] text-center">
              <Typography
                color="secondary"
                className="font-semibold text-[24px] font-Mint"
              >
                {formatNumber(totalProfitValue)}
              </Typography>
            </div>
          </div>
          <div>
            <HeaderTitle>Total Order Value</HeaderTitle>
            <div className="border border-[#C4F3D6] rounded-[6px] p-8 mt-[6px] text-center">
              <Typography
                color="success"
                className="font-semibold text-[24px] font-Mint"
              >
                {formatNumber(totalOrderValue)}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[24px]">
        <OrdersTable />
      </div>
    </div>
  );
};

export default OrdersTab;
