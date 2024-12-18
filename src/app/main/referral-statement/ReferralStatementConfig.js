import i18next from 'i18next';

import en from './i18n/en';
import ReferralStatement from './ReferralStatement';

i18next.addResourceBundle('en', 'referralStatementPage', en);

const ReferralStatementConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'referral-statement',
      element: <ReferralStatement />,
    },
  ],
};

export default ReferralStatementConfig;
