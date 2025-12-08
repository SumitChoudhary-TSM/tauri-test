import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteType } from './data';
import { UserRoleOptions } from '@/constants/options';

interface ProtectedRouteProps {
  children: ReactElement;
  loggedIn: boolean;
  to?: string;
  userRole?: string;
  element?: RouteType;
}

const ProtectedRoute = ({ children, loggedIn, to = '/', userRole = '', element }: ProtectedRouteProps) => {
  if (!loggedIn || (element?.marksPrintAdminOnly && userRole !== UserRoleOptions.MARKS_PRINT_ADMIN)) {
    return <Navigate to={to} replace />;
  }

  return children;
};

export default ProtectedRoute;
