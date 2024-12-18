import i18next from 'i18next';

import en from './i18n/en';
import TradeHistory from './TradeHistory';

i18next.addResourceBundle('en', 'tradeistoryPage', en);

const TradeHistoryConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'trade-history',
      element: <TradeHistory />,
    },
  ],
};

export default TradeHistoryConfig;
