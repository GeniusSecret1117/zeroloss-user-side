import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

const iconMap = {
  trade: <AttachMoneyOutlinedIcon sx={{ fontSize: 32 }}/>,
  summary: <BarChartOutlinedIcon sx={{ fontSize: 32 }}/>,
  security: <VpnKeyOutlinedIcon sx={{ fontSize: 32 }}/>,
  system: <ReportProblemOutlinedIcon sx={{ fontSize: 32 }}/>,
  admin: <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 32 }}/>,
};

const titleMap = {
  trade: 'Trade Profit',
  summary: 'Daily Profit Summary',
  security: 'Login Notification',
  system: 'System Notification',
  admin: 'Admin Alert',
};

function NotificationCard(props) {
  const { item, className } = props;
  const variant = item?.variant || '';

  const handleClose = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    if (props.onClose) {
      props.onClose(item.id);
    }
  };

  return (
    <div
      className={clsx(
        'flex items-center relative w-full space-x-8 border border-solid border-[#BFDACD] rounded-[12px] p-[12px]',
        className
      )}
    >
      {item.icon && !item.image && (
        <Box
          sx={{ backgroundColor: '#C4F3D6' }}
          className="flex shrink-0 items-center justify-center w-[64px] h-[64px] mr-12 rounded-full"
        >
          {iconMap[item.type]}
        </Box>
      )}

      <div className="flex flex-col flex-auto">
        <Typography className="font-normal text-[20px] text-[#282B2B]" component="p">
          <span className="font-bold">{titleMap[item.type]}</span>
        </Typography>
        <Typography className="font-normal text-[20px] text-[#282B2B]" component="p">
          {item.title}
        </Typography>
        <Typography className="font-normal text-[#282B2B99] text-[14px] mt-[10px]">{item.time}</Typography>
      </div>
    </div>
  );
}

export default NotificationCard;
