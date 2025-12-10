export interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  bgColor?: string;
}

export interface StatsCardListProps {
  stats: StatsCardProps[];
}
