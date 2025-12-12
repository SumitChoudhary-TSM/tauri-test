import { Stack } from '@mui/material';
import CustomInput from '@/styles/input';
import { Label } from '@/styles/typography';
import type { AdminStepProps } from './types';
import { UserRole } from '@/enum';
import { EMAIL_REGEX, NAME_REGEX } from '@/constants/regex';

export default function AdminStep({ formMethods }: AdminStepProps) {
  const { register, formState } = formMethods || {};
  const errors = formState?.errors || {};

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Label required>{UserRole.ADMIN_CAPITALIZE} Name</Label>
        <CustomInput
          label="Name"
          placeholder={`Enter ${UserRole.ADMIN_SMALL_CASE} name`}
          type="text"
          size="small"
          errorText={errors?.name?.message}
          {...register?.('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
            pattern: {
              value: NAME_REGEX,
              message: "Only letters, spaces, apostrophes ('), and hyphens (-) are allowed, 2–50 characters.",
            },
          })}
        />
      </Stack>

      <Stack spacing={1}>
        <Label required>{UserRole.ADMIN_CAPITALIZE} Email</Label>
        <CustomInput
          label="Email"
          placeholder={`Enter ${UserRole.ADMIN_SMALL_CASE} email`}
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
        <Label required>{UserRole.ADMIN_CAPITALIZE} Password</Label>
        <CustomInput
          label="Password"
          placeholder={`Enter ${UserRole.ADMIN_SMALL_CASE} password`}
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
