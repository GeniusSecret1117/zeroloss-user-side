import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import { styled } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import { Link } from 'react-router-dom';
import NotificationCard from './NotificationCard';
import reducer from './store';
import { selectNotifications } from './store/dataSlice';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 5,
    top: 5,
    padding: '0 4px',
    backgroundColor: 'red',
  },
}));

function NotificationPanelToggleButton(props) {
  const notifications = useSelector(selectNotifications);
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();
  const notificationClick = (event) => {
    setNotification(event.currentTarget);
  };

  const notificationClose = () => {
    setNotification(null);
  };

  console.log(notifications);
  return (
    <>
      <IconButton className="w-40 h-40" onClick={notificationClick} size="large">
        <StyledBadge variant="dot" invisible={notifications.length === 0}>
          <NotificationsIcon sx={{ color: (theme) => theme.palette.background.default }} />
        </StyledBadge>
      </IconButton>
      <Popover
        open={Boolean(notification)}
        anchorEl={notification}
        onClose={notificationClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
        sx={{
          '& .MuiPaper-root': { border: '1px solid #41D87B' }, // Set the desired width
        }}
      >
        <div className="flex flex-col  p-16">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <StyledBadge variant="dot" invisible={notifications.length === 0}>
                <NotificationsIcon sx={{ color: (theme) => theme.palette.background.default }} />
              </StyledBadge>
              <Typography className="text-[24px] font-semibold leading-none">
                Notifications
              </Typography>
            </div>
            <div className="flex gap-4 items-center cursor-pointer">
              <DoneAllOutlinedIcon
                sx={{ color: (theme) => theme.palette.background.default, fontSize: 12 }}
              />
              <Typography className="text-[12px] font-medium leading-none">
                Mark All as read
              </Typography>
            </div>
          </div>
          {notifications.length > 0 ? (
            <div className="h-[400px] overflow-auto">
              <div className="flex flex-col my-12 mx-4">
                {notifications.map((item) => (
                  <NotificationCard key={item.id} className="mb-16" item={item} onClose={null} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center p-16">
              <Typography className="text-24 text-center" color="text.secondary">
                There are no notifications for now.
              </Typography>
            </div>
          )}
          <div className="mt-12">
            <Link
              className="text-[16px] font-semibold !text-[#032123] !no-underline"
              to="/notifications"
              onClick={notificationClose}
            >
              View All Notifications
            </Link>
          </div>
        </div>
      </Popover>
    </>
  );
}

export default withReducer('notificationPanel', reducer)(NotificationPanelToggleButton);
