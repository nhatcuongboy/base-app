import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormHelperText, IconButton, TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const FormInputPassword = ({
  name,
  control,
  label,
  defaultValue = '',
  required,
  ...rest
}: any) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="outlined-adornment-password" required={required} error={!!error}>
            {label}
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            error={!!error}
            // helperText={error?.message}
            onChange={onChange}
            value={value}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
            required={required}
          />
          {!!error && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

{
  /* <FormInputText
            name="password"
            control={control}
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            required
          /> */
}
