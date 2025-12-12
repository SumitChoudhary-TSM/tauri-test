import { SxProps } from '@mui/material';
import CustomButton from '@/styles/button';

export interface RoleOption {
  label: string;
  value: string;
}

export interface RoleSelectProps {
  title?: string | React.ReactNode;
  value: string[];
  onChange: (newValue: string[]) => void;
  roleOptions: RoleOption[];
  buttonProps?: React.ComponentProps<typeof CustomButton>;
  popoverSx?: SxProps;
  menuItemSx?: SxProps;
  checkboxSx?: SxProps;
  listItemTextSx?: SxProps;
  closeOnSelect?: boolean;
  showSearch?: boolean;
  maxHeight?: number;
  renderLabel?: (role: RoleOption) => React.ReactNode;
  renderSelected?: (values: string[]) => React.ReactNode;
  popoverWidth?: number | string;
  buttonWidth?: number | string;
  showIcon?: boolean;
}
