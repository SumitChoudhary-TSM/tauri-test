import Dashboard from '@/components/dashboard';
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
];
