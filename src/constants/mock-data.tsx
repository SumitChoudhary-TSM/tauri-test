import CheckIcon from '@/styles/icons/CheckIcon';
import ClockIcon from '@/styles/icons/ClockIcon';
import ErrorIcon from '@/styles/icons/ErrorIcon';
import ShippingIcon from '@/styles/icons/ShippingIcon';
import { Buyer, FormData } from '@/styles/user/types';

export const stats = [
  { label: 'Pending Review', value: 12, icon: <ErrorIcon />, bgColor: 'bg-badge-amber' },
  { label: 'In Production', value: 24, icon: <ClockIcon />, bgColor: 'bg-badge-blue' },
  { label: 'Ready to Ship', value: 8, icon: <CheckIcon />, bgColor: 'bg-badge-orange' },
  { label: 'This Month Revenue', value: '$45,230', icon: <ShippingIcon />, bgColor: 'bg-muted' },
];

export const buyers: Buyer[] = [
  {
    label: 'Buyer A',
    value: 'Buyer A',
    brands: [
      {
        label: 'Brand A1',
        value: 'Brand A1',
      },
      {
        label: 'Brand A2',
        value: 'Brand A2',
      },
    ],
  },
  {
    label: 'Buyer B',
    value: 'Buyer B',
    brands: [
      {
        label: 'Brand B1',
        value: 'Brand B1',
      },
      {
        label: 'Brand B2',
        value: 'Brand B2',
      },
    ],
  },
];

export const DummyUserData: FormData[] = [
  {
    _id: '12ddfs',
    role: 'buyer',
    name: 'Buyer Test',
    email: 'buyer@example.com',
    password: 'buyer123',
    brands: [
      {
        name: 'Brand A',
        startNumber: '1000',
        algo: { label: 'GID', value: 'GID' },
      },
    ],
  },

  {
    _id: '87dfs',
    role: 'vendor',
    name: 'Vendor Test',
    code: 'VND123',
    password: 'vendor123',
    selectedBrands: {
      'Buyer A': ['Brand A1', 'Brand A2'],
      'Buyer B': ['Brand B1', 'Brand B2'],
    },
  },

  {
    _id: '7sdfd98798',
    role: 'marks_print_admin',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
  },
];
