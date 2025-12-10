import React from 'react';
import { IconProps } from './type';

const LogoutIcon: React.FC<IconProps> = ({
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
        d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h7v2H5Zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5l-5 5Z"
        fill={fill}
      />

      {useOverlay && <rect width="100%" height="100%" fill="rgba(0,0,0,0.1)" rx="4" />}
    </svg>
  );
};

export default LogoutIcon;
