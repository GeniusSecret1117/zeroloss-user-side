import { useState, useEffect} from 'react';
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
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import IconButton from '@mui/material/IconButton';
import { RxCaretSort } from 'react-icons/rx';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
// import { referraldata } from './tempdata';
import JwtService from "src/app/auth/services/jwtService";

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: '700', // Equivalent to 'font-semibold'
  fontSize: '12px',
  borderBottom: '1px solid #C6D9CD', // Dashed border
  borderLeft: '1px solid #C6D9CD', // Dashed border
  borderRight: '1px solid #C6D9CD', // Dashed border
  padding: theme.spacing(2),
  '& p': {
    fontWeight: '700', // Equivalent to 'font-semibold'
    fontSize: '12px',
  },
}));
const BodyTableCell = styled(TableCell)(({ theme }) => ({
  '& p': {
    fontWeight: '600', // Equivalent to 'font-semibold'
    fontSize: '14px',
  },
  '& p.small': {
    fontWeight: '400',
  },
  borderBottom: '1px dashed #75757540', // Dashed border
  padding: theme.spacing(2), // Adjust padding if needed
}));

const ReferralsTable = () => {
  // State to track the current page
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('all');
  const [referraldata,setReferraldata] = useState([]);

  

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    JwtService.getReferral()        
        .then((res) => {
          setReferraldata(res);
          console.log(res);
          const inactiveItems = res.filter(item => item.status === "Inactive");
          setTotalInactiveReferralNumber(inactiveItems.length);
          setTotalReferralNumber(res.length);
          
        })
        .catch((error) => {
          console.log("error", error);
        });
  },[]);
  const itemsPerPage = 25;

  // Calculate the current data to display based on the page
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = referraldata.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination change
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const handleSearchText = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <div className="rounded-[16px] bg-[#F3F9F7] border border-[#03212352] p-24">
        <div className="flex justify-end mb-[12px] gap-8">
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
          <FormControl sx={{ m: 0, p: 0, minWidth: 80 }}>
            <Select
              value={status}
              onChange={handleStatusChange}
              displayEmpty
              placeholder="Status"
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
        <TableContainer className="border border-[#C6D9CD] rounded-[8px]">
          <Table className="w-full" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <HeaderTableCell
                  sx={{
                    borderLeft: 'none',
                  }}
                  align="center"
                >
                  #
                </HeaderTableCell>
                <HeaderTableCell>
                  <div className="flex items-center gap-8">
                    <CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} color="primary" />
                    <Typography>Date of Join</Typography>
                    <IconButton color="primary">
                      <RxCaretSort className="text-[20px]" />
                    </IconButton>
                  </div>
                </HeaderTableCell>
                <HeaderTableCell>
                  <div className="flex items-center gap-8">
                    <AccountCircleOutlinedIcon sx={{ fontSize: 16 }} color="primary" />
                    <Typography>Name</Typography>
                    <IconButton color="primary">
                      <RxCaretSort className="text-[20px]" />
                    </IconButton>
                  </div>
                </HeaderTableCell>
                <HeaderTableCell>
                  <div className="flex items-center gap-8">
                    <EmailOutlinedIcon sx={{ fontSize: 16 }} color="primary" />
                    <Typography>Email Address</Typography>
                    <IconButton color="primary">
                      <RxCaretSort className="text-[20px]" />
                    </IconButton>
                  </div>
                </HeaderTableCell>
                <HeaderTableCell align="center">
                  <div className="flex items-center gap-8">
                    <LocalPhoneOutlinedIcon sx={{ fontSize: 16 }} color="primary" />
                    <Typography>Mobile Number</Typography>
                    <IconButton color="primary">
                      <RxCaretSort className="text-[20px]" />
                    </IconButton>
                  </div>
                </HeaderTableCell>
                <HeaderTableCell align="right">
                  <div className="flex items-center gap-8">
                    <ShowChartOutlinedIcon sx={{ fontSize: 16 }} color="primary" />
                    <Typography>Invested Amount</Typography>
                    <IconButton color="primary">
                      <RxCaretSort className="text-[20px]" />
                    </IconButton>
                  </div>
                </HeaderTableCell>
                <HeaderTableCell align="center">
                  <div className="flex items-center gap-8">
                    <HourglassEmptyOutlinedIcon sx={{ fontSize: 16 }} color="primary" />
                    <Typography>Status</Typography>
                    <IconButton color="primary">
                      <RxCaretSort className="text-[20px]" />
                    </IconButton>
                  </div>
                </HeaderTableCell>
                <HeaderTableCell
                  align="center"
                  sx={{
                    borderRight: 'none',
                  }}
                >
                  <div className="flex items-center gap-8">
                    <DoneAllOutlinedIcon sx={{ fontSize: 16 }} color="primary" />
                    <Typography>Invested Status</Typography>
                    <IconButton color="primary">
                      <RxCaretSort className="text-[20px]" />
                    </IconButton>
                  </div>
                </HeaderTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((item, index) => (
                <TableRow key={index}>
                  <BodyTableCell
                    align="center"
                    className={clsx(index === currentData.length - 1 && 'border-none')}
                  >
                    <Typography>{index + 1}</Typography>
                  </BodyTableCell>
                  <BodyTableCell
                    className={clsx(index === currentData.length - 1 && 'border-none')}
                  >
                    <Typography className="small">{item.updated_at}</Typography>
                  </BodyTableCell>
                  <BodyTableCell
                    className={clsx(index === currentData.length - 1 && 'border-none')}
                  >
                    <Typography className="small">{item.full_name}</Typography>
                  </BodyTableCell>
                  <BodyTableCell
                    className={clsx(index === currentData.length - 1 && 'border-none')}
                  >
                    <Typography className="small">{item.invite_email}</Typography>
                  </BodyTableCell>
                  <BodyTableCell
                    align="center"
                    className={clsx(index === currentData.length - 1 && 'border-none')}
                  >
                    <Typography>{item.whatsapp}</Typography>
                  </BodyTableCell>
                  <BodyTableCell
                    align="right"
                    className={clsx(index === currentData.length - 1 && 'border-none')}
                  >
                    <Typography className="font-Mint">{0}
                      {/* {formatNumber(item.invest_amount)?formatNumber(item.invest_amount):0} */}
                    </Typography>
                  </BodyTableCell>
                  <BodyTableCell
                    align="center"
                    className={clsx(index === currentData.length - 1 && 'border-none')}
                  >
                    <div
                      className={clsx(
                        'inline-flex min-w-[70px] justify-center items-center font-medium border rounded-[6px] p-[4px] ',
                        item.status === 'Active'
                          ? 'border-[#C4F3D6]  bg-[#C4F3D633] text-[#41D87B]'
                          : 'border-[#F9BAC6]  bg-[#F9BAC633] text-[#FE2B51]'
                      )}
                    >
                      {item.status}
                    </div>
                  </BodyTableCell>
                  <BodyTableCell
                    align="center"
                    className={clsx(index === currentData.length - 1 && 'border-none')}
                  >
                    <div className="flex items-center justify-center gap-8 uppercase">
                      {item.invest_status === 'Yes' ? (
                        <>
                          <TaskAltOutlinedIcon sx={{ fontSize: 20, color: '#41D87B' }} />
                          <div className="font-medium text-[#41D87B]">{item.invest_status}</div>
                        </>
                      ) : (
                        <>
                          <HighlightOffOutlinedIcon sx={{ fontSize: 20, color: '#FE2B51' }} />
                          <div className="font-medium text-[#FE2B51]">{item.invest_status?item.invest_status:'No'}</div>
                        </>
                      )}
                    </div>
                  </BodyTableCell> 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-end mt-12">
          <Pagination
            count={Math.ceil(referraldata.length / itemsPerPage)}
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

export default ReferralsTable;
