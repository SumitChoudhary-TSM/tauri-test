import { Stack, Paper } from '@mui/material';
import { useFieldArray } from 'react-hook-form';
import CustomInput from '@/styles/input';
import CustomButton from '@/styles/button';
import AutocompleteField from '@/styles/autocomplete';
import { Label } from '@/styles/typography';
import type { BuyerStepsProps } from './types';
import { algoOptions } from '@/constants/options';
import { UserRole } from '@/enum';
import { EMAIL_REGEX, NAME_REGEX, NUMERIC_REGEX } from '@/constants/regex';
import CustomIconButton from '@/styles/icon-button';
import DeleteIcon from '@/styles/icons/DeleteIcon';
import { IOSSwitch } from '../switch';

export default function BuyerSteps({ activeStep, formMethods }: BuyerStepsProps) {
  const register = formMethods?.register;
  const control = formMethods?.control;
  const errors = formMethods?.formState?.errors;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'brands',
  });

  const addBrand = () => {
    append({ name: '', startNumber: '', algo: algoOptions[0], generateEpc: false });
  };

  const removeBrand = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  if (activeStep === 0) {
    return (
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Label required>{UserRole.BUYER_CAPITALIZE} Name</Label>
          <CustomInput
            label={`${UserRole.BUYER_CAPITALIZE} Name`}
            placeholder={`Enter ${UserRole.BUYER_SMALL_CASE} name`}
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
          <Label required>{UserRole.BUYER_CAPITALIZE} Email</Label>
          <CustomInput
            label="Email"
            placeholder={`Enter ${UserRole.BUYER_SMALL_CASE} email`}
            type="email"
            size="small"
            errorText={errors?.email?.message}
            {...register?.('email', {
              required: 'Email is required',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Invalid email address',
              },
            })}
          />
        </Stack>

        <Stack spacing={1}>
          <Label required>{UserRole.BUYER_CAPITALIZE} Password</Label>
          <CustomInput
            label="Password"
            placeholder={`Enter ${UserRole.BUYER_SMALL_CASE} password`}
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
      <Stack spacing={2}>
        {fields.map((field, index) => (
          <Paper
            key={field.id}
            sx={{
              p: 2,
              position: 'relative',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '0.75rem',
            }}
          >
            {fields.length > 1 ? (
              <CustomIconButton
                aria-label={`Remove ${UserRole.BRAND_SMALL_CASE} ${index + 1}`}
                onClick={() => removeBrand(index)}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 2,
                  right: 8,
                  padding: '4px',
                }}
              >
                <DeleteIcon width={20} height={20} color="var(--color-destructive)" />
              </CustomIconButton>
            ) : null}

            <Stack spacing={2}>
              <Stack spacing={1}>
                <Label required>{UserRole.BRAND_CAPITALIZE} Name</Label>
                <CustomInput
                  label={`${UserRole.BRAND_CAPITALIZE} Name`}
                  placeholder={`Enter ${UserRole.BRAND_SMALL_CASE} name`}
                  type="text"
                  size="small"
                  errorText={errors?.brands?.[index]?.name?.message}
                  {...register?.(`brands.${index}.name`, {
                    required: `${UserRole.BRAND_CAPITALIZE} name is required`,
                  })}
                />
              </Stack>

              <Stack spacing={1}>
                <Label required>Start Number</Label>
                <CustomInput
                  label="Start Number"
                  placeholder="Enter start number"
                  type="number"
                  size="small"
                  errorText={errors?.brands?.[index]?.startNumber?.message}
                  {...register?.(`brands.${index}.startNumber`, {
                    required: 'Start number is required',
                    pattern: {
                      value: NUMERIC_REGEX,
                      message: 'Must be a valid number',
                    },
                  })}
                />
              </Stack>

              <Stack spacing={1}>
                <Label required>Algorithm</Label>
                <AutocompleteField
                  placeholder="Select Algorithm"
                  size="small"
                  options={algoOptions}
                  errorText={errors?.brands?.[index]?.algo?.message}
                  name={`brands.${index}.algo`}
                  required
                />
              </Stack>
              <Stack spacing={2} direction="row" alignItems="center">
                <IOSSwitch {...register?.(`brands.${index}.generateEpc`)} />
                <Label>Generate EPC</Label>
              </Stack>
            </Stack>
          </Paper>
        ))}

        <CustomButton variantType="outline" sizeType="md" onClick={addBrand}>
          Add {UserRole.BRAND_CAPITALIZE}
        </CustomButton>
      </Stack>
    );
  }

  return null;
}
