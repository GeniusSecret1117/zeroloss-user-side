import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { formatNumber } from '@fuse/utils';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { TableContainer } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { orderdata } from './tempdata';

const BodyTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: '1px dashed #75757540', // Dashed border
  padding: theme.spacing(1.5), // Adjust padding if needed
}));
const EntryLabel = styled(Typography)({
  fontWeight: 500, // Equivalent to font-medium
  fontSize: '12px',
  color: '#697576',
});

// Create a styled Typography component for the value (0.42712300 USDT)
const EntryValue = styled(Typography)(({ theme }) => ({
  fontWeight: 500, // Equivalent to font-medium
  fontSize: '14px',
  color: theme.palette.text.primary, // Uses theme's primary text color
}));

const PositionHistoryTable = () => {
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
      <TableContainer>
        <Table className="w-full" sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow>
              <BodyTableCell>
                <div className="flex flex-col gap-8">
                  <Typography className="font-medium text-[16px]">MATICUSDT</Typography>
                  <div className="flex gap-8 items-center">
                    <div className="inline-flex items-center rounded-[6px] px-[8px] py-[4px]  bg-[#D7ECE2] text-[#032123] text-[14px] font-medium">
                      Perp
                    </div>
                    <div className="inline-flex items-center rounded-[6px] px-[8px] py-[4px] bg-[#FF143EE5] text-[#EBFBF3] text-[14px] font-medium w-max">
                      Cross Short
                    </div>
                  </div>
                  <Typography className="font-medium text-[14px]">Closed</Typography>
                </div>
              </BodyTableCell>
              <BodyTableCell>
                <div className="flex flex-wrap gap-x-[48px] gap-y-[16px]">
                  <div className="flex flex-col gap-8">
                    <Typography className="font-medium text-[12px] text-[#697576]">Closing PNL</Typography>
                    <Typography className="font-bold text-[18px] text-[#0C4547] font-Mint">+ 88.93 USDT</Typography>
                  </div>
                  <div className="flex flex-col gap-8">
                    <EntryLabel>Entry Price</EntryLabel>
                    <EntryValue>0.42712300 USDT</EntryValue>
                  </div>
                  <div className="flex flex-col gap-8">
                    <EntryLabel>Avg, Close price</EntryLabel>
                    <EntryValue>0.42712300 USDT</EntryValue>
                  </div>
                  <div className="flex flex-col gap-8">
                    <EntryLabel>Max Open Internet</EntryLabel>
                    <EntryValue>1,786 MATIC</EntryValue>
                  </div>
                  <div className="flex flex-col gap-8">
                    <EntryLabel>Closed Vol.</EntryLabel>
                    <EntryValue>1,786 MATIC</EntryValue>
                  </div>
                  <div className="flex flex-col gap-8">
                    <EntryLabel>Opened</EntryLabel>
                    <EntryValue>08/09/2024 07:45:58</EntryValue>
                  </div>
                  <div className="flex flex-col gap-8">
                    <EntryLabel>Closed</EntryLabel>
                    <EntryValue>08/09/2024 10:22:35</EntryValue>
                  </div>
                </div>
              </BodyTableCell>
            </TableRow>
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
  );
};

export default PositionHistoryTable;
