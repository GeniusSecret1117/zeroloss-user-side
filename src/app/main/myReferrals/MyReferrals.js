import { styled } from '@mui/material/styles';
import { useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import { Typography } from '@mui/material';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import TotalCard from './components/totalCard';
import ActiveCard from './components/activeCard';
import InactiveCard from './components/InactiveCard';
import Referrals from './components/referrals';
import Invites from './components/invite';
import ReferralsTable from './components/referralsTable';
import JwtService from "src/app/auth/services/jwtService";

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function MyReferrals(props) {
  const { t } = useTranslation('myReferralsPage');
  const user = useSelector(selectUser);
  
  
  const [referraldata,setReferraldata] = useState([]);
  const [totalReferralNumber, setTotalReferralNumber] = useState(0);
  const [inactiveReferralNumber, setTotalInactiveReferralNumber] = useState(0);

  useEffect(() => {
    JwtService.getReferral()        
        .then((res) => {
          setReferraldata(res);
          console.log('123123123123',res);
          
          const inactiveItems = res.filter(item => item.status === "Inactive");
          setTotalInactiveReferralNumber(inactiveItems.length);
          setTotalReferralNumber(res.length);
          
        })
        .catch((error) => {
          console.log("error", error);
        });
  }, []);

  return (
    <Root
      content={
        <div className="w-full container p-12">
          <div className="flex items-center mt-[20px]">
            <GroupAddOutlinedIcon className="text-[40px] text-[#032123]" />
            <Typography className="font-semibold text-[40px] ml-8" color="primary">
              My Referrals
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-[12px]">
            <TotalCard value={totalReferralNumber} />
            <ActiveCard value={totalReferralNumber-inactiveReferralNumber} />
            <InactiveCard value={inactiveReferralNumber} />
          </div>
          <div className="mt-[32px] grid grid-cols-1 md:grid-cols-10 gap-[16px]">
            <Referrals />
            <Invites referralcode={user.data.referralcode}/>
          </div>
          <div className="mt-[24px]">
            <ReferralsTable />
          </div>
        </div>
      }
      scroll="content"
    />
  );
}

export default MyReferrals;
