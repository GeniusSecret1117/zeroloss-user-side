import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { formatNumber, formatNumberWithDecimal } from '@fuse/utils';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import clsx from 'clsx';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const ranges = ["7D", "14D", "1M", "3M", "1Y", "ALL"];


const ProfitChart = (props) => {
  const [tabValue, setTabValue] = useState(0);
  const currentRange = Object.keys(ranges)[tabValue];

  const theme = useTheme();

  const series = [{
    name: 'Cash Flow',
    data: [1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09, 0.34, 3.88, 13.07,
      5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8, -27.03, -54.4, -47.2, -43.3, -18.6, -
      48.6, -41.1, -39.6, -37.6, -29.4, -21.4, -2.4
    ]
  }];

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [{
            from: -100,
            to: -46,
            color: '#F15B46'
          }, {
            from: -45,
            to: 0,
            color: '#FEB019'
          }]
        },
      }
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter (y) {
          return y.toFixed(0);
        }
      }
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2011-01-01', '2011-02-01', '2011-03-01', '2011-04-01', '2011-05-01', '2011-06-01',
        '2011-07-01', '2011-08-01', '2011-09-01', '2011-10-01', '2011-11-01', '2011-12-01',
        '2012-01-01', '2012-02-01', '2012-03-01', '2012-04-01', '2012-05-01', '2012-06-01',
        '2012-07-01', '2012-08-01', '2012-09-01', '2012-10-01', '2012-11-01', '2012-12-01',
        '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01', '2013-06-01',
        '2013-07-01', '2013-08-01', '2013-09-01'
      ],
      labels: {
        rotate: -90
      }
    }
  };

  return (
    <div className="col-span-2 border border-[#C4F3D6] rounded-[12px] bg-[#F3F9F7] p-[16px]">
      <Typography color="primary" className="font-medium text-[20px]">Profit & Loss</Typography>
      <div className="mt-[12px] w-full flex justify-between items-center">
        <Tabs
          value={tabValue}
          onChange={(ev, value) => setTabValue(value)}
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons={false}
          className="-mx-4 min-h-40"
          classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
        >
          {Object.entries(ranges).map(([key, label]) => (
            <Tab
              className={clsx("text-[16px] font-bold w-auto px-12 opacity-100 min-h-[32px] max-h-[32px] min-w-48", currentRange === key ? "text-white bg-[#0C4547] rounded-[8px]" : "text-[#032123]")}
              disableRipple
              key={key}
              label={label}
            />
          ))}
        </Tabs>
        <div>
          <Typography className="font-medium text-[14px]">Today Profit</Typography>
          <div className="flex items-end gap-x-2">
            <Typography className="font-Mint text-[12px]" color="primary">
              $
            </Typography>
            <Typography className="font-Mint text-[16px] font-semibold" color="primary">
              {formatNumberWithDecimal(props.todayProfit)?.integer || 0}
            </Typography>
            <Typography className="font-Mint text-[12px]" color="primary">
              .{formatNumberWithDecimal(props.todayProfit)?.decimal|| 0}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-auto mt-[12px]">
        <ReactApexChart
          className="flex-auto w-full"
          options={chartOptions}
          series={series}
          type="bar"
        />
      </div>
    </div>
  );
};

export default ProfitChart;
