import React from 'react';
import { IconProps } from './type';

const XIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = '#000000',
  fill = 'none',
  className,
  scale = 1,
  useOverlay = false,
  viewBox = '0 0 24 24',
  style,
  onClick,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={typeof width === 'number' ? width * scale : width}
      height={typeof height === 'number' ? height * scale : height}
      viewBox={viewBox}
      fill={fill}
      className={className}
      style={style}
      onClick={onClick}
    >
      <path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

      {useOverlay && <rect width="100%" height="100%" fill="rgba(0,0,0,0.1)" rx="4" />}
    </svg>
  );
};

export default XIcon;
