import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { formatNumber } from "@fuse/utils";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import { TableContainer } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { orderdata } from "./tempdata";
import { useSelector } from "react-redux";

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "500", // Equivalent to 'font-semibold'
  fontSize: "14px",
  backgroundColor: "#B5E4E5",
  borderBottom: "none", // Dashed border
  padding: theme.spacing(2), // Adjust padding if needed
}));
const BodyTableCell = styled(TableCell)(({ theme }) => ({
  "& p": {
    fontWeight: "500", // Equivalent to 'font-semibold'
    fontSize: "14px",
  },
  "& p.small": {
    fontSize: "12px",
  },
  fontWeight: "500", // Equivalent to 'font-semibold'
  fontSize: "14px",
  borderBottom: "1px dashed #75757540", // Dashed border
  padding: theme.spacing(1.5), // Adjust padding if needed
}));

const OrdersTable = () => {
  const openOrders = useSelector((state) => state.binCap.openOrders) || [];
  // State to track the current page
  const [page, setPage] = useState(1);
  const itemsPerPage = 25;

  // Calculate the current data to display based on the page
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentData = orderdata.slice(indexOfFirstItem, indexOfLastItem);
  const currentData = openOrders.slice(indexOfFirstItem, indexOfLastItem);
  // Handle pagination change
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <div className="rounded-[16px] bg-[#F3F9F7] p-12">
        <TableContainer>
          <Table className="w-full" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <HeaderTableCell
                  sx={{
                    borderRadius: "16px 0 0 16px",
                  }}
                >
                  Date
                </HeaderTableCell>
                <HeaderTableCell align="left">Symbol</HeaderTableCell>
                <HeaderTableCell align="center">Type</HeaderTableCell>
                <HeaderTableCell align="center">Side</HeaderTableCell>
                <HeaderTableCell align="right">Price</HeaderTableCell>
                <HeaderTableCell align="center">Quantity</HeaderTableCell>
                <HeaderTableCell align="center">Order Value</HeaderTableCell>
                <HeaderTableCell
                  align="right"
                  sx={{
                    borderRadius: "0 16px 16px 0",
                  }}
                >
                  Filled
                </HeaderTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <TableRow key={index}>
                    <BodyTableCell className="pl-12">
                      <Typography>
                        {new Date(item.time).toLocaleDateString("en-US")}
                      </Typography>
                      <Typography className="small">
                        {new Date(item.time).toLocaleTimeString("en-US")}
                      </Typography>
                    </BodyTableCell>
                    <BodyTableCell>
                      <Typography>{item.symbol}</Typography>
                      <div className="inline-flex items-center rounded-[2px] px-[8px] bg-[#D7ECE2] text-[#032123] text-[12px]">
                        {item.type}
                      </div>
                    </BodyTableCell>
                    <BodyTableCell align="center">{item.side}</BodyTableCell>
                    <BodyTableCell align="center">
                      <div
                        className={clsx(
                          "inline-flex min-w-[96px] justify-center items-center border rounded-[6px] p-[8px] ",
                          item.side !== "BUY"
                            ? "border-[#F9BAC6]  bg-[#F9BAC633] text-[#FF143E]"
                            : "border-[#C4F3D6]  bg-[#C4F3D633] text-[#41D87B]"
                        )}
                      >
                        {item.side}
                      </div>
                    </BodyTableCell>
                    <BodyTableCell align="right">{item.price}</BodyTableCell>
                    <BodyTableCell align="right">
                      <Typography>{item.origQty}</Typography>
                      <Typography className="text-[12px] font-normal small">
                        XTX
                      </Typography>
                    </BodyTableCell>
                    <BodyTableCell align="center">
                      <div className="inline-flex min-w-[96px] justify-center items-center rounded-[6px] p-[8px] bg-[#083A3C] text-white">
                        {formatNumber(item.price * item.origQty)}
                      </div>
                    </BodyTableCell>
                    <BodyTableCell align="right" className="pr-12">
                      <Typography>{item.executedQty}</Typography>
                      <Typography className="text-[12px] font-normal small">
                        XTX
                      </Typography>
                    </BodyTableCell>
                  </TableRow>
                ))
              ) : (
                <span>No Data at the time</span>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-end mt-12">
          <Pagination
            count={Math.ceil(orderdata.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="secondary"
            shape="rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
