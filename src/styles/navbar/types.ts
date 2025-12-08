import { UserRoleOptions } from '@/constants/options';

export type RoleType = (typeof UserRoleOptions)[keyof typeof UserRoleOptions];

export interface TopNavProps {
  role?: RoleType;
  isLoggedIn?: boolean;
  userName?: string;
  profileImage?: string;
}
