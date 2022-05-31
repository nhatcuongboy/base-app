import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import React from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { useTranslation } from 'react-i18next';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Link from '@mui/material/Link';
import { useLogin } from 'src/hooks/auth';

// const uiConfig = {
//   signInFlow: 'popup',
//   //   signInSuccessUrl: '/dashboard',
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//   ],
//   callbacks: {
//     // Avoid redirects after sign-in.
//     signInSuccessWithAuthResult: () => false,
//   },
// };

function Login() {
  const { t } = useTranslation(['dashboard']);
  const dispatch = useAppDispatch();
  const { status, data: response, mutate: login } = useLogin();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      username: data.get('email'),
      password: data.get('password'),
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, mb: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container sx={{ mb: 2 }}>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {/* <Divider /> */}
        </Box>
        {/* <Typography>Or</Typography> */}
        {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
      </Box>
    </Container>
  );
}

export default Login;
