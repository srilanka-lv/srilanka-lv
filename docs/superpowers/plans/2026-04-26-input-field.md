# InputField Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a props-driven `InputField` component wrapping Ark UI's Field primitives, usable with and without React Hook Form.

**Architecture:** A single `InputField` function component that composes Ark UI Field sub-components internally. Styled with vanilla-extract `recipe()` for size variants. Error state derived from `errorMessage` prop. Loading state shows a `Spinner` from shared components.

**Tech Stack:** Ark UI (`@ark-ui/react`), vanilla-extract (recipes), React 19 (ref as prop), Storybook, Bun

**Spec:** `docs/superpowers/specs/2026-04-26-input-field-design.md`

---

### Task 1: Install @ark-ui/react

**Files:**
- Modify: `apps/web/package.json`

- [ ] **Step 1: Install the package**

Run:
```bash
cd apps/web && bun add @ark-ui/react
```

- [ ] **Step 2: Verify installation**

Run:
```bash
cd apps/web && bun run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/web/package.json ../../bun.lock
git commit -m "chore: 📦 add @ark-ui/react dependency"
```

---

### Task 2: Add error color tokens to the theme

**Files:**
- Modify: `apps/web/src/shared/styles/themes/theme.contract.css.ts` (add `error` and `errorForeground` to `color`)
- Modify: `apps/web/src/shared/styles/tokens/colors.ts` (add error values to both `lightColors` and `darkColors`)

- [ ] **Step 1: Add error tokens to the theme contract**

In `apps/web/src/shared/styles/themes/theme.contract.css.ts`, add `error` and `errorForeground` to the `color` object:

```ts
color: {
  background: null,
  foreground: null,
  primary: null,
  primaryForeground: null,
  secondary: null,
  secondaryForeground: null,
  accent: null,
  accentForeground: null,
  error: null,
  errorForeground: null,
},
```

- [ ] **Step 2: Add light error color values**

In `apps/web/src/shared/styles/tokens/colors.ts`, add to `lightColors`:

```ts
export const lightColors = {
  background: '#f7f9f7',
  foreground: 'oklch(14.7% 0.004 49.25)',
  primary: 'oklch(21.6% 0.006 56.043)',
  primaryForeground: '#ffffff',
  secondary: 'oklch(97% 0.001 106.424)',
  secondaryForeground: 'oklch(21.6% 0.006 56.043)',
  accent: 'oklch(76.8% 0.233 130.85)',
  accentForeground: 'oklch(27.4% 0.072 132.109)',
  error: 'oklch(63.7% 0.237 25.331)',
  errorForeground: 'oklch(63.7% 0.237 25.331)',
};
```

- [ ] **Step 3: Add dark error color values**

In `apps/web/src/shared/styles/tokens/colors.ts`, add to `darkColors`:

```ts
export const darkColors = {
  background: 'oklch(14.7% 0.004 49.25)',
  foreground: 'oklch(98.5% 0.001 106.423)',
  primary: 'oklch(98.5% 0.001 106.423)',
  primaryForeground: 'oklch(21.6% 0.006 56.043)',
  secondary: 'oklch(26.8% 0.007 34.298)',
  secondaryForeground: 'oklch(98.5% 0.001 106.423)',
  accent: 'oklch(76.8% 0.233 130.85)',
  accentForeground: 'oklch(27.4% 0.072 132.109)',
  error: 'oklch(70.4% 0.191 22.216)',
  errorForeground: 'oklch(70.4% 0.191 22.216)',
};
```

- [ ] **Step 4: Verify build**

Run:
```bash
cd apps/web && bun run build
```
Expected: Build succeeds. The new tokens are available via `vars.color.error` and `vars.color.errorForeground`.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/shared/styles/themes/theme.contract.css.ts apps/web/src/shared/styles/tokens/colors.ts
git commit -m "feat: 🎨 add error color tokens to theme contract"
```

---

### Task 3: Create Spinner shared component

**Files:**
- Create: `apps/web/src/shared/components/spinner/index.tsx`
- Create: `apps/web/src/shared/components/spinner/styles.css.ts`
- Create: `apps/web/src/shared/components/spinner/index.stories.ts`

- [ ] **Step 1: Create spinner styles**

Create `apps/web/src/shared/components/spinner/styles.css.ts`:

```ts
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

export const spinnerStyles = recipe({
  base: {
    display: 'inline-block',
    borderRadius: '50%',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: vars.color.secondary,
    borderTopColor: vars.color.foreground,
    animation: `${spin} 0.6s linear infinite`,
  },
  variants: {
    size: {
      small: {
        width: '16px',
        height: '16px',
      },
      medium: {
        width: '24px',
        height: '24px',
      },
      large: {
        width: '32px',
        height: '32px',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});
```

- [ ] **Step 2: Create Spinner component**

Create `apps/web/src/shared/components/spinner/index.tsx`:

```tsx
import clsx from 'clsx';

import { spinnerStyles } from './styles.css';

type SpinnerProps = {
  size?: 'small' | 'medium' | 'large';
  className?: string;
};

export function Spinner({ size, className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={clsx(spinnerStyles({ size }), className)}
    />
  );
}
```

- [ ] **Step 3: Create Storybook stories**

Create `apps/web/src/shared/components/spinner/index.stories.ts`:

```ts
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Spinner } from './index';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: { size: 'small' },
};

export const Medium: Story = {
  args: { size: 'medium' },
};

export const Large: Story = {
  args: { size: 'large' },
};

export const SmallLight: Story = {
  args: { size: 'small' },
  globals: { theme: 'light' },
};

export const SmallDark: Story = {
  args: { size: 'small' },
  globals: { theme: 'dark' },
};
```

- [ ] **Step 4: Verify in Storybook**

Run:
```bash
cd apps/web && bun run storybook
```
Expected: Navigate to Components/Spinner. All size variants render as spinning circles.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/shared/components/spinner/
git commit -m "feat: ✨ add Spinner shared component"
```

---

### Task 4: Create InputField component

**Files:**
- Create: `apps/web/src/features/forms/components/input-field/index.tsx`
- Create: `apps/web/src/features/forms/components/input-field/styles.css.ts`

- [ ] **Step 1: Create InputField styles**

Create `apps/web/src/features/forms/components/input-field/styles.css.ts`:

```ts
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const rootStyles = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing[1],
    width: '100%',
    selectors: {
      '&[data-disabled]': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    size: {
      small: {},
      medium: {},
      large: {},
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export const labelStyle = style({
  fontWeight: vars.font.weight.medium,
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.lineHeight.normal,
  color: vars.color.foreground,
});

export const inputWrapperStyle = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const inputStyles = recipe({
  base: {
    width: '100%',
    minWidth: 0,
    backgroundColor: 'transparent',
    border: `1px solid ${vars.color.secondary}`,
    borderRadius: vars.border.radius.medium,
    color: vars.color.foreground,
    fontFamily: 'inherit',
    outline: 'none',
    transition: `border-color ${vars.transition.duration.fast} ${vars.transition.easing.easeInOut}, box-shadow ${vars.transition.duration.fast} ${vars.transition.easing.easeInOut}`,
    selectors: {
      '&::placeholder': {
        color: vars.color.secondaryForeground,
        opacity: 0.5,
      },
      '&:focus': {
        borderColor: vars.focus.color,
        boxShadow: `0 0 0 ${vars.focus.width} ${vars.focus.color}`,
      },
      '&[data-invalid]': {
        borderColor: vars.color.error,
      },
      '&[data-invalid]:focus': {
        borderColor: vars.color.error,
        boxShadow: `0 0 0 ${vars.focus.width} ${vars.color.error}`,
      },
    },
  },
  variants: {
    size: {
      small: {
        fontSize: vars.font.size.xs,
        padding: `${vars.spacing[1]} ${vars.spacing[3]}`,
      },
      medium: {
        fontSize: vars.font.size.sm,
        padding: `${vars.spacing[2]} ${vars.spacing[4]}`,
      },
      large: {
        fontSize: vars.font.size.base,
        padding: `${vars.spacing[3]} ${vars.spacing[6]}`,
      },
    },
    loading: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: { loading: true, size: 'small' },
      style: { paddingRight: vars.spacing[8] },
    },
    {
      variants: { loading: true, size: 'medium' },
      style: { paddingRight: vars.spacing[10] },
    },
    {
      variants: { loading: true, size: 'large' },
      style: { paddingRight: vars.spacing[12] },
    },
  ],
  defaultVariants: {
    size: 'medium',
    loading: false,
  },
});

export const helperTextStyle = style({
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.normal,
  color: vars.color.secondaryForeground,
});

export const errorTextStyle = style({
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.normal,
  color: vars.color.error,
});

export const spinnerStyle = style({
  position: 'absolute',
  right: vars.spacing[3],
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
});
```

- [ ] **Step 2: Create InputField component**

Create `apps/web/src/features/forms/components/input-field/index.tsx`:

```tsx
import { Field } from '@ark-ui/react/field';
import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

import { Spinner } from '@/shared/components/spinner/index';

import {
  errorTextStyle,
  helperTextStyle,
  inputStyles,
  inputWrapperStyle,
  labelStyle,
  rootStyles,
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
  ref?: React.Ref<HTMLInputElement>;
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
      className={clsx(rootStyles({ size }), className)}
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
      {helperText && (
        <Field.HelperText className={helperTextStyle}>
          {helperText}
        </Field.HelperText>
      )}
      {errorMessage && (
        <Field.ErrorText className={errorTextStyle}>
          {errorMessage}
        </Field.ErrorText>
      )}
    </Field.Root>
  );
}
```

- [ ] **Step 3: Verify build**

Run:
```bash
cd apps/web && bun run build
```
Expected: Build succeeds with no type errors.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/features/forms/components/input-field/
git commit -m "feat: ✨ add InputField component"
```

---

### Task 5: Create InputField Storybook stories

**Files:**
- Create: `apps/web/src/features/forms/components/input-field/index.stories.ts`

- [ ] **Step 1: Create stories**

Create `apps/web/src/features/forms/components/input-field/index.stories.ts`:

```ts
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { InputField } from './index';

const meta = {
  title: 'Forms/InputField',
  component: InputField,
  args: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url', 'number'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: "We won't share your email" },
};

export const WithError: Story = {
  args: { errorMessage: 'Please enter a valid email address' },
};

export const WithHelperAndError: Story = {
  args: {
    helperText: "We won't share your email",
    errorMessage: 'Please enter a valid email address',
  },
};

export const Required: Story = {
  args: { required: true },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Cannot edit this' },
};

export const ReadOnly: Story = {
  args: { readOnly: true, value: 'readonly@example.com' },
};

export const Loading: Story = {
  args: { loading: true, value: 'checking...' },
};

export const Small: Story = {
  args: { size: 'small' },
};

export const Medium: Story = {
  args: { size: 'medium' },
};

export const Large: Story = {
  args: { size: 'large' },
};

export const Password: Story = {
  args: { label: 'Password', type: 'password', placeholder: 'Enter password' },
};

export const DefaultLight: Story = {
  globals: { theme: 'light' },
};

export const DefaultDark: Story = {
  globals: { theme: 'dark' },
};

export const ErrorLight: Story = {
  args: { errorMessage: 'Invalid email' },
  globals: { theme: 'light' },
};

export const ErrorDark: Story = {
  args: { errorMessage: 'Invalid email' },
  globals: { theme: 'dark' },
};
```

- [ ] **Step 2: Verify in Storybook**

Run:
```bash
cd apps/web && bun run storybook
```
Expected: Navigate to Forms/InputField. All stories render correctly:
- Default shows label + input
- WithHelperText shows helper text below input
- WithError shows red border and error text, helper text hidden
- WithHelperAndError shows error text when invalid, helper text hidden by Ark UI
- Loading shows disabled input with spinner
- Size variants show different padding/font sizes
- Light/dark themes apply correct colors

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/features/forms/components/input-field/index.stories.ts
git commit -m "feat: 📖 add InputField Storybook stories"
```
