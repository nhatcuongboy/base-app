import { Container, Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { changeLanguage, selectLanguage, selectTheme } from 'src/app/appSlice';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useTranslation } from 'react-i18next';
import 'firebase/compat/auth';
import { selectUser } from 'src/features/auth/authSlice';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import { useQuery } from 'react-query';
import axios from 'axios';

function Dashboard() {
  const currentTheme = useAppSelector(selectTheme);
  const currentLanguage = useAppSelector(selectLanguage);
  const [language, setLanguage] = useState(currentLanguage);
  const { t } = useTranslation(['dashboard']);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);

  const { isLoading, error, data, isFetching } = useQuery('repoData', () =>
    axios.get('https://api.github.com/repos/tannerlinsley/react-query').then((res) => res.data),
  );

  useEffect(() => {
    dispatch(changeLanguage(language));
  }, [language]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div>{isFetching ? 'Updating...' : 'Done'}</div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
