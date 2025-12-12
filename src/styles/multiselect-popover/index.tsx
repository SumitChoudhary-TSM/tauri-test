import React, { useState, useMemo } from 'react';
import { Popover, MenuItem, Checkbox, ListItemText, Box, TextField, SvgIcon, SvgIconProps } from '@mui/material';
import CustomButton from '@/styles/button';
import { RoleSelectProps } from './types';
import ArrowUpIcon from '@/styles/icons/ArrowUpIcon';
import ArrowDownIcon from '@/styles/icons/ArrowDownIcon';

export default function MultiSelectPopover({
  title = 'Filter',
  value,
  onChange,
  roleOptions,
  buttonProps,
  popoverSx,
  menuItemSx,
  checkboxSx,
  listItemTextSx,
  closeOnSelect = false,
  showSearch = false,
  showIcon = false,
  maxHeight = 250,
  renderLabel,
  renderSelected,
  popoverWidth = 220,
  buttonWidth = 100,
}: RoleSelectProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [search, setSearch] = useState('');

  const openPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => setAnchorEl(null);

  const handleToggle = (val: string) => {
    const newValue = value.includes(val) ? value.filter((v) => v !== val) : [...value, val];

    onChange(newValue);
    if (closeOnSelect) closePopover();
  };

  const filteredOptions = useMemo(() => {
    return roleOptions.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()));
  }, [search, roleOptions]);

  const buttonTitle = renderSelected ? renderSelected(value) : title;

  const RoundedCheckboxIcon = (props: SvgIconProps) => (
    <SvgIcon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
    </SvgIcon>
  );

  const RoundedCheckedCheckboxIcon = (props: SvgIconProps) => (
    <SvgIcon {...props}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        ry="5"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" fill="none" />
    </SvgIcon>
  );

  return (
    <>
      {typeof title === 'string' ? (
        <CustomButton
          variantType="outline"
          sizeType="md"
          onClick={openPopover}
          {...buttonProps}
          sx={{ width: buttonWidth }}
          className="text-md gap-1"
        >
          {buttonTitle}
          {showIcon ? (
            anchorEl ? (
              <ArrowUpIcon width={24} height={24} />
            ) : (
              <ArrowDownIcon width={24} height={24} />
            )
          ) : null}
        </CustomButton>
      ) : (
        <div onClick={openPopover}>{title}</div>
      )}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '1rem',
          },
          ...popoverSx,
        }}
      >
        <Box sx={{ width: popoverWidth, p: 0.5 }}>
          {showSearch && (
            <TextField
              size="small"
              placeholder="Search..."
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mb: 1 }}
              className="rounded-xl"
            />
          )}

          <Box sx={{ maxHeight, overflowY: 'auto' }}>
            {filteredOptions.map((role) => {
              const checked = value.includes(role.value);

              return (
                <MenuItem
                  key={role.value}
                  onClick={() => handleToggle(role.value)}
                  sx={{
                    borderRadius: '0.75rem',
                    '&:hover': {
                      backgroundColor: 'color-mix(in srgb, var(--color-secondary) 50%, white)',
                    },
                    ...menuItemSx,
                  }}
                >
                  <Checkbox
                    checked={checked}
                    icon={<RoundedCheckboxIcon />}
                    checkedIcon={<RoundedCheckedCheckboxIcon />}
                    sx={{
                      p: 0,
                      pr: 1,
                      color: checked ? 'var(--color-primary)' : undefined,
                      '&.Mui-checked': { color: 'var(--color-primary)' },
                      '& .MuiSvgIcon-root': {
                        '&.MuiSvgIcon-root': {
                          fontSize: '1.4rem',
                        },
                      },
                      ...checkboxSx,
                    }}
                  />
                  <ListItemText primary={renderLabel ? renderLabel(role) : role.label} sx={listItemTextSx} />
                </MenuItem>
              );
            })}
          </Box>
        </Box>
      </Popover>
    </>
  );
}
