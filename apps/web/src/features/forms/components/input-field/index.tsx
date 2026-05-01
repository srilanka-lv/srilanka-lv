import { Field } from '@ark-ui/react/field';
import clsx from 'clsx';
import type { ComponentPropsWithoutRef, Ref } from 'react';

import { Spinner } from '@/shared/components/spinner/index';

import {
  errorTextStyle,
  helperTextStyle,
  inputStyles,
  inputWrapperStyle,
  labelStyle,
  rootStyle,
  spinnerStyle,
} from './styles.css';

type InputFieldOwnProps = {
  label: string;
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number';
  size?: 'small' | 'medium' | 'large';
  helperText?: string;
  errorMessage?: string;
  loading?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  ref?: Ref<HTMLInputElement>;
};

export type InputFieldProps = InputFieldOwnProps &
  Omit<ComponentPropsWithoutRef<'input'>, keyof InputFieldOwnProps>;

export function InputField({
  label,
  type = 'text',
  size = 'medium',
  helperText,
  errorMessage,
  loading,
  required,
  disabled,
  readOnly,
  ref,
  className,
  ...inputProps
}: InputFieldProps) {
  return (
    <Field.Root
      invalid={!!errorMessage}
      required={required}
      disabled={disabled || loading}
      readOnly={readOnly}
      className={clsx(rootStyle, className)}
    >
      <Field.Label className={labelStyle}>{label}</Field.Label>
      <div className={inputWrapperStyle}>
        <Field.Input
          type={type}
          ref={ref}
          className={inputStyles({ size, loading: loading || undefined })}
          {...inputProps}
        />
        {loading && <Spinner size="small" className={spinnerStyle} />}
      </div>
      {helperText && <Field.HelperText className={helperTextStyle}>{helperText}</Field.HelperText>}
      {errorMessage && <Field.ErrorText className={errorTextStyle}>{errorMessage}</Field.ErrorText>}
    </Field.Root>
  );
}
