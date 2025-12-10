import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Label, Subheading } from '@/styles/typography';
import { RoleType } from '@/styles/navbar/types';
import { UserRoleOptions } from '@/constants/options';
import CustomButton from '@/styles/button';
import DashboardIcon from '@/styles/icons/DashboardIcon';
import UserAccountIcon from '@/styles/icons/UserAccountIcon';
import InventoryIcon from '@/styles/icons/InventoryIcon';
import ArtworkIcon from '@/styles/icons/ArtworkIcon';
import FlashIcon from '@/styles/icons/FlashIcon';
import ShippingIcon from '@/styles/icons/ShippingIcon';
import SettingIcon from '@/styles/icons/SettingIcon';
import PlusCircleIcon from '@/styles/icons/PlusCircleIcon';
import ViewIcon from '@/styles/icons/ViewIcon';
import LogoutIcon from '@/styles/icons/LogoutIcon';
import MenuIcon from '@/styles/icons/MenuIcon';
import CustomIconButton from '@/styles/icon-button';

interface SidebarProps {
  role: RoleType;
}

const HamburgerButton = ({ isSidebarOpen, onToggle }: { isSidebarOpen: boolean; onToggle: () => void }) => (
  <CustomIconButton
    onClick={onToggle}
    size="medium"
    className={cn(
      'lg:hidden fixed top-2 left-4 z-50 p-2 rounded-lg hover:bg-sidebar-accent transition-opacity duration-300',
      isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100',
    )}
    aria-label="Toggle sidebar"
  >
    <MenuIcon width={28} height={28} />
  </CustomIconButton>
);

const MobileOverlay = ({ isSidebarOpen, onClose }: { isSidebarOpen: boolean; onClose: () => void }) => (
  <div
    className={cn(
      'lg:hidden fixed inset-0 bg-black transition-opacity duration-300 z-40',
      isSidebarOpen ? 'opacity-50 visible' : 'opacity-0 invisible',
    )}
    onClick={onClose}
  />
);

const MENU_ITEMS: Record<RoleType, { label: string; href: string; icon: typeof DashboardIcon }[]> = {
  [UserRoleOptions.MARKS_PRINT_ADMIN]: [
    { label: 'Dashboard', href: '/', icon: DashboardIcon },
    { label: 'User', href: '/user', icon: UserAccountIcon },
    { label: 'Orders', href: '/orders', icon: InventoryIcon },
    { label: 'Artwork', href: '/artwork', icon: ArtworkIcon },
    { label: 'Production', href: '/production', icon: FlashIcon },
    { label: 'Shipping', href: '/shipping', icon: ShippingIcon },
    { label: 'Invoices', href: '/invoices', icon: ArtworkIcon },
    { label: 'Settings', href: '/settings', icon: SettingIcon },
  ],

  [UserRoleOptions.VENDOR]: [
    { label: 'Dashboard', href: '/', icon: DashboardIcon },
    { label: 'Create Order', href: '/order-create', icon: PlusCircleIcon },
    { label: 'My Orders', href: '/orders', icon: InventoryIcon },
    { label: 'Track Orders', href: '/tracking', icon: ShippingIcon },
    { label: 'Documents', href: '/documents', icon: ArtworkIcon },
    { label: 'Settings', href: '/settings', icon: SettingIcon },
  ],

  [UserRoleOptions.BUYER]: [
    { label: 'Dashboard', href: '/', icon: DashboardIcon },
    { label: 'Place Order', href: '/order-create', icon: PlusCircleIcon },
    { label: 'My Orders', href: '/orders', icon: InventoryIcon },
    { label: 'Approvals', href: '/approvals', icon: ViewIcon },
    { label: 'Documents', href: '/documents', icon: ArtworkIcon },
    { label: 'Settings', href: '/settings', icon: SettingIcon },
  ],
};

export default function Sidebar({ role }: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (!mobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleLinkClick = useCallback(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  const items = MENU_ITEMS[role];

  return (
    <>
      <HamburgerButton isSidebarOpen={isSidebarOpen} onToggle={handleToggleSidebar} />
      <MobileOverlay isSidebarOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      <aside
        className={cn(
          'w-64 bg-sidebar border-r border-sidebar-border flex flex-col fixed lg:static h-screen z-50 transition-transform duration-300 ease-in-out',
          isMobile && !isSidebarOpen && '-translate-x-full',
          !isMobile && 'translate-x-0',
        )}
      >
        <div className="p-6 border-b border-sidebar-border">
          <Link to={`/`} className="flex items-center gap-2" onClick={handleLinkClick}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <InventoryIcon color="var(--color-sidebar-primary-foreground)" />
            </div>
            <Subheading className="text-foreground">Marks Print</Subheading>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.endsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={handleLinkClick}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 rounded-2xl transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent',
                )}
              >
                <Icon
                  color={isActive ? 'var(--color-sidebar-primary-foreground)' : 'var(--color-sidebar-foreground)'}
                />
                <Label
                  className={`font-medium text-base ${
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
          <CustomButton
            variantType="ghost"
            sizeType="md"
            className="gap-2 w-full text-base"
            onClick={() => console.log('Logout')}
          >
            <LogoutIcon />
            Logout
          </CustomButton>
        </div>
      </aside>
    </>
  );
}
