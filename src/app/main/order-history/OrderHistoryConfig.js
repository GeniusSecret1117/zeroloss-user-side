import i18next from 'i18next';

import en from './i18n/en';
import OrderHistory from './OrderHistory';

i18next.addResourceBundle('en', 'orderHistoryPage', en);

const OrderHistoryConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'order-history',
      element: <OrderHistory />,
    },
  ],
};

export default OrderHistoryConfig;
