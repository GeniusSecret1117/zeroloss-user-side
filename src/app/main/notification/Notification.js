import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import { Typography, Button } from '@mui/material';
import { selectNotifications } from 'app/theme-layouts/shared-components/notificationPanel/store/dataSlice';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import NotificationCard from './components/NotificationCard';



const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));
function Notification(props) {
  const { t } = useTranslation('notificationPage');
  const user = useSelector(selectUser);
  const notifications = useSelector(selectNotifications);

  return (
    <Root
      content={
        <div className="w-full container pt-[24px]">
          <div className="rounded-[16px] bg-[#F3F9F7] p-[24px]">
            <div className="flex justify-between">
              <div className="flex gap-8 items-center">
                <NotificationsIcon sx={{ color: (theme) => theme.palette.background.default, fontSize: 40 }} />
                <Typography className="text-[40px] font-semibold">
                  View All Notification
                </Typography>
              </div>
              <div className="flex gap-4 items-center cursor-pointer">
                <DoneAllOutlinedIcon
                  sx={{ color: (theme) => theme.palette.background.default, fontSize: 18 }}
                />
                <Typography className="text-[18px] font-medium leading-none">
                  Mark All as read
                </Typography>
              </div>
            </div>
            {notifications.length > 0 ? (
              <div className="flex flex-col my-12 mx-4">
                {notifications.map((item) => (
                  <NotificationCard key={item.id} className="mb-16" item={item} onClose={null} />
                ))}
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center p-16">
                <Typography className="text-24 text-center" color="text.secondary">
                  There are no notifications for now.
                </Typography>
              </div>
            )}
          </div>
        </div>
      }
      scroll="content"
    />
  );
}

export default Notification;
