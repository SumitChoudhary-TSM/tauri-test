import React from 'react';
import { IconProps } from './type';

const InventoryIcon: React.FC<IconProps> = ({
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
      <path
        d="M3 20V8.7q-.425-.275-.713-.7T2 7V4q0-.825.588-1.413T4 2h16q.825 0 1.413.588T22 4v3q0 .575-.288 1T21 8.7V20q0 .825-.588 1.413T19 22H5q-.825 0-1.413-.588T3 20ZM20 7V4H4v3h16ZM9 14h6v-2H9v2Z"
        fill={fill}
      />

      {useOverlay && <rect width="100%" height="100%" fill="rgba(0,0,0,0.1)" rx="4" />}
    </svg>
  );
};

export default InventoryIcon;
