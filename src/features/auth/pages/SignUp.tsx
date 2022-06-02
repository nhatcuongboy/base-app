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
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as authApi from 'src/api/authApi';
import { FormInputText } from 'src/components/form-components/FormInputText';
import { FormInputPassword } from 'src/components/form-components/FormInputPassword';

const SignUpSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(8),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  middleName: yup.string(),
  phone: yup.string().required().length(10),
  email: yup.string().email(),
});

function SignUp() {
  const { t } = useTranslation(['dashboard']);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const {
    status,
    data: response,
    mutate: signUp,
    isLoading,
  } = useMutation((params: any) => authApi.signUp(params), {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onSubmit = (data: any) => {
    signUp({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName,
      phone: data.phone,
      email: data.email,
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormInputText
                name="firstName"
                control={control}
                label="First Name"
                required
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInputText
                name="lastName"
                control={control}
                label="Last Name"
                required
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText name="middleName" control={control} label="Middle name" />
            </Grid>
            <Grid item xs={12}>
              <FormInputText name="username" control={control} label="Username" required />
            </Grid>
            <Grid item xs={12}>
              <FormInputText name="phone" control={control} label="Phone" required type="number" />
            </Grid>
            <Grid item xs={12}>
              <FormInputText name="email" control={control} label="Email" type="email" />
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              /> */}
              <FormInputPassword name="password" control={control} label="Password" />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isLoading}
            // loadingPosition="start"
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
