import React from 'react';
import { FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { cn } from '@/utils/cn';
import { CustomTextareaProps } from './types';

const CustomTextarea = React.forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  (
    {
      label,
      placeholder,
      rows = 4,
      minHeight = '80px',
      maxHeight = '300px',
      resize = 'vertical',
      errorText,
      inputProps,
      labelProps,
      className,
      ...formControlProps
    },
    ref,
  ) => {
    const isError = !!errorText;

    return (
      <FormControl {...formControlProps} variant="outlined" error={isError} className={cn('w-full', className)}>
        {label && <InputLabel {...labelProps}>{label}</InputLabel>}

        <OutlinedInput
          {...inputProps}
          inputRef={ref}
          multiline
          rows={rows}
          placeholder={placeholder}
          className={cn(
            'rounded-md border px-3 py-2 bg-input text-foreground placeholder:text-muted-foreground shadow-sm',
            'transition-all disabled:opacity-50 disabled:cursor-not-allowed',
            `min-h-[${minHeight}] max-h-[${maxHeight}] resize-${resize}`,
            inputProps?.className,
          )}
        />

        {isError && <FormHelperText>{errorText}</FormHelperText>}
      </FormControl>
    );
  },
);

CustomTextarea.displayName = 'CustomTextarea';

export default CustomTextarea;
