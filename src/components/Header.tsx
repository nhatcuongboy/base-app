import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { changeLanguage, changeTheme, selectLanguage, selectTheme } from 'src/app/appSlice';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Outlet } from 'react-router-dom';
import { selectUser } from 'src/features/auth/authSlice';
import { FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';

export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const currentTheme = useAppSelector(selectTheme);
  const currentUser = useAppSelector(selectUser);
  const [theme, setTheme] = React.useState(currentTheme);
  const { t } = useTranslation(['']);
  const dispatch = useAppDispatch();

  const currentLanguage = useAppSelector(selectLanguage);
  const [language, setLanguage] = React.useState(currentLanguage);

  React.useEffect(() => {
    dispatch(changeLanguage(language));
  }, [language]);

  React.useEffect(() => {
    dispatch(changeTheme(theme));
  }, [theme]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              App
            </Typography>
            <Switch
              checked={theme === 'dark' ? true : false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTheme(e.target.checked ? 'dark' : 'light');
              }}
            />
            <Select
              value={language}
              label="Language"
              onChange={(e: SelectChangeEvent) => {
                setLanguage(e.target.value as string);
              }}
              sx={{}}
            >
              <MenuItem value={'en'}>English</MenuItem>
              <MenuItem value={'vi'}>Vietnamese</MenuItem>
            </Select>

            <div>
              {currentUser && (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              )}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={() => firebase.auth().signOut()}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </div>
  );
}
