export interface CustomButtonProps {
  label: string | React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  color?:
    | 'primary'
    | 'secondary'
    | 'dark'
    | 'white'
    | 'transparent'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'green';
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  fileIcon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
  buttonShow?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event: any) => void;
  customClassName?: string;
  href?: string;
  errorMessage?: string;
  sx?: object;
  textVariant?:
    | 'button'
    | 'caption'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6';
}

export interface ButtonType {
  label: string;
  onClick?: (id: string) => void;
  sx?: Record<string, unknown> | null;
  // Add any other properties your buttons might have
  color?: string;
  variant?: string;
  size?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;

  // ...other possible button properties
}
