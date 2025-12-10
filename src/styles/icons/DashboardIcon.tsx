import React from 'react';
import { IconProps } from './type';

const DashboardIcon: React.FC<IconProps> = ({
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
        d="M14 9q-.425 0-.713-.288T13 8V4q0-.425.288-.713T14 3h6q.425 0 .713.288T21 4v4q0 .425-.288.713T20 9h-6ZM4 13q-.425 0-.713-.288T3 12V4q0-.425.288-.713T4 3h6q.425 0 .713.288T11 4v8q0 .425-.288.713T10 13H4Zm10 8q-.425 0-.713-.288T13 20v-8q0-.425.288-.713T14 11h6q.425 0 .713.288T21 12v8q0 .425-.288.713T20 21h-6ZM4 21q-.425 0-.713-.288T3 20v-4q0-.425.288-.713T4 15h6q.425 0 .713.288T11 16v4q0 .425-.288.713T10 21H4Z"
        fill={fill}
      />

      {useOverlay && <rect width="100%" height="100%" fill="rgba(0,0,0,0.1)" rx="4" />}
    </svg>
  );
};

export default DashboardIcon;
