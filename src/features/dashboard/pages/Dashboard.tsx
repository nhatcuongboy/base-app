import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { changeLanguage, changeTheme, selectLanguage, selectTheme } from 'src/app/appSlice';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { Title, TimeNow } from './Dashboard.styles';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { selectUser } from 'src/features/auth/authSlice';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';

function Dashboard() {
  const currentTheme = useAppSelector(selectTheme);
  const currentLanguage = useAppSelector(selectLanguage);
  const [language, setLanguage] = useState(currentLanguage);
  const { t } = useTranslation(['dashboard']);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(changeLanguage(language));
  }, [language]);

  return (
    // <Container component="main" maxWidth="xs">
    //   <Box
    //     sx={{
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <Title variant="h5" sx={{ mb: 3 }}>
    //       {t('dashboard:title')}
    //     </Title>
    //     <p>{currentUser?.displayName}</p>
    //     <TimeNow>{format(new Date(), 'eeee', { locale: vi })}</TimeNow>
    //   </Box>
    // </Container>

    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
