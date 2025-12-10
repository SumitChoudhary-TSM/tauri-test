import { forwardRef, ReactNode } from 'react';
// components/ui/typography.tsx
import React from 'react';
import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';
import { cn } from '@/utils/cn';

interface BaseTypographyProps extends TypographyProps {
  className?: string;
  children: React.ReactNode;
}

// Heading
export const Heading = React.forwardRef<HTMLHeadingElement, BaseTypographyProps>(
  ({ className, children, ...props }, ref) => (
    <Typography {...props} ref={ref} className={cn('text-3xl font-bold text-foreground', className)} variant="h1">
      {children}
    </Typography>
  ),
);

Heading.displayName = 'Heading';

// Subheading
export const Subheading = React.forwardRef<HTMLHeadingElement, BaseTypographyProps>(
  ({ className, children, ...props }, ref) => (
    <Typography {...props} ref={ref} className={cn('text-xl font-semibold text-primary', className)} variant="h2">
      {children}
    </Typography>
  ),
);

Subheading.displayName = 'Subheading';

// Paragraph
export const Paragraph = React.forwardRef<HTMLParagraphElement, BaseTypographyProps>(
  ({ className, children, ...props }, ref) => (
    <Typography {...props} ref={ref} className={cn('text-foreground text-lg', className)} variant="body1">
      {children}
    </Typography>
  ),
);

Paragraph.displayName = 'Paragraph';

// Description
export const Description = React.forwardRef<HTMLParagraphElement, BaseTypographyProps>(
  ({ className, children, ...props }, ref) => (
    <Typography {...props} ref={ref} className={cn('text-muted-foreground text-base', className)} variant="subtitle1">
      {children}
    </Typography>
  ),
);

Description.displayName = 'Description';

// Label
export const Label = React.forwardRef<HTMLParagraphElement, BaseTypographyProps>(
  ({ className, children, ...props }, ref) => (
    <Typography
      {...props}
      ref={ref}
      className={cn('font-medium text-foreground text-sm', className)}
      variant="subtitle2"
    >
      {children}
    </Typography>
  ),
);

Label.displayName = 'Label';

// Caption
export const Caption = React.forwardRef<HTMLSpanElement, BaseTypographyProps>(
  ({ className, children, ...props }, ref) => (
    <Typography {...props} ref={ref} className={cn('text-muted-foreground text-sm', className)} variant="caption">
      {children}
    </Typography>
  ),
);

Caption.displayName = 'Caption';

export const H1 = forwardRef<
  HTMLHeadingElement,
  {
    children: ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => (
  <h1
    ref={ref}
    className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold ${className}`}
    {...props}
  >
    {children}
  </h1>
));
H1.displayName = 'H1';

export const H2 = forwardRef<
  HTMLHeadingElement,
  {
    children: ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => (
  <h2
    ref={ref}
    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold ${className}`}
    {...props}
  >
    {children}
  </h2>
));
H2.displayName = 'H2';

export const H3 = forwardRef<
  HTMLHeadingElement,
  {
    children: ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-semibold ${className}`}
    {...props}
  >
    {children}
  </h3>
));
H3.displayName = 'H3';

export const H4 = forwardRef<
  HTMLHeadingElement,
  {
    children: ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => (
  <h4
    ref={ref}
    className={`text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium ${className}`}
    {...props}
  >
    {children}
  </h4>
));
H4.displayName = 'H4';

export const H5 = forwardRef<
  HTMLHeadingElement,
  {
    children: ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => (
  <h5 ref={ref} className={`text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-normal ${className}`} {...props}>
    {children}
  </h5>
));
H5.displayName = 'H5';

export const H6 = forwardRef<
  HTMLHeadingElement,
  {
    children: ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => (
  <h6 ref={ref} className={`text-md sm:text-md md:text-lg lg:text-lg xl:text-xl font-semibold ${className}`} {...props}>
    {children}
  </h6>
));
H6.displayName = 'H6';

export const P = forwardRef<
  HTMLParagraphElement,
  {
    children: ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => (
  <p ref={ref} className={`text-sm sm:text-md md:text-lg xl:text-lg md:leading-6 ${className}`} {...props}>
    {children}
  </p>
));
P.displayName = 'P';

export const Span = forwardRef<
  HTMLSpanElement,
  {
    children: ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLSpanElement>
>(({ children, className, ...props }, ref) => (
  <span ref={ref} className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl ${className}`} {...props}>
    {children}
  </span>
));
Span.displayName = 'Span';

export const P2 = forwardRef<
  HTMLParagraphElement,
  {
    children: ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm sm:text-base md:text-base xl:text-lg font-normal text-black md:leading-6 ${className}`}
    {...props}
  >
    {children}
  </p>
));
P2.displayName = 'P2';
