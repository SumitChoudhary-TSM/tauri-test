import React from 'react';
import { Card, CardContent, Box } from '@mui/material';
import { Description, Subheading } from '@/styles/typography';
import { StatsCardProps } from './types';

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon, color }) => {
  const hasIcon = Boolean(icon);

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: hasIcon ? 'row' : 'column',
          alignItems: hasIcon ? 'center' : 'center',
          justifyContent: hasIcon ? 'space-between' : 'center',
          textAlign: hasIcon ? 'left' : 'center',
          gap: hasIcon ? 2 : 0,
          py: 1,
        }}
      >
        <Box>
          {hasIcon ? (
            <>
              <Description>{label}</Description>
              <Subheading>{value}</Subheading>
            </>
          ) : (
            <>
              <Subheading>{value}</Subheading>
              <Description>{label}</Description>
            </>
          )}
        </Box>

        {hasIcon && (
          <Box
            sx={{ fontSize: 32 }}
            className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${color}`}
          >
            {icon}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
