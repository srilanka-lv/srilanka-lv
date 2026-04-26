# InputField Component Design

## Overview

A props-driven `InputField` component wrapping Ark UI's Field primitives. Decoupled from React Hook Form but designed to work seamlessly with it via standard props and `ref` (React 19).

## Location

`apps/web/src/features/forms/components/input-field/`

Files:
- `index.tsx` — component
- `styles.css.ts` — vanilla-extract recipe
- `index.stories.ts` — Storybook stories

## API

```tsx
type InputFieldProps = {
  label: string;
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number';
  size?: 'small' | 'medium' | 'large';
  helperText?: string;
  errorMessage?: string;
  loading?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  ref?: React.Ref<HTMLInputElement>;
} & Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type'>;
```

### Prop behavior

- `errorMessage` — when truthy, sets `invalid` on Ark UI's `Field.Root`. No separate `invalid` prop.
- `loading` — disables the input and shows a right-aligned spinner inside the input.
- `size` — controls padding and font size via vanilla-extract recipe variants (`small | medium | large`).
- `type` — restricted to text-like input types that share the same single-line styling.
- `ref` — regular prop (React 19), passed through to `Field.Input` for React Hook Form's `register()`.
- All remaining native input props spread onto `Field.Input`.

## Usage

```tsx
// Standalone
<InputField
  label="Email"
  type="email"
  helperText="We won't share it"
/>

// With React Hook Form + Zod
<InputField
  label="Email"
  type="email"
  errorMessage={errors.email?.message}
  {...register('email')}
/>

// Loading state
<InputField
  label="Username"
  loading
/>
```

## Component internals

```tsx
function InputField({ label, type, size, helperText, errorMessage, loading, required, disabled, readOnly, ref, className, ...inputProps }: InputFieldProps) {
  return (
    <Field.Root invalid={!!errorMessage} required={required} disabled={disabled || loading} readOnly={readOnly} className={clsx(rootStyles({ size }), className)}>
      <Field.Label className={labelStyle}>{label}</Field.Label>
      <div className={inputWrapperStyle}>
        <Field.Input type={type} ref={ref} className={inputStyle({ size })} {...inputProps} />
        {loading && <Spinner className={spinnerStyle} />}
      </div>
      {helperText && <Field.HelperText className={helperTextStyle}>{helperText}</Field.HelperText>}
      {errorMessage && <Field.ErrorText className={errorTextStyle}>{errorMessage}</Field.ErrorText>}
    </Field.Root>
  );
}
```

### Key decisions

- `invalid` is derived from `!!errorMessage` — single source of truth.
- `HelperText` and `ErrorText` both render when their props are provided. Ark UI toggles visibility via `data-*` attributes based on the invalid state — no manual conditional logic around invalid needed.
- A wrapper `div` around the input provides `position: relative` for absolute-positioning the spinner.
- Input gets extra right padding when loading to prevent text/spinner overlap.
- `className` is applied to `Field.Root` for external layout control (margin, width, etc.).

## Styling

File: `styles.css.ts` using vanilla-extract `recipe()`.

### Root styles
- Flex column layout with gap for spacing between label, input, and helper/error text.

### Label styles
- Font weight medium, font size derived from the size variant.

### Input wrapper
- `position: relative` to anchor the spinner.

### Input styles (recipe with size variant)
- `small` / `medium` / `large` — mirrors Button's sizing scale for padding and font size.
- Transparent background, border using theme tokens.
- Focus ring using `vars.focus` tokens.
- `[data-invalid]` state — Ark UI sets this automatically — changes border color to error color token.
- Compound variant: extra right padding when loading.

### Helper text
- Muted foreground color, small font size.

### Error text
- Uses `vars.color.error` token, small font size.

### Spinner positioning
- Absolute positioned inside the input wrapper, vertically centered, right-aligned with padding.

## Dependencies & prerequisites

### New package
- `@ark-ui/react`

### New shared component
- `shared/components/spinner` — simple CSS-animated spinner with `small | medium | large` size variant. Inside `InputField`, always use the `small` size regardless of the field's size.

### Theme contract additions
- `vars.color.error` and `vars.color.errorForeground` tokens added to `theme.contract.css.ts`.
- Values added to both `theme.light.css.ts` and `theme.dark.css.ts`.

### No changes needed to
- React Hook Form — already installed, `InputField` has no dependency on it.
- Zod — no coupling.

## Architectural constraints

- Ark UI references must stay in `shared/components` or `features/forms` — never in other feature folders.
- No barrel exports — consumers import from specific file paths.
- `InputField` must work with and without React Hook Form.
