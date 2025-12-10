import { DialogProps } from '@mui/material';
import { ReactNode } from 'react';

export interface CustomDialogProps extends DialogProps {
  title?: string;
  children?: ReactNode;
  actions?: ReactNode;
  variant?: 'default' | 'danger' | 'info' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disableOutsideClick?: boolean;
  showCloseButton?: boolean;
}

export const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-2xl',
  xl: 'max-w-3xl',
  xxl: 'max-w-5xl',
};

export const variantClasses = {
  default: 'border-border bg-card',
  danger: 'border-destructive bg-destructive',
  info: 'border-accent bg-accent',
  success: 'border-secondary bg-secondary',
};

export const headerTextColor = {
  default: 'text-foreground',
  danger: 'text-destructive-foreground',
  info: 'text-accent-foreground',
  success: 'text-secondary-foreground',
};
