import {
  Box,
  Container,
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
import { selectUser } from 'src/features/auth/authSlice';

function Home() {
  const currentTheme = useAppSelector(selectTheme);
  const currentLanguage = useAppSelector(selectLanguage);
  const [language, setLanguage] = useState(currentLanguage);
  const { t } = useTranslation(['home']);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(changeLanguage(language));
  }, [language]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Title variant="h5" sx={{ mb: 3 }}>
          {t('home:title')}
        </Title>
        <p>{currentUser?.displayName}</p>
        <TimeNow>{format(new Date(), 'eeee', { locale: vi })}</TimeNow>
      </Box>
    </Container>
  );
}

export default Home;
