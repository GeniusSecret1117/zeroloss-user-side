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
import { positiondata } from "./tempdata";
import { useSelector } from "react-redux";

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "500", // Equivalent to 'font-semibold'
  fontSize: "14px",
  color: "#EBFBF3",
  borderBottom: "1px solid #686C6C", // Dashed border
  padding: theme.spacing(2), // Adjust padding if needed
}));
const BodyTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "500", // Equivalent to 'font-semibold'
  fontSize: "12px",
  color: "#D2DADA",
  borderBottom: "1px solid #1C1E1E", // Dashed border
  padding: theme.spacing(0.5), // Adjust padding if needed
}));

const PositionsTable = () => {
  const position = useSelector((state) => state.binCap.position);

  // const currentData = position
  // State to track the current page
  const [page, setPage] = useState(1);
  const itemsPerPage = 25;

  // Calculate the current data to display based on the page
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = position.slice(indexOfFirstItem, indexOfLastItem);
  // const currentData = positiondata.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination change
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <div className="rounded-[12px] bg-[#040B0C]">
        <TableContainer>
          <Table className="w-full" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <HeaderTableCell>Symbol</HeaderTableCell>
                <HeaderTableCell align="right">Size</HeaderTableCell>
                <HeaderTableCell align="right">Entry Price</HeaderTableCell>
                <HeaderTableCell align="right">Break Even</HeaderTableCell>
                <HeaderTableCell align="right">Mark Price</HeaderTableCell>
                <HeaderTableCell align="right">Margin</HeaderTableCell>
                <HeaderTableCell align="right">PNL(ROI %)</HeaderTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((row, index) => (
                <TableRow key={index}>
                  <BodyTableCell
                    className={clsx(
                      "pl-8",
                      index === currentData.length - 1 && "border-none"
                    )}
                  >
                    <div className="border-l-2 border-l-[#41D87B] pl-8 py-4">
                      <Typography className="font-bold">
                        {row.symbol}
                      </Typography>
                      <div className="flex flex-wrap gap-4">
                        <div className="inline-flex items-center rounded-[2px] px-[8px] bg-[#D7ECE2] text-[#032123]">
                          {row.marginType}
                        </div>
                        <div className="inline-flex items-center rounded-[2px] px-[8px] bg-[#D7ECE2] text-[#032123]">
                          {row.leverage}
                        </div>
                      </div>
                    </div>
                  </BodyTableCell>
                  <BodyTableCell
                    align="right"
                    className={clsx(
                      index === currentData.length - 1 && "border-none"
                    )}
                  >
                    <Typography className="font-bold text-[#41D87B]">
                      {row.positionAmt}
                    </Typography>
                    <Typography className="text-[#41D87B]">
                      {row.symbol}
                    </Typography>
                  </BodyTableCell>
                  <BodyTableCell
                    align="right"
                    className={clsx(
                      index === currentData.length - 1 && "border-none"
                    )}
                  >
                    {row.entryPrice}
                  </BodyTableCell>
                  <BodyTableCell
                    align="right"
                    className={clsx(
                      index === currentData.length - 1 && "border-none"
                    )}
                  >
                    {row.breakEvenPrice}
                  </BodyTableCell>
                  <BodyTableCell
                    align="right"
                    className={clsx(
                      index === currentData.length - 1 && "border-none"
                    )}
                  >
                    {row.markPrice}
                  </BodyTableCell>
                  <BodyTableCell
                    align="right"
                    className={clsx(
                      index === currentData.length - 1 && "border-none"
                    )}
                  >
                    <Typography className="font-bold">
                      {row.isolatedMargin}
                    </Typography>
                    <Typography className="text-[#41D87B]">
                      {row.status}
                    </Typography>
                  </BodyTableCell>
                  <BodyTableCell
                    align="right"
                    className={clsx(
                      "pr-12",
                      index === currentData.length - 1 && "border-none"
                    )}
                  >
                    <Typography className="font-bold text-[#41D87B]">
                      {row.unRealizedProfit}
                    </Typography>
                    <Typography className="text-[#41D87B]">
                      {row.roi}89
                    </Typography>
                  </BodyTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="flex justify-end mt-12">
        <Pagination
          count={Math.ceil(positiondata.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="secondary"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default PositionsTable;
