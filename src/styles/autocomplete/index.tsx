import React from 'react';
import { Autocomplete, TextField, Chip, Box, FormHelperText, FormControl } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { AutocompleteFieldProps, Option } from './types';

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
  placeholder,
  options,
  value,
  multiple = false,
  onChange,
  name,
  errorText,
  required = false,
  control,
  size = 'medium',

  className,
  sx,
  autocompleteClassName,
  autocompleteSx,
  textFieldClassName,
  textFieldSx,
  chipClassName,
  chipSx,
  errorClassName,
  errorSx,
}) => {
  const formContext = useFormContext();
  const isInsideForm = !!formContext || !!control;

  const renderChips = (selected: Option[]) => (
    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
      {selected.map((item) => (
        <Chip key={item.value} label={item.label} size="small" className={chipClassName} sx={chipSx} />
      ))}
    </Box>
  );

  const renderHelper = (msg?: string) =>
    msg ? (
      <FormHelperText className={errorClassName} sx={errorSx}>
        {msg}
      </FormHelperText>
    ) : null;

  const hasValue = (v: Option | Option[] | null | undefined) => (multiple ? Array.isArray(v) && v.length > 0 : !!v);

  if (isInsideForm && name) {
    return (
      <Controller
        name={name}
        control={control || formContext?.control}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error} className={className} sx={sx}>
            <Autocomplete
              multiple={multiple}
              options={options}
              className={autocompleteClassName}
              sx={autocompleteSx}
              value={field.value || (multiple ? [] : null)}
              onChange={(_, val) => field.onChange(val)}
              getOptionLabel={(opt) => opt?.label ?? ''}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className={textFieldClassName}
                  sx={textFieldSx}
                  placeholder={hasValue(field.value) ? undefined : placeholder}
                  error={!!error}
                  required={required}
                  size={size}
                  slotProps={{
                    inputLabel: {
                      shrink: false,
                    },
                  }}
                />
              )}
              renderValue={(selected: Option | Option[]) =>
                Array.isArray(selected) ? renderChips(selected) : (selected?.label ?? '')
              }
              fullWidth
            />

            {renderHelper(error?.message || errorText)}
          </FormControl>
        )}
      />
    );
  }

  return (
    <FormControl fullWidth className={className} sx={sx} error={!!errorText}>
      <Autocomplete
        multiple={multiple}
        options={options}
        className={autocompleteClassName}
        sx={autocompleteSx}
        value={value || (multiple ? [] : null)}
        onChange={(_, val) => onChange?.(val)}
        getOptionLabel={(opt) => opt?.label ?? ''}
        renderInput={(params) => (
          <TextField
            {...params}
            className={textFieldClassName}
            sx={textFieldSx}
            placeholder={hasValue(value) ? undefined : placeholder}
            error={!!errorText}
            required={required}
            size={size}
            slotProps={{
              inputLabel: {
                shrink: false,
              },
            }}
          />
        )}
        renderValue={(selected: Option | Option[]) =>
          Array.isArray(selected) ? renderChips(selected) : (selected?.label ?? '')
        }
        fullWidth
      />

      {renderHelper(errorText)}
    </FormControl>
  );
};

export default AutocompleteField;
