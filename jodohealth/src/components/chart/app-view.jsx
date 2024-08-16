import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppCurrentVisits from './layout/app-current-visits';
import AppWebsiteVisits from './layout/app-website-visits';
import AppWidgetSummary from './layout/app-widget-summary';
import usericon from "./glass/ic_glass_users.png";
import { getDashboarddata } from '../../redux/services/otherServices/Dashboard';

const navigationUrls = {
  users: 'https://empowerhealth-backend.onrender.com/api/user/download/xml',
  agencies: 'https://empowerhealth-backend.onrender.com/api/agency/download/xml',
  labs: 'https://empowerhealth-backend.onrender.com/api/lab/download/xml',
  subscriptions: 'https://empowerhealth-backend.onrender.com/api/user/subscription/download/xml'
};

const handleNavigation = (url) => {
  window.location.href = url;
};

export default function AppView() {
  const [data, setData] = useState(null);

  useEffect(() => {
    handleGetDashboardData();
  }, []);

  const handleGetDashboardData = async () => {
    try {
      const res = await getDashboarddata();
      if (res.success) {
        setData(res.response.body);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  if (!data) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <div>
      <Typography className="text-black" variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3} onClick={() => handleNavigation(navigationUrls.subscriptions)}>
          <AppWidgetSummary
            title="Total Subscription"
            total={data.totalSubscription}
            color="success"
            icon={<img alt="icon" src={usericon} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3} onClick={() => handleNavigation(navigationUrls.agencies)}>
          <AppWidgetSummary
            title="Total Agency"
            total={data.totalAgency}
            color="info"
            icon={<img alt="icon" src={usericon} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3} onClick={() => handleNavigation(navigationUrls.labs)}>
          <AppWidgetSummary
            title="Total Lab"
            total={data.totalLab}
            color="warning"
            icon={<img alt="icon" src={usericon} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3} onClick={() => handleNavigation(navigationUrls.users)}>
          <AppWidgetSummary
            title="Total User"
            total={data.totalUser}
            color="error"
            icon={<img alt="icon" src={usericon} />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
