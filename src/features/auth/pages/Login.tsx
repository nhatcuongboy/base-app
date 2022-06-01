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
import { useLogin } from 'src/hooks/auth';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

const LoginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(8),
  // password: yup.number().required().positive().integer(),
  // website: yup.string().url()
});

function Login() {
  const { t } = useTranslation(['dashboard']);
  const dispatch = useAppDispatch();
  const { status, data: response, mutate: login, isLoading } = useLogin();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data: any) => {
    login({
      username: data.username,
      password: data.password,
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
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, mb: 1 }}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} margin="normal" fullWidth label="Username" autoFocus />
            )}
          />
          {errors.username && <p>{errors.username.message}</p>}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            )}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isLoading}
            // loadingPosition="start"
          >
            Sign In
          </LoadingButton>
          <Grid container sx={{ mb: 2 }}>
            <Grid item xs>
              <Link to="#">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/sign-up">{"Don't have an account? Sign Up"}</Link>
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
