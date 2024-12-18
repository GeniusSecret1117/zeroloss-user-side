import i18next from 'i18next';

import en from './i18n/en';
import TransactionHistory from './TransactionHistory';

i18next.addResourceBundle('en', 'transactionHistoryPage', en);

const TransactionHistoryConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'transaction-history',
      element: <TransactionHistory />,
    },
  ],
};

export default TransactionHistoryConfig;
