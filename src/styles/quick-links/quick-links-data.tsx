import { UserRoleOptions } from '@/constants/options';
import { RoleType } from '@/styles/navbar/types';

export interface QuickLink {
  id: number;
  action: string;
}

export const QUICK_LINKS_BY_ROLE: Record<string, QuickLink[]> = {
  [UserRoleOptions.MARKS_PRINT_ADMIN]: [
    { id: 1, action: 'Generate Artwork' },
    { id: 2, action: 'Ship Order' },
    { id: 3, action: 'View Reports' },
    { id: 4, action: 'Manage Users' },
  ],
  [UserRoleOptions.VENDOR]: [
    { id: 1, action: 'Create Order' },
    { id: 2, action: 'Track Orders' },
    { id: 3, action: 'View Document' },
  ],
  [UserRoleOptions.BUYER]: [
    { id: 1, action: 'Place Order' },
    { id: 2, action: 'Approve Artwork' },
    { id: 3, action: 'Track Shipments' },
  ],
};

export const getActionRows = (role: RoleType): QuickLink[] => {
  return QUICK_LINKS_BY_ROLE[role] || [];
};
