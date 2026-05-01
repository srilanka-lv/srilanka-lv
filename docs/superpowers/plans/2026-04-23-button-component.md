# Button Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a reusable, polymorphic button component with variant/size styling via vanilla-extract recipes.

**Architecture:** Single component with TypeScript generics for polymorphic `as` prop. Styles use `@vanilla-extract/recipes` recipe function mapping variant and size props to build-time class names. Storybook stories cover all combinations.

**Tech Stack:** React, TypeScript, vanilla-extract recipes, Storybook

**Spec:** `docs/superpowers/specs/2026-04-23-button-component-design.md`

---

### File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `apps/web/src/shared/components/button/index.styles.css.ts` | Recipe with variant and size styles |
| Modify | `apps/web/src/shared/components/button/index.tsx` | Polymorphic button component |
| Modify | `apps/web/src/shared/components/button/index.stories.ts` | Storybook stories |

---

### Task 1: Create the vanilla-extract recipe styles

**Files:**
- Modify: `apps/web/src/shared/components/button/index.styles.css.ts`

- [ ] **Step 1: Write the recipe**

```typescript
import { recipe } from '@vanilla-extract/recipes';

export const buttonStyles = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 150ms, border-color 150ms, color 150ms',
    border: '1px solid transparent',
    lineHeight: 1,
    textDecoration: 'none',
    selectors: {
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: '#0f172a',
        color: '#ffffff',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: '#1e293b',
          },
        },
      },
      secondary: {
        backgroundColor: '#f1f5f9',
        color: '#0f172a',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: '#e2e8f0',
          },
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: '#0f172a',
        borderColor: '#cbd5e1',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: '#f8fafc',
          },
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '#0f172a',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: '#f1f5f9',
          },
        },
      },
    },
    size: {
      small: {
        fontSize: '13px',
        padding: '6px 12px',
      },
      medium: {
        fontSize: '14px',
        padding: '8px 16px',
      },
      large: {
        fontSize: '16px',
        padding: '12px 24px',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project apps/web/tsconfig.json 2>&1 | grep button`
Expected: No errors related to button files

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/shared/components/button/index.styles.css.ts
git commit -m "feat: ✨ add button recipe styles"
```

---

### Task 2: Implement the polymorphic button component

**Files:**
- Modify: `apps/web/src/shared/components/button/index.tsx`

- [ ] **Step 1: Write the component**

```tsx
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { buttonStyles } from './index.styles.css';

type ButtonOwnProps<T extends ElementType = 'button'> = {
  as?: T;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  children: ReactNode;
};

type ButtonProps<T extends ElementType = 'button'> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>;

export function Button<T extends ElementType = 'button'>({
  as,
  variant,
  size,
  children,
  className,
  ...props
}: ButtonProps<T> & { className?: string }) {
  const Component = as ?? 'button';

  return (
    <Component
      className={`${buttonStyles({ variant, size })}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </Component>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project apps/web/tsconfig.json 2>&1 | grep button`
Expected: No errors related to button files

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/shared/components/button/index.tsx
git commit -m "feat: ✨ add polymorphic button component"
```

---

### Task 3: Write Storybook stories

**Files:**
- Modify: `apps/web/src/shared/components/button/index.stories.ts`

- [ ] **Step 1: Write the stories**

```typescript
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { Button } from './index';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { onClick: fn(), children: 'Button' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
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

export const Disabled: Story = {
  args: { disabled: true },
};

export const AsLink: Story = {
  args: {
    as: 'a',
    href: '/flights-calendar',
    children: 'Go to flights',
  },
};
```

- [ ] **Step 2: Verify Storybook renders**

Run: `bun run --filter @srilanka/web storybook` (if not already running)
Visit: `http://localhost:6006/?path=/story/components-button--primary`
Expected: Button renders with all variants/sizes working in the controls panel

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/shared/components/button/index.stories.ts
git commit -m "feat: ✨ add button storybook stories"
```
