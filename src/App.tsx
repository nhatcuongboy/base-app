import { useAppDispatch, useAppSelector } from './app/hooks';
import { changeTheme, selectLanguage, selectTheme } from './app/appSlice';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React, { useEffect, lazy } from 'react';
import './languages/i18n';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { selectToken, setUser } from './features/auth/authSlice';
import ProtectedRoute from './components/ProtectedRoute';
import { ColorScheme } from './constants/theme';
import { DarkTheme, LightTheme } from './utils/themes';

const Header = lazy(() => import('./components/Header'));
const Login = lazy(() => import('./features/auth/pages/Login'));
const Dashboard = lazy(() => import('./features/dashboard/pages/Dashboard'));

const firebaseConfig = {
  apiKey: 'AIzaSyCFK6BeQKs_dMjJ5BNLqyQys38iCPRBU54',
  authDomain: 'base-app-5bc9d.firebaseapp.com',
  projectId: 'base-app-5bc9d',
  storageBucket: 'base-app-5bc9d.appspot.com',
  messagingSenderId: '356395499991',
  appId: '1:356395499991:web:0a160f42b0de7e9d300b92',
};

firebase.initializeApp(firebaseConfig);

function App() {
  const currentTheme = useAppSelector(selectTheme);
  const currentLanguage = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const { i18n } = useTranslation();
  const globalLoading = false;
  const token = useAppSelector(selectToken);

  useEffect(() => {
    dispatch(changeTheme(systemPrefersDark ? 'dark' : 'light'));
  }, [systemPrefersDark]);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      dispatch(setUser({ user }));
    });
    return () => unregisterAuthObserver();
  }, []);

  useEffect(() => {
    i18n.changeLanguage(currentLanguage || 'en');
  }, [currentLanguage]);

  return (
    <ThemeProvider theme={currentTheme === ColorScheme.LIGHT ? LightTheme : DarkTheme}>
      <CssBaseline />
      <Backdrop sx={{ color: '#fff', zIndex: () => 9999 }} open={globalLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Navigate to={token ? '/dashboard' : '/login'} replace />} />
            <Route element={<ProtectedRoute isAllowed={!token} redirectPath="/dashboard" />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ProtectedRoute isAllowed={!!token} redirectPath="/login" />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<p>There&apos;s nothing here: 404!</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
