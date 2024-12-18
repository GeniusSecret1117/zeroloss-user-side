import i18next from 'i18next';

import en from './i18n/en';
import ProfitStatement from './ProfitStatement';

i18next.addResourceBundle('en', 'profitStatementPage', en);

const ProfitStatementConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'profit-statement',
      element: <ProfitStatement />,
    },
  ],
};

export default ProfitStatementConfig;
