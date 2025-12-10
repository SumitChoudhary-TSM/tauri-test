import { IconButtonProps } from '@mui/material';

export interface CustomIconButtonProps extends IconButtonProps {
  sizeType?: 'sm' | 'md' | 'lg';
  bgColor?: string;
  hoverBgColor?: string;
  iconColor?: string;
  hoverIconColor?: string;
  rounded?: boolean;
  className?: string;
}
