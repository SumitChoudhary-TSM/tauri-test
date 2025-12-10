import { InputProps } from '@mui/material';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  delay?: number;
  placeholder?: string;
  loading?: boolean;
  size?: 'small' | 'medium';
  minWidth?: string | number;
  variant?: 'outlined' | 'filled' | 'standard';
  className?: string;
  sx?: object;
  inputProps?: Partial<InputProps>;
}
