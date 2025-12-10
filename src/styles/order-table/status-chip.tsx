import { Chip } from '@mui/material';

interface StatusChipProps {
  status: string;
}

interface ChipVariant {
  label?: string;
  variant?: string;
  bgColor?: string;
  textColor?: string;
}

export function StatusChip({ status }: StatusChipProps) {
  const variants: Record<string, ChipVariant> = {
    'pending-review': {
      label: 'Pending Review',
      variant: 'filled',
      bgColor: 'var(--color-badge-amber)',
      textColor: 'var(--color-secondary-foreground)',
    },
    'in-production': {
      label: 'In Production',
      variant: 'filled',
      bgColor: 'var(--color-badge-blue)',
      textColor: 'var(--color-secondary-foreground)',
    },
    approved: {
      label: 'Approved',
      variant: 'outlined',
      bgColor: 'var(--color-badge-emerald)',
      textColor: 'var(--color-secondary-foreground)',
    },
  };

  const variant = variants[status];

  if (!variant) return null;

  return (
    <Chip
      label={variant.label}
      size="small"
      sx={{
        backgroundColor: variant.bgColor,
        color: variant.textColor,
        fontWeight: 500,
        textTransform: 'none',
        width: '100px',
      }}
    />
  );
}
