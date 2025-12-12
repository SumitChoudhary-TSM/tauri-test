import { UserRoleOptions } from '@/constants/options';
import { UserRole } from '@/enum';

export const userTypeConfig = [
  {
    label: UserRole.BUYER_CAPITALIZE,
    value: UserRoleOptions.BUYER,
  },
  {
    label: UserRole.VENDOR_CAPITALIZE,
    value: UserRoleOptions.VENDOR,
  },
  {
    label: UserRole.ADMIN_CAPITALIZE,
    value: UserRoleOptions.MARKS_PRINT_ADMIN,
  },
];
