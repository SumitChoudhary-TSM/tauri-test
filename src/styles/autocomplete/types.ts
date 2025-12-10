import { SxProps } from '@mui/material';
import { Control, FieldValues } from 'react-hook-form';

export interface Option {
  label: string;
  value: string | number;
}

export interface AutocompleteFieldProps<TFormValues extends FieldValues = Record<string, unknown>> {
  placeholder?: string;
  options: Option[];
  value?: Option | Option[] | null;
  multiple?: boolean;
  onChange?: (value: Option | Option[] | null) => void;
  name?: keyof TFormValues;
  errorText?: string;
  required?: boolean;
  control?: Control<TFormValues>;
  size?: 'small' | 'medium';

  className?: string;
  sx?: SxProps;

  autocompleteClassName?: string;
  autocompleteSx?: SxProps;

  textFieldClassName?: string;
  textFieldSx?: SxProps;

  chipClassName?: string;
  chipSx?: SxProps;

  errorClassName?: string;
  errorSx?: SxProps;
}
