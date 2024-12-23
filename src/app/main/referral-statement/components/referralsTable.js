import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
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
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { RxCaretSort } from 'react-icons/rx';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import Button from '@mui/material/Button';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Calendar } from 'react-date-range';
import { enUS } from 'date-fns/locale';
import Popover from '@mui/material/Popover';
import { referraldata } from './tempdata';

const CustomLink = styled(Link)(({ theme }) => ({
  background: 'none !important',
  border: 'none !important',
  textDecoration: 'underline !important',
  whiteSpace: 'normal',  // Allow text to wrap
  wordBreak: 'break-word',  // Break long words
  display: 'inline-block',  // Ensure the link behaves like block content for wrapping
  overflow: 'visible',
}));

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: '700', // Equivalent to 'font-semibold'
  fontSize: '12px',
  borderBottom: '1px solid #C6D9CD', // Dashed border
  borderLeft: '1px solid #C6D9CD', // Dashed border
  borderRight: '1px solid #C6D9CD', // Dashed border
  padding: theme.spacing(2),
  '& p': {
    fontWeight: '700', // Equivalent to 'font-semibold'
    fontSize: '14px',
  },
}));
const BodyTableCell = styled(TableCell)(({ theme }) => ({
  '& p': {
    fontWeight: '400', // Equivalent to 'font-semibold'
    fontSize: '14px',
  },
  '& p.number': {
    fontWeight: '600',
    fontFamily: "'Mint', sans-serif",
  },
  borderBottom: '1px dashed #75757540', // Dashed border
  padding: theme.spacing(2), // Adjust padding if needed
}));

const ReferralsTable = () => {
  // State to track the current page
  const [searchText, setSearchText] = useState('');
  const [date, setDate] = useState(new Date());

  const [status, setStatus] = useState('');

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const [page, setPage] = useState(1);

  const itemsPerPage = 10;
  const totalItems = referraldata.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = referraldata.slice(indexOfFirstItem, indexOfLastItem);

  // Handle previous button
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Handle next button
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const handleDateSelect = (date) => {
    setDate(date);
  };
  const handleSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <div className="rounded-[16px] bg-[#F3F9F7] border border-[#03212352] p-24">
        <div className="flex justify-between mb-[12px] gap-8">
          <Paper className="flex p-4 items-center w-full px-16 py-4 border border-[#75757566] h-40 rounded-[8px] bg-transparent shadow-none max-w-[285px]">
            <FuseSvgIcon size={20} className="text-[#75757599]">
              heroicons-solid:search
            </FuseSvgIcon>
            <Input
              placeholder="Search"
              className="flex flex-1 px-8"
              disableUnderline
              fullWidth
              value={searchText}
              inputProps={{
                'aria-label': 'Search',
              }}
              sx={{
                '& input::placeholder': {
                  color: '#75757599',
                  opacity: 1,
                },
              }}
              onChange={handleSearchText}
            />
          </Paper>
          <div className="flex gap-8">
            <Button
              sx={{
                backgroundColor: '#B5E4E5',
                border: '1px solid#C8DBCF',
              }}
              variant="contained"
              startIcon={<CalendarTodayOutlinedIcon />}
              aria-describedby={id}
              onClick={handleClick}
            >
              Select Day
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Calendar date={date} locale={enUS} onChange={handleDateSelect} />
            </Popover>
            <FormControl sx={{ m: 0, p: 0, minWidth: 80 }}>
              <Select
                value={status}
                onChange={handleStatusChange}
                inputProps={{ 'aria-label': 'Without label' }}
                IconComponent={KeyboardArrowDownIcon} // Custom dropdown icon
                sx={{
                  borderRadius: '8px', // Set the border-radius for the select box
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: '8px', // Set border-radius for outlined variant
                  },
                  '& .MuiSelect-select': {
                    padding: 0,
                    pl: 1,
                    borderRadius: '8px', // Also apply border-radius here
                  },
                }}
              >
                <MenuItem value="all">
                  <ListItemText primary="All" />
                </MenuItem>
                <MenuItem value="active">
                  <ListItemText primary="Active" />
                </MenuItem>
                <MenuItem value="inactive">
                  <ListItemText primary="Inactive" />
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <TableContainer className="border border-[#C6D9CD] rounded-[8px]">
          <Table className="w-full" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <HeaderTableCell
                  sx={{
                    borderLeft: 'none',
                  }}
                >
                  <div className="flex w-full justify-between items-center gap-8">
                    <div className="flex items-center gap-8">
                      <CalendarTodayOutlinedIcon sx={{ fontSize: 18 }} color="primary" />
                      <Typography>Day</Typography>
                    </div>
                    <IconButton color="primary">
                      <RxCaretSort className="text-[24px]" />
                    </IconButton>
                  </div>
                </HeaderTableCell>
                <HeaderTableCell>
                  <div className="flex items-center gap-8">
                    <SwapVertOutlinedIcon sx={{ fontSize: 18 }} color="primary" />
                    <Typography>Client Details</Typography>
                  </div>
                </HeaderTableCell>
                <HeaderTableCell>
                  <div className="flex items-center gap-8">
                    <PercentOutlinedIcon sx={{ fontSize: 18 }} color="primary" />
                    <Typography>Your Profit</Typography>
                  </div>
                </HeaderTableCell>
                <HeaderTableCell
                  align="left"
                  sx={{
                    borderRight: 'none',
                  }}
                >
                  <div className="flex items-center gap-8">
                    <PaymentsOutlinedIcon sx={{ fontSize: 18 }} color="primary" />
                    <Typography>Payment Status</Typography>
                  </div>
                </HeaderTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {currentData.map((item, index) => (
                <TableRow key={index}>
                  <BodyTableCell
                    className={clsx(index === currentData.length - 1 && 'border-none')}
                  >
                    <Typography>{item.date}</Typography>
                  </BodyTableCell>
                  <BodyTableCell
                    className={clsx(index === currentData.length - 1 && 'border-none')}
                  >
                    <Typography>{item.name}</Typography>
                    <Typography>{item.email}</Typography>
                    <Typography>{item.phone}</Typography>
                  </BodyTableCell>
                  <BodyTableCell
                    align="right"
                    className={clsx(index === currentData.length - 1 && 'border-none')}
                  >
                    <Typography className="number">{formatNumber(item.profit_amount)}</Typography>
                    <Typography>({item.percentage}%)</Typography>
                  </BodyTableCell>
                  <BodyTableCell
                    sx={{ maxWidth: 200 }}
                    className={clsx(index === currentData.length - 1 && 'border-none')}
                  >
                    <Typography className="number">{formatNumber(item.pay_amount)}</Typography>
                    <div className="flex flex-wrap gap-4">
                      <CustomLink href={`https://bscscan.com/tx/${item.txid}`} color="primary" target="_blank">
                        TrxID:
                      </CustomLink>
                      <CustomLink href={`https://bscscan.com/tx/${item.txid}`} color="primary" target="_blank">
                        {item.txid}
                      </CustomLink>
                    </div>
                  </BodyTableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-end mt-12 gap-8">
          <Button
            sx={{
              backgroundColor: '#75757566',
            }}
            variant="contained"
            startIcon={<ArrowBackIosNewOutlinedIcon />}
            onClick={handlePreviousPage}
            disabled={page === 1} // Disable button on the first page
          >
            Previous
          </Button>

          <Button
            sx={{
              backgroundColor: '#B5E4E5',
            }}
            variant="contained"
            endIcon={<ArrowForwardIosOutlinedIcon />}
            onClick={handleNextPage}
            disabled={page === totalPages} // Disable button on the last page
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReferralsTable;
