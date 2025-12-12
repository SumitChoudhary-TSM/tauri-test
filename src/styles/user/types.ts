import { RoleType } from '@/types';
import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Option } from '@/styles/autocomplete/types';

export interface BuyerFormData {
  _id?: string;
  name: string;
  email?: string;
  password: string;
  brands?: {
    name: string;
    startNumber: string;
    algo: Option;
    generateEpc?: boolean;
  }[];
  role: RoleType;
}

export interface VendorFormData {
  _id?: string;
  name: string;
  code?: string;
  password: string;
  selectedBrands?: Record<string, string[]>;
  role: RoleType;
}

export interface AdminFormData {
  _id?: string;
  name: string;
  email?: string;
  password: string;
  role: RoleType;
}

export type FormData = BuyerFormData | VendorFormData | AdminFormData;

export interface UserDialogProps {
  triggerButton?: ReactNode | string;
  initialData?: FormData;

  onSubmit?: (data: FormData) => void;
  onUpdate?: (data: FormData) => void;
}

export interface Brands {
  label: string;
  value: string;
}

export interface Buyer {
  label: string;
  value: string;
  brands: Brands[];
}

export interface Props {
  onSelect: (t: RoleType) => void;
}

export interface AdminStepProps {
  formMethods?: UseFormReturn<AdminFormData>;
}

export interface BuyerStepsProps {
  activeStep: number;
  formMethods?: UseFormReturn<BuyerFormData>;
}

export interface VendorStepsProps {
  activeStep: number;
  formMethods?: UseFormReturn<VendorFormData>;
  buyers: Buyer[];
}
