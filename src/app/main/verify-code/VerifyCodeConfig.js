import VerifyCodePage from './VerifyCodePage';
import authRoles from '../../auth/authRoles';

const VerifyCodeConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'verify-code',
      element: <VerifyCodePage />,
    },
  ],
};

export default VerifyCodeConfig;
