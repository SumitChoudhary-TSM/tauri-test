import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Label } from '@/styles/typography';
import { RoleType } from '../navbar/types';
import { UserRoleOptions } from '@/constants/options';

interface SidebarProps {
  role: RoleType;
}

export default function Sidebar({ role }: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const menuItems: Record<RoleType, { label: string; href: string; icon: typeof DashboardIcon }[]> = {
    [UserRoleOptions.MARKS_PRINT_ADMIN]: [
      { label: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
      { label: 'User', href: '/user', icon: AccountCircleIcon },
      { label: 'Orders', href: '/orders', icon: Inventory2Icon },
      { label: 'Artwork', href: '/artwork', icon: DescriptionIcon },
      { label: 'Production', href: '/production', icon: FlashOnIcon },
      { label: 'Shipping', href: '/shipping', icon: LocalShippingIcon },
      { label: 'Invoices', href: '/invoices', icon: DescriptionIcon },
      { label: 'Settings', href: '/settings', icon: SettingsIcon },
    ],

    [UserRoleOptions.VENDOR]: [
      { label: 'Dashboard', href: '/vendor/dashboard', icon: DashboardIcon },
      { label: 'Create Order', href: '/vendor/order-create', icon: AddCircleIcon },
      { label: 'My Orders', href: '/vendor/orders', icon: Inventory2Icon },
      { label: 'Track Orders', href: '/vendor/tracking', icon: LocalShippingIcon },
      { label: 'Documents', href: '/vendor/documents', icon: DescriptionIcon },
      { label: 'Settings', href: '/vendor/settings', icon: SettingsIcon },
    ],

    [UserRoleOptions.BUYER]: [
      { label: 'Dashboard', href: '/buyer/dashboard', icon: DashboardIcon },
      { label: 'Place Order', href: '/buyer/order-create', icon: AddCircleIcon },
      { label: 'My Orders', href: '/buyer/orders', icon: Inventory2Icon },
      { label: 'Approvals', href: '/buyer/approvals', icon: VisibilityIcon },
      { label: 'Documents', href: '/buyer/documents', icon: DescriptionIcon },
      { label: 'Settings', href: '/buyer/settings', icon: SettingsIcon },
    ],
  };

  const items = menuItems[role];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <Link to={`/${role}/dashboard`} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Inventory2Icon className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="font-bold text-foreground">Marks Print</div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.endsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-colors text-base',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent',
              )}
            >
              <Icon className="w-5 h-5" />
              <Label
                className={`font-medium ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                {' '}
                {item.label}{' '}
              </Label>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent w-full transition-colors">
          <LogoutIcon className="w-4 h-4" />
          <Label> Logout </Label>
        </button>
      </div>
    </aside>
  );
}
