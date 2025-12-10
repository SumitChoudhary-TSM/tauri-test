import NotificationIcon from '@/styles/icons/NotificationIcon';
import UsersIcon from '@/styles/icons/UsersIcon';
import { Description, Label } from '@/styles/typography';
import { TopNavProps } from './types';
import { UserRoleOptions } from '@/constants/options';
import SearchBar from '@/styles/search-bar';
import { useState } from 'react';
import CustomIconButton from '@/styles/icon-button';
import { IconButton } from '@mui/material';

export function TopNav({ role = UserRoleOptions.MARKS_PRINT_ADMIN }: TopNavProps) {
  const [search, setSearch] = useState('');
  const roleLabels: Record<string, string> = {
    marks_print_admin: 'Marks Print Team',
    vendor: 'Vendor Portal',
    buyer: 'Buyer Portal',
  };

  return (
    <header className="border-b border-border/40 bg-card pl-16 lg:pl-0">
      <div className="flex items-center justify-end sm:justify-between h-16 px-6">
        <div className="hidden sm:flex flex-1 max-w-md">
          <SearchBar value={search} onSearch={(val) => setSearch(val)} onChange={() => {}} className="rounded-xl" />
        </div>

        <div className="flex items-center gap-4">
          <IconButton className="relative rounded-full flex items-center justify-center">
            <NotificationIcon color="var(--color-foreground)" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </IconButton>

          <div className="flex items-center gap-3 pl-4 border-l border-border/40">
            <div className="text-right">
              <Description>{roleLabels[role]}</Description>
              <Label>Active</Label>
            </div>

            <CustomIconButton
              sizeType="sm"
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-default"
            >
              <UsersIcon color="var(--color-foreground)" />
            </CustomIconButton>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
