import Dashboard from '@/components/dashboard';
import UserPage from '@/components/user';
import { ReactElement } from 'react';

export interface RouteType {
  name: string;
  path: string;
  element: ReactElement;
  isProtected?: boolean;
  marksPrintAdminOnly?: boolean;
  children?: RouteType[];
}

export const routes: RouteType[] = [
  {
    name: 'Home',
    path: '/',
    element: <Dashboard />,
  },
  {
    name: 'User',
    path: '/user',
    element: <UserPage />,
  },
];
