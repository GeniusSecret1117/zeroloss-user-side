import i18next from 'i18next';

import en from './i18n/en';
import Settings from './Settings';

i18next.addResourceBundle('en', 'settingsPage', en);

const SettingsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'settings',
      element: <Settings />,
    },
  ],
};

export default SettingsConfig;

