import i18next from 'i18next';

import en from './i18n/en';
import MyReferrals from './MyReferrals';

i18next.addResourceBundle('en', 'myReferralsPage', en);

const MyReferralConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'my-referrals',
      element: <MyReferrals />,
    },
  ],
};

export default MyReferralConfig;
