import React from 'react';
import { IconProps } from './type';

const UploadIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
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
        d="M5 20h14q.425 0 .713.288T20 21q0 .425-.288.713T19 22H5q-.425 0-.713-.288T4 21q0-.425.288-.713T5 20Zm5-2q-.425 0-.713-.288T9 17v-6H7.05q-.625 0-.9-.563t.1-1.062l4.95-6.35q.15-.2.363-.3t.437-.1q.225 0 .438.1t.362.3l4.95 6.35q.375.5.1 1.063t-.9.562H15v6q0 .425-.288.713T14 18h-4Z"
        fill={fill}
      />

      {useOverlay && <rect width="100%" height="100%" fill="rgba(0,0,0,0.1)" rx="4" />}
    </svg>
  );
};

export default UploadIcon;
