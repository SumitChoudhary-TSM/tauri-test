import React from 'react';
import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';
import { cn } from '@/utils/cn';

type Variant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

type Size = 'sm' | 'md' | 'lg';

interface CustomButtonProps extends ButtonProps {
  variantType?: Variant;
  sizeType?: Size;
  disable?: boolean;
}

const variantClasses: Record<Variant, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',

  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',

  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',

  outline: 'border border-border text-foreground hover:bg-muted/50 dark:hover:bg-muted/20',

  ghost: 'text-foreground hover:bg-muted/50 dark:hover:bg-muted/20',

  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variantType = 'default', sizeType = 'md', disable, ...props }, ref) => {
    return (
      <Button
        {...props}
        ref={ref}
        disabled={disable}
        className={cn(
          'normal-case! shadow-none!',

          'rounded-xl px-4 py-2 font-medium transition-all',
          'disabled:opacity-50 disabled:cursor-not-allowed',

          variantClasses[variantType],
          sizeClasses[sizeType],

          className,
        )}
      />
    );
  },
);

CustomButton.displayName = 'CustomButton';

export default CustomButton;
