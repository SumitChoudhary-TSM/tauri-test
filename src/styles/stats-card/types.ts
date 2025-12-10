export interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
}

export interface StatsCardListProps {
  stats: StatsCardProps[];
}
