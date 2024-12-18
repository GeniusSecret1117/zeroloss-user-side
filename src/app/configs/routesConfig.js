import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import DashboardConfig from '../main/dashboard/DashboardConfig';
import MyReferralConfig from '../main/myReferrals/MyReferralConfig';
import ReferralStatementConfig from '../main/referral-statement/ReferralStatementConfig';
import ProfitStatementConfig from '../main/profit-statement/ProfitStatementConfig';
import OrderHistoryConfig from '../main/order-history/OrderHistoryConfig';
import TradeHistoryConfig from '../main/trade-history/TradeHistoryConfig';
import TransactionHistoryConfig from '../main/transaction-history/TransactionHistoryConfig';
import FundingFeeConfig from '../main/funding-fee/FundingFeeConfig';
import ProfileConfig from '../main/profile/ProfileConfig';
import ForgotPasswordConfig from '../main/forgot-password/ForgotPasswordConfig';
import VerifyCodeConfig from '../main/verify-code/VerifyCodeConfig';
import NotificationConfig from '../main/notification/NotificationConfig';
import ChangePasswordConfig from '../main/change-password/ChangePasswordConfig';
import SettingsConfig from '../main/settings/SettingsConfig';

const routeConfigs = [
  DashboardConfig,
  MyReferralConfig,
  ReferralStatementConfig,
  ProfitStatementConfig,
  OrderHistoryConfig,
  TradeHistoryConfig,
  TransactionHistoryConfig,
  FundingFeeConfig,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  ProfileConfig,
  ForgotPasswordConfig,
  VerifyCodeConfig,
  NotificationConfig,
  ChangePasswordConfig,
  SettingsConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="/dashboard" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
