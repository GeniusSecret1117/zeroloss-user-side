import i18next from 'i18next';

import en from './i18n/en';
import FundingFee from './FundingFee';

i18next.addResourceBundle('en', 'fundingFeePage', en);

const FundingFeeConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'funding-fee',
      element: <FundingFee />,
    },
  ],
};

export default FundingFeeConfig;
