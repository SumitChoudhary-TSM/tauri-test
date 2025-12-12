import { Option } from '@/styles/autocomplete/types';
import { RoleType } from '@/types';

export const UserRoleOptions = Object.freeze({
  MARKS_PRINT_ADMIN: 'marks_print_admin',
  BUYER: 'buyer',
  VENDOR: 'vendor',
});

export const stepsMap: Record<RoleType, number> = {
  buyer: 2,
  vendor: 2,
  marks_print_admin: 1,
};

export const algoOptions: Option[] = [
  { label: 'GID', value: 'GID' },
  { label: 'GTIN', value: 'GTIN' },
];
