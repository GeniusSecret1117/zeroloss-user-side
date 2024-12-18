import i18next from 'i18next';

import en from './i18n/en';
import ChangePassword from './ChnagePassword';

i18next.addResourceBundle('en', 'changePasswordPage', en);

const ChangePasswordConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'change-password',
      element: <ChangePassword />,
    },
  ],
};

export default ChangePasswordConfig;

