import React from 'react';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CustomIconButtonProps } from './types';

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) =>
    prop !== 'sizeType' &&
    prop !== 'bgColor' &&
    prop !== 'hoverBgColor' &&
    prop !== 'iconColor' &&
    prop !== 'hoverIconColor' &&
    prop !== 'rounded',
})<CustomIconButtonProps>(
  ({
    sizeType = 'md',
    bgColor = 'transparent',
    hoverBgColor = 'rgba(0, 0, 0, 0.08)',
    iconColor = 'inherit',
    hoverIconColor,
    rounded = true,
  }) => ({
    backgroundColor: bgColor,
    color: iconColor,
    borderRadius: rounded ? '50%' : '8px',
    transition: 'all 0.2s ease',

    ...(sizeType === 'sm' && { width: 32, height: 32 }),
    ...(sizeType === 'md' && { width: 40, height: 40 }),
    ...(sizeType === 'lg' && { width: 48, height: 48 }),

    '&:hover': {
      backgroundColor: hoverBgColor,
      color: hoverIconColor ?? iconColor,
    },
  }),
);

const CustomIconButton: React.FC<CustomIconButtonProps> = ({
  children,
  className,
  sizeType,
  bgColor,
  hoverBgColor,
  iconColor,
  hoverIconColor,
  rounded,
  ...muiProps
}) => {
  return (
    <StyledIconButton
      {...muiProps}
      sizeType={sizeType}
      bgColor={bgColor}
      hoverBgColor={hoverBgColor}
      iconColor={iconColor}
      hoverIconColor={hoverIconColor}
      rounded={rounded}
      className={className}
    >
      {children}
    </StyledIconButton>
  );
};

export default CustomIconButton;
