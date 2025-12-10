import React from 'react';
import { IconProps } from './type';

const PlusCircleIcon: React.FC<IconProps> = ({
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
        d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4v4Zm1 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
        fill={fill}
      />

      {useOverlay && <rect width="100%" height="100%" fill="rgba(0,0,0,0.1)" rx="4" />}
    </svg>
  );
};

export default PlusCircleIcon;
