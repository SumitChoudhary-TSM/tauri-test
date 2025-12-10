import { Autocomplete, Checkbox, TextField, ListItemText, Box, Chip } from '@mui/material';
import { FlatNode, Props } from './types';

export default function HierarchicalMultiSelect({ options, value, onChange, placeholder, size = 'medium' }: Props) {
  const flattenedOptions: FlatNode[] = options.flatMap((group) => [
    { ...group, isParent: true as const },
    ...(group.children || []).map((child) => ({
      ...child,
      parentValue: group.value,
      isParent: false as const,
    })),
  ]);

  const toggleValue = (selectedValue: string, isParent?: boolean) => {
    const newValue: Record<string, string[]> = { ...value };

    if (isParent) {
      const parent = options.find((o) => o.value === selectedValue);
      const childValues = parent?.children?.map((c) => c.value) || [];

      const allSelected = (newValue[selectedValue]?.length || 0) === childValues.length;

      if (allSelected) {
        delete newValue[selectedValue];
      } else {
        newValue[selectedValue] = childValues;
      }
    } else {
      const child = flattenedOptions.find((i) => !i.isParent && i.value === selectedValue) as FlatNode & {
        isParent: false;
        parentValue: string;
      };
      const parentValue = child.parentValue;

      const parentChildren = newValue[parentValue] || [];
      if (parentChildren.includes(selectedValue)) {
        newValue[parentValue] = parentChildren.filter((v) => v !== selectedValue);
      } else {
        newValue[parentValue] = [...parentChildren, selectedValue];
      }

      if (newValue[parentValue].length === 0) {
        delete newValue[parentValue];
      }
    }

    onChange(newValue);
  };

  const selectedFlat = flattenedOptions.filter(
    (opt) => !opt.isParent && value[opt.parentValue || '']?.includes(opt.value),
  );

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={flattenedOptions}
      value={selectedFlat}
      getOptionLabel={(option) => option.label}
      onChange={() => {}}
      renderInput={(params) => <TextField {...params} placeholder={placeholder} size={size} />}
      renderOption={(props, option) => {
        const isSelected = option.isParent
          ? (value[option.value]?.length || 0) === (option.children?.length || 0)
          : value[option.parentValue || '']?.includes(option.value);

        return (
          <li
            {...props}
            onClick={(e) => {
              e.stopPropagation();
              toggleValue(option.value, option.isParent);
            }}
          >
            <Checkbox
              size={size}
              checked={!!isSelected}
              sx={{
                pl: option.isParent ? 0 : 2,
                py: size === 'small' ? 0.5 : 1,
                ...(option.isParent ? {} : { ml: size === 'small' ? 1 : 2 }),
              }}
            />
            <ListItemText
              primary={option.label}
              sx={{
                my: size === 'small' ? 0.5 : 1,
              }}
            />
          </li>
        );
      }}
      renderValue={(selected) => (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2px',
            py: size === 'small' ? 0.25 : 0.5,
          }}
        >
          {(selected as FlatNode[]).map((item) => (
            <Chip key={item.value} label={item.label} size={size} />
          ))}
        </Box>
      )}
      fullWidth
    />
  );
}
