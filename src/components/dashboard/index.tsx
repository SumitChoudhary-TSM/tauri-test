import { Card, CardContent } from '@mui/material';

import { OrderTable } from '@/styles/order-table';
import Button from '@/styles/button';
import StatsCardList from '@/styles/stats-card/stats-card-list';
import { Heading, Paragraph } from '@/styles/typography';
import QuickLinks from '@/styles/quick-links';
import ArrowRightIcon from '@/styles/icons/ArrowRightIcon';
import { stats } from '@/constants/mock-data';

export default function MarksDashboard() {

  return (
    <div className="p-2 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Heading>Dashboard</Heading>
          <Paragraph>Welcome back, Marks Print Team</Paragraph>
        </div>
        <Button variantType="primary" sizeType="md" className="gap-2 text-md">
          <ArrowRightIcon color="var(--color-primary-foreground)" />
          New Review
        </Button>
      </div>

      <StatsCardList stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/40 rounded-xl">
          <CardContent>
            <OrderTable role="marks_print_admin" />
          </CardContent>
        </Card>

        <Card className="border-border/40 rounded-xl">
          <CardContent className="space-y-3">
            <QuickLinks role="marks_print_admin" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
