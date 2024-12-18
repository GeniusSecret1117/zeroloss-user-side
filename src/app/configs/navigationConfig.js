import i18next from 'i18next';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import Divider from '@mui/material/Divider';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { MdOutlineRadar } from 'react-icons/md';
import authRoles from '../auth/authRoles';
import en from './navigation-i18n/en';
import pt from './navigation-i18n/pt';
import nl from './navigation-i18n/nl';
import ru from './navigation-i18n/ru';
import es from './navigation-i18n/es';
import it from './navigation-i18n/it';
import pl from './navigation-i18n/pl';
import fr from './navigation-i18n/fr';
import de from './navigation-i18n/de';
import el from './navigation-i18n/el';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('pt', 'navigation', pt);
i18next.addResourceBundle('nl', 'navigation', nl);
i18next.addResourceBundle('ru', 'navigation', ru);
i18next.addResourceBundle('es', 'navigation', es);
i18next.addResourceBundle('it', 'navigation', it);
i18next.addResourceBundle('pl', 'navigation', pl);
i18next.addResourceBundle('fr', 'navigation', fr);
i18next.addResourceBundle('de', 'navigation', de);
i18next.addResourceBundle('el', 'navigation', el);

const navigationConfig = [
  {
    id: 'dashboard-component',
    title: 'Dashboard',
    translate: 'Dashboard',
    type: 'item',
    icon: <DashboardOutlinedIcon />,
    url: 'dashboard',
  },
  {
    id: 'referrals-component',
    title: 'My Referrals',
    translate: 'My_Referrals',
    type: 'item',
    icon: <GroupAddOutlinedIcon />,
    url: 'my-referrals',
  },
  {
    id: 'referral-statement-component',
    title: 'Referral Statement',
    translate: 'Referral_Statement',
    type: 'item',
    icon: <DescriptionOutlinedIcon />,
    url: 'referral-statement',
    divide: <Divider className="mt-[24px] mb-[32px]" />
  },
  {
    id: 'report-component',
    title: 'Report',
    translate: 'Report',
    type: 'group',
    icon: <TableChartOutlinedIcon />,
    divide: <Divider className="mt-[6px] mb-[12px]" />,
    children: [
      {
        id: 'profit-statement-component',
        title: 'Profit Statement',
        translate: 'Profit_Statement',
        type: 'item',
        icon: <AccountBalanceWalletOutlinedIcon />,
        url: 'profit-statement',
      },
      {
        id: 'order-history-component',
        title: 'Order History',
        translate: 'Order_History',
        type: 'item',
        icon: <HistoryOutlinedIcon />,
        url: 'order-history',
      },
      {
        id: 'trade-history-component',
        title: 'Trade History',
        translate: 'Trade_History',
        type: 'item',
        icon: <WatchLaterOutlinedIcon />,
        url: 'trade-history',
      },
      {
        id: 'transaction-history-component',
        title: 'Transaction History',
        translate: 'Transaction_History',
        type: 'item',
        icon: <img className="w-[22px] h-[22px] mr-[16px]" src="assets/icons/transaction.svg" alt="transaction" />,
        url: 'transaction-history',
      },
      {
        id: 'position-history-component',
        title: 'Position History',
        translate: 'Position_History',
        type: 'item',
        icon: <MdOutlineRadar className="text-[22px] mr-[16px]" />,
        url: 'position-history',
      },
      {
        id: 'funding-fee-component',
        title: 'Funding Fee',
        translate: 'Funding_Fee',
        type: 'item',
        icon: <CreditCardOutlinedIcon />,
        url: 'funding-fee',
        divide: <Divider className="mt-[24px] mb-[32px]" />
      },
    ],
  },
  {
    id: 'settings-component',
    title: 'Settings',
    translate: 'Settings',
    type: 'item',
    icon: <SettingsOutlinedIcon />,
    url: 'settings',
  },
  {
    id: 'log-out',
    title: 'Logout',
    type: 'item',
    auth: authRoles.user,
    url: 'sign-out',
    icon: <LogoutOutlinedIcon />,
  },
];

export default navigationConfig;
