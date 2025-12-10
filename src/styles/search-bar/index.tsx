import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { SearchBarProps } from './types';
import { useDebounce } from '@/hooks/useDebounce';

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  delay = 500,
  placeholder = 'Search...',
  loading = false,
  size = 'small',
  minWidth = '100%',
  variant = 'outlined',
  className = '',
  sx = {},
  inputProps = {},
}) => {
  const [localValue, setLocalValue] = useState(value);
  const debouncedSearch = useDebounce(onSearch, delay);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    onChange(val);
    debouncedSearch(val);
  };

  return (
    <TextField
      fullWidth
      value={localValue}
      onChange={handleChange}
      placeholder={placeholder}
      size={size}
      variant={variant}
      className={className}
      sx={{ minWidth, ...sx }}
      slotProps={{
        input: {
          className: className,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {loading ? (
                <CircularProgress size={20} />
              ) : localValue ? (
                <IconButton
                  size="small"
                  onClick={() => {
                    setLocalValue('');
                    onChange('');
                    debouncedSearch('');
                  }}
                >
                  <CloseIcon />
                </IconButton>
              ) : null}
            </InputAdornment>
          ),
          ...inputProps,
        },
      }}
    />
  );
};

export default SearchBar;
