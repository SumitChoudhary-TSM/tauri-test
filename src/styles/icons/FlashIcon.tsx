import React from 'react';
import { IconProps } from './type';

const FlashIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  color = '#000000',
  fill = color,
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
      fill="none"
      className={className}
      style={style}
      onClick={onClick}
    >
      <path d="M10 22v-8H7V2h10l-2 7h4l-9 13Z" fill={fill} />

      {useOverlay && <rect width="100%" height="100%" fill="rgba(0,0,0,0.1)" rx="4" />}
    </svg>
  );
};

export default FlashIcon;
