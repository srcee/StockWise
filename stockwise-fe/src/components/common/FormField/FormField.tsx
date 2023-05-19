import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';

interface FormFieldProps {
  name: string;
  type?: string;
  label: string;
  required?: boolean;
  className?: string;
  error?: boolean;
  control: Control<FieldValues>;
}

const FormField: React.FC<FormFieldProps> = ({ name, type, label, required, error, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          required={required}
          label={label}
          type={type}
          error={error}
          value={field.value}
          onChange={(newValue) => field.onChange(newValue)}
        />
      )}
    />
  );
};

export default FormField;
