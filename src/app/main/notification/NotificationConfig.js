import i18next from 'i18next';

import en from './i18n/en';
import Notification from './Notification';

i18next.addResourceBundle('en', 'notificationPage', en);

const NotificationConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'notifications',
      element: <Notification />,
    },
  ],
};

export default NotificationConfig;

