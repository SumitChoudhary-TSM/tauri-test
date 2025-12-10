import React from 'react';
import { IconProps } from './type';

const ArtworkIcon: React.FC<IconProps> = ({
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
        d="M8 18h8v-2H8v2Zm0-4h8v-2H8v2Zm-2 8q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h8l6 6v12q0 .825-.588 1.413T18 22H6Zm7-13h5l-5-5v5Z"
        fill={fill}
      />

      {useOverlay && <rect width="100%" height="100%" fill="rgba(0,0,0,0.1)" rx="4" />}
    </svg>
  );
};

export default ArtworkIcon;
