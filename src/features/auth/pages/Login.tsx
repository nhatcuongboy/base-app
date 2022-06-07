import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import React, { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { useTranslation } from 'react-i18next';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormInputText } from 'src/components/form-components/FormInputText';
import { useMutation } from 'react-query';
import * as authApi from 'src/api/authApi';
import { setToken } from '../authSlice';
import { FormInputPassword } from 'src/components/form-components/FormInputPassword';
import { useSnackbar } from 'notistack';

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
});

function Login() {
  const { t } = useTranslation(['dashboard']);
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    data: response,
    mutate: login,
    isLoading,
  } = useMutation((params: any) => authApi.login(params.username, params.password), {
    onSuccess: (data) => {
      dispatch(setToken({ token: data?.access_token }));
    },
    onError: (error: any) => {
      if (error.status === 400) {
        setError('password', { type: 'custom', message: 'Wrong password. Please input again' });
      } else {
        enqueueSnackbar(error.data?.message, { variant: 'error' });
      }
    },
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
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <FormInputText
            name="username"
            control={control}
            label="Username"
            autoFocus
            required
            margin="normal"
          />
          {/* <FormInputText
            name="password"
            control={control}
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            required
          /> */}
          <FormInputPassword name="password" control={control} label="Password" required />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
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
