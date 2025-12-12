import { Stack } from '@mui/material';
import CustomButton from '@/styles/button';
import type { Props } from './types';
import { userTypeConfig } from './user-type-config';

export default function UserTypeSelector({ onSelect }: Props) {
  return (
    <Stack direction="column" spacing={2} p={2}>
      {userTypeConfig.map((item) => (
        <CustomButton
          key={item.value}
          variantType="outline"
          sizeType="md"
          onClick={() => onSelect(item.value)}
          className="w-full"
        >
          {item.label}
        </CustomButton>
      ))}
    </Stack>
  );
}
