import React, { ChangeEventHandler, FocusEventHandler, Ref } from 'react';
import { FormControl, OutlinedInput, FormHelperText } from '@mui/material';
import type { FormControlProps } from '@mui/material/FormControl';
import type { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { cn } from '@/utils/cn';
import { FieldError, FieldErrorsImpl, FieldValues, Merge } from 'react-hook-form';

interface InputControlProps {
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name?: string;
  ref?: Ref<unknown>;
}

interface CustomInputProps extends FormControlProps {
  label?: string;
  placeholder?: string;
  errorText?: string | FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>> | undefined;
  inputProps?: OutlinedInputProps;
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  className?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ placeholder, errorText, inputProps, className, type = 'text', ...props }, ref) => {
    const {
      onChange,
      onBlur,
      name,
      ref: _ignoredRef,
      ...formControlProps
    } = props as InputControlProps & FormControlProps;
    void _ignoredRef;

    const getErrorMessage = (): string | undefined => {
      if (!errorText) return undefined;

      if (typeof errorText === 'string') {
        return errorText;
      }

      if (typeof errorText === 'object' && errorText !== null && 'message' in errorText) {
        return errorText.message as string;
      }

      return String(errorText);
    };

    const errorMessage = getErrorMessage();
    const isError = !!errorMessage;

    return (
      <FormControl
        {...formControlProps}
        variant="outlined"
        error={isError}
        className={cn('w-full', className)}
        size={props.size}
      >
        <OutlinedInput
          {...inputProps}
          inputRef={ref}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          className={cn(
            'rounded-xl! bg-background! text-foreground! border-border!',
            '[&_input::placeholder]:text-muted-foreground!',
            'transition-all!',
            inputProps?.className,
          )}
        />

        {isError ? <FormHelperText>{errorMessage}</FormHelperText> : ''}
      </FormControl>
    );
  },
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
