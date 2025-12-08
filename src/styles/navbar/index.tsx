import Input from '@/styles/input';
import Button from '@/styles/button';
import SearchIcon from '@/styles/icons/SearchIcon';
import NotificationIcon from '@/styles/icons/NotificationIcon';
import UsersIcon from '@/styles/icons/UsersIcon';
import { H5, H4 } from '@/styles/typography';
import { TopNavProps } from './types';
import { UserRoleOptions } from '@/constants/options';

export function TopNav({ role = UserRoleOptions.MARKS_PRINT_ADMIN }: TopNavProps) {
  const roleLabels: Record<string, string> = {
    marks_print_admin: 'Marks Print Team',
    vendor: 'Vendor Portal',
    buyer: 'Buyer Portal',
  };

  return (
    <header className="border-b border-border/40 bg-card">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />

            <Input
              placeholder="Search orders, vendors..."
              type="text"
              size="small"
              className=" bg-secondary border border-border/40 placeholder-muted-foreground"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variantType="ghost"
            sizeType="sm"
            className="relative w-10 h-10 rounded-full flex items-center justify-center"
          >
            <NotificationIcon className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </Button>

          <div className="flex items-center gap-3 pl-4 border-l border-border/40">
            <div className="text-right">
              <H4>{roleLabels[role]}</H4>
              <H5>Active</H5>
            </div>

            <Button
              variantType="ghost"
              sizeType="sm"
              className="w-10 h-10 rounded-full flex items-center justify-center"
            >
              <UsersIcon className="w-5 h-5 text-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
