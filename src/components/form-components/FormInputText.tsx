import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FormInputProps } from './FormInputProps';

export const FormInputText = ({ name, control, label, defaultValue = '', ...rest }: any) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
        <TextField
          error={!!error}
          helperText={error?.message}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          // margin="normal"
          {...rest}
        />
      )}
    />
  );
};
