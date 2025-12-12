import { Stack } from '@mui/material';
import CustomInput from '@/styles/input';
import HierarchicalMultiSelect from '@/styles/heirarchical-multiselect';
import type { HierarchyNode } from '@/styles/heirarchical-multiselect/types';
import { Label } from '@/styles/typography';
import type { VendorStepsProps } from './types';
import { UserRole } from '@/enum';
import { NAME_REGEX, VENDOR_CODE_REGEX } from '@/constants/regex';

export default function VendorSteps({ activeStep, formMethods, buyers }: VendorStepsProps) {
  const register = formMethods?.register;
  const setValue = formMethods?.setValue;
  const watch = formMethods?.watch;
  const errors = formMethods?.formState?.errors;
  const selectedBrands = watch?.('selectedBrands') || {};

  const hierarchicalBrands: HierarchyNode[] = buyers.map((buyer) => ({
    label: buyer.label,
    value: buyer.value,
    children: buyer.brands.map((brand) => ({
      label: brand.label,
      value: brand.value,
    })),
  }));

  const handleBrandsChange = (newValues: Record<string, string[]>) => {
    setValue?.('selectedBrands', newValues, { shouldValidate: true });
  };

  if (activeStep === 0) {
    return (
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Label required>{UserRole.VENDOR_CAPITALIZE} Name</Label>
          <CustomInput
            label={`${UserRole.VENDOR_CAPITALIZE} Name`}
            placeholder={`Enter ${UserRole.VENDOR_SMALL_CASE} name`}
            type="text"
            size="small"
            errorText={errors?.name?.message}
            {...register?.('name', {
              required: 'name is required',
              minLength: { value: 2, message: 'name must be at least 2 characters' },
              pattern: {
                value: NAME_REGEX,
                message: "Only letters, spaces, apostrophes ('), and hyphens (-) are allowed, 2–50 characters.",
              },
            })}
          />
        </Stack>

        <Stack spacing={1}>
          <Label required>{UserRole.VENDOR_CAPITALIZE} Code</Label>
          <CustomInput
            label={`${UserRole.VENDOR_CAPITALIZE} Name`}
            placeholder={`Enter ${UserRole.VENDOR_SMALL_CASE} code`}
            type="text"
            size="small"
            errorText={errors?.code?.message}
            {...register?.('code', {
              required: 'code is required',
              pattern: {
                value: VENDOR_CODE_REGEX,
                message: 'code can only contain letters, numbers, and hyphens',
              },
            })}
          />
        </Stack>

        <Stack spacing={1}>
          <Label required>{UserRole.VENDOR_CAPITALIZE} Password</Label>
          <CustomInput
            label="Password"
            placeholder={`Enter ${UserRole.VENDOR_SMALL_CASE} password`}
            type="password"
            size="small"
            errorText={errors?.password?.message}
            {...register?.('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />
        </Stack>
      </Stack>
    );
  }

  if (activeStep === 1) {
    return (
      <Stack spacing={1} my={2}>
        <Label required>
          Select {UserRole.BUYER_CAPITALIZE} and {UserRole.BRAND_CAPITALIZE}
        </Label>
        <HierarchicalMultiSelect
          options={hierarchicalBrands}
          value={selectedBrands}
          onChange={handleBrandsChange}
          placeholder={`Choose ${UserRole.BUYER_SMALL_CASE} and/or ${UserRole.BRAND_SMALL_CASE}...`}
          size="small"
        />
      </Stack>
    );
  }

  return null;
}
