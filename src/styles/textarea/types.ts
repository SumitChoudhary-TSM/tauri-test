import { FormControlProps, InputLabelProps, OutlinedInputProps } from '@mui/material';

export interface CustomTextareaProps extends FormControlProps {
  label?: string;
  placeholder?: string;
  rows?: number;
  minHeight?: string | number;
  maxHeight?: string | number;
  resize?: 'none' | 'both' | 'vertical' | 'horizontal';
  errorText?: string;
  inputProps?: OutlinedInputProps;
  labelProps?: InputLabelProps;
  className?: string;
}
