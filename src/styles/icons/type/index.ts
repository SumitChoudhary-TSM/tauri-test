export interface IconProps {
  height?: string | number;
  width?: string | number;
  color?: string;
  className?: string;
  scale?: number;
  useOverlay?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  fill?: string;
  viewBox?: string;
}
