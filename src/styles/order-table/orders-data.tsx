import { UserRoleOptions } from '@/constants/options';
import { RoleType } from '@/styles/navbar/types';

export const getOrdersByRole = (role: RoleType) => {
  switch (role) {
    case UserRoleOptions.MARKS_PRINT_ADMIN:
      return [
        {
          id: 'ORD-2025-002',
          from: 'Tata Trent (Buyer)',
          brand: 'Westside',
          qty: 10000,
          type: 'Hang Tag',
          status: 'pending-review',
          date: '2025-03-02',
        },
        {
          id: 'ORD-2025-003',
          from: 'ABC Textiles',
          brand: 'Burnt Toast',
          qty: 3000,
          type: 'Pasted Card',
          status: 'in-production',
          date: '2025-02-28',
        },
        {
          id: 'ORD-2025-004',
          from: 'Reliance Retail',
          brand: 'Trends',
          qty: 8000,
          type: 'Woven Label',
          status: 'approved',
          date: '2025-02-25',
        },
      ];

    case UserRoleOptions.VENDOR:
      return [
        {
          id: 'VEND-2025-001',
          from: 'My Textile Co.',
          brand: 'Local Brand',
          qty: 2000,
          type: 'RFID Sticker',
          status: 'pending-review',
          date: '2025-03-03',
        },
        {
          id: 'VEND-2025-002',
          from: 'Vendor Supplies',
          brand: 'Small Business',
          qty: 1500,
          type: 'Hang Tag',
          status: 'in-production',
          date: '2025-03-02',
        },
        {
          id: 'VEND-2025-003',
          from: 'Textile Vendor Inc.',
          brand: 'Startup Brand',
          qty: 4000,
          type: 'Pasted Card',
          status: 'approved',
          date: '2025-02-28',
        },
      ];

    case UserRoleOptions.BUYER:
      return [
        {
          id: 'BUYR-2025-001',
          from: 'My Purchase Dept',
          brand: 'My Brand',
          qty: 3000,
          type: 'RFID Sticker',
          status: 'pending-review',
          date: '2025-03-04',
        },
        {
          id: 'BUYR-2025-002',
          from: 'My Purchase Dept',
          brand: 'My Brand',
          qty: 5000,
          type: 'Hang Tag',
          status: 'in-production',
          date: '2025-03-03',
        },
        {
          id: 'BUYR-2025-003',
          from: 'My Purchase Dept',
          brand: 'My Brand',
          qty: 2000,
          type: 'Woven Label',
          status: 'approved',
          date: '2025-03-01',
        },
      ];

    default:
      return [];
  }
};

export const getTableTitle = (role: RoleType) => {
  const roleTitles = {
    [UserRoleOptions.MARKS_PRINT_ADMIN]: 'Order Management',
    [UserRoleOptions.VENDOR]: 'My Orders',
    [UserRoleOptions.BUYER]: 'Purchase Orders',
  };

  const statusDescriptions = {
    [UserRoleOptions.MARKS_PRINT_ADMIN]: 'New orders waiting for acceptance',
    [UserRoleOptions.VENDOR]: 'Purchase Order submitted by you',
    [UserRoleOptions.BUYER]: 'Purchase Order submitted by you',
  };

  return {
    title: roleTitles[role] || 'Orders',
    description: statusDescriptions[role] || '',
  };
};
