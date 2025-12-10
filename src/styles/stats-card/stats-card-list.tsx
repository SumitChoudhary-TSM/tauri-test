import React from 'react';
import { Box } from '@mui/material';
import StatsCard from './index';
import { StatsCardListProps } from './types';

const StatsCardList: React.FC<StatsCardListProps> = ({ stats }) => {
  return (
    <Box
      display="grid"
      gap={2}
      gridTemplateColumns={{
        xs: '1fr',
        sm: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
    >
      {stats.map((item, index) => (
        <StatsCard key={index} label={item.label} value={item.value} icon={item.icon} color={item.color} />
      ))}
    </Box>
  );
};

export default StatsCardList;
