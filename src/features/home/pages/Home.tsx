import {
  Box,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { changeLanguage, changeTheme, selectLanguage, selectTheme } from 'src/app/appSlice';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { Title, TimeNow } from './Home.styles';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function Home() {
  const currentTheme = useAppSelector(selectTheme);
  const currentLanguage = useAppSelector(selectLanguage);
  const [language, setLanguage] = useState(currentLanguage);
  const { t } = useTranslation(['home']);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeLanguage(language));
  }, [language]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Title>{t('home:title')}</Title>
        <p>Hello {firebase.auth()?.currentUser?.displayName}</p>
        <TimeNow>{format(new Date(), 'eeee', { locale: vi })}</TimeNow>
      </Box>
    </Container>
  );
}

export default Home;
