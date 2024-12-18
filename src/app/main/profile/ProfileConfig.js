import i18next from 'i18next';

import en from './i18n/en';
import Profile from './Profile';

i18next.addResourceBundle('en', 'profilePage', en);

const ProfileConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'profile',
      element: <Profile />,
    },
  ],
};

export default ProfileConfig;

