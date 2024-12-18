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

const tempdata = [
  {
    month: 'Jan',
    amount: 1000,
    profit: 10,
  },
  {
    month: 'Feb',
    amount: 1500,
    profit: -15,
  },
  {
    month: 'Mar',
    amount: 2000,
    profit: 20,
  },
  {
    month: 'Apr',
    amount: 2500,
    profit: -25,
  },
  {
    month: 'May',
    amount: 3000,
    profit: 30,
  },
];

const BottomTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: '600', // Equivalent to 'font-semibold'
  fontSize: '16px',
  borderBottom: '1px dashed #75757533', // Dashed border
  padding: theme.spacing(1), // Adjust padding if needed
}));

const ProfitTable = (props) => {
  return (
    <div className="col-span-1 border border-[#C4F3D6] rounded-[12px] bg-[#F3F9F7] p-[16px]">
      <Table className="w-full min-w-full">
        <TableHead>
          <TableRow>
            <BottomTableCell>Month</BottomTableCell>
            <BottomTableCell align="right">Amount</BottomTableCell>
            <BottomTableCell align="center">Profit %</BottomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tempdata.map((item, index) => (
            <TableRow key={index}>
              <BottomTableCell className="font-normal">{item.month}</BottomTableCell>
              <BottomTableCell align="right" className="font-Mint">
                ${formatNumber(item.amount)}
              </BottomTableCell>
              <BottomTableCell align="center" className="font-bold">
                <div
                  className={clsx(
                    'inline-flex items-center rounded-[6px] px-[8px]',
                    item.profit > 0 ? 'bg-[#53C07D33]' : 'bg-[#FF143E33]'
                  )}
                >
                  {item.profit}%
                </div>
              </BottomTableCell>
            </TableRow>
          ))}
          <TableRow
            sx={{
              '& .MuiTableCell-root': {
                borderBottom: 'none', // To prevent the border between the cells
              },
            }}
          >
            <TableCell
              className="font-normal"
              sx={{
                backgroundColor: '#C4F3D6',
                borderRadius: '12px 0 0 12px',
              }}
            >
              Total
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: '#C4F3D6',
              }}
              align="right"
              className="font-Mint"
            >
              ${formatNumber(100325.36)}
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: '#C4F3D6',
                borderRadius: '0 12px 12px 0',
              }}
              align="center"
              className="font-bold"
            >
              {12.42}%
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ProfitTable;
