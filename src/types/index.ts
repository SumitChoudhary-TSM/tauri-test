import { UserRoleOptions } from '@/constants/options';

export type RoleType = (typeof UserRoleOptions)[keyof typeof UserRoleOptions];
