import { useState } from "react";
import Typography from "@mui/material/Typography";
import { formatNumber, formatNumberWithOutDecimal } from "@fuse/utils";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import { TableContainer } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
// import { orderdata } from './tempdata';

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "1px solid #C6D9CD", // Dashed border
  borderLeft: "1px solid #C6D9CD", // Dashed border
  borderRight: "1px solid #C6D9CD", // Dashed border
  fontWeight: "700", // Equivalent to 'font-semibold'
  fontSize: "14px",
  padding: theme.spacing(2),
  "& p": {
    fontWeight: "700", // Equivalent to 'font-semibold'
    fontSize: "14px",
  },
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
  padding: theme.spacing(2), // Adjust padding if needed
}));

const OrderHistoryTable = ({ props }) => {
  const orderdata = props || [];
  // const orderdata = useSelector((state) => state.binCap.fundingFee) || [];
  // State to track the current page

  const [page, setPage] = useState(1);
  const itemsPerPage = 25;

  // Calculate the current data to display based on the page
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = orderdata.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination change
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <div className="rounded-[16px] bg-[#F3F9F7] border border-[#03212352] p-24">
        <TableContainer className="border border-[#C6D9CD] rounded-[8px]">
          <Table className="w-full" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <HeaderTableCell
                  sx={{
                    borderLeft: "none",
                  }}
                >
                  Time
                </HeaderTableCell>
                <HeaderTableCell>Assest</HeaderTableCell>
                <HeaderTableCell align="right">Amount</HeaderTableCell>
                <HeaderTableCell
                  align="center"
                  sx={{
                    borderRight: "none",
                  }}
                >
                  Symbol
                </HeaderTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <TableRow key={index}>
                    <BodyTableCell
                      className={clsx(
                        index === currentData.length - 1 && "border-none"
                      )}
                    >
                      <Typography>
                        {new Date(item.time).toLocaleDateString("en-US")}
                      </Typography>
                      <Typography className="small">
                        {new Date(item.time).toLocaleTimeString("en-US")}
                      </Typography>
                    </BodyTableCell>
                    <BodyTableCell
                      className={clsx(
                        index === currentData.length - 1 && "border-none"
                      )}
                    >
                      {item.asset}
                    </BodyTableCell>
                    <BodyTableCell
                      align="right"
                      className={clsx(
                        index === currentData.length - 1 && "border-none"
                      )}
                    >
                      {item.income} USDT
                    </BodyTableCell>
                    <BodyTableCell
                      align="center"
                      className={clsx(
                        index === currentData.length - 1 && "border-none"
                      )}
                    >
                      <Typography>{item.symbol}</Typography>
                      <div className="inline-flex items-center rounded-[2px] px-[8px] bg-[#D7ECE2] text-[#032123] text-[12px]">
                        {item.incomeType}
                      </div>
                    </BodyTableCell>
                  </TableRow>
                ))
              ) : (
                <span>No Data at the time.</span>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-end mt-12 gap-8">
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

export default OrderHistoryTable;
