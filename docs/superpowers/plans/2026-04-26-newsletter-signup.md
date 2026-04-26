# Newsletter Signup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a newsletter signup feature using Resend Audiences, with React Hook Form + Zod validation and a Next.js server action, following the existing repository/provider pattern.

**Architecture:** A `features/newsletter/` module provides a provider-agnostic abstraction (`NewsletterProviderInterface` / `NewsletterRepositoryInterface`) with a single `addContact(email)` method. Only the `DefaultResendProvider` references the Resend SDK. A server action in the layout feature bridges the form to the newsletter repository. The form uses React Hook Form + Zod for client-side validation and replaces itself with a success message on completion.

**Tech Stack:** Resend SDK, React Hook Form, Zod v4, Next.js server actions, vanilla-extract

**Spec:** `docs/superpowers/specs/2026-04-26-newsletter-signup-design.md`

---

### Task 1: Install dependencies

**Files:**
- Modify: `apps/web/package.json`

- [ ] **Step 1: Install packages**

Run:
```bash
cd apps/web && bun add resend @hookform/resolvers
```

Note: `zod` and `react-hook-form` are already installed.

- [ ] **Step 2: Verify build**

Run:
```bash
cd apps/web && bun run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/web/package.json ../../bun.lock
git commit -m "chore: 📦 add resend and @hookform/resolvers dependencies"
```

---

### Task 2: Create newsletter provider/repository

**Files:**
- Create: `apps/web/src/features/newsletter/models/newsletter-add-contact-result-model.ts`
- Create: `apps/web/src/features/newsletter/interfaces/newsletter-provider-interface.ts`
- Create: `apps/web/src/features/newsletter/interfaces/newsletter-repository-interface.ts`
- Create: `apps/web/src/features/newsletter/providers/default-resend-provider.ts`
- Create: `apps/web/src/features/newsletter/repositories/default-newsletter-repository.ts`

- [ ] **Step 1: Create the model**

Create `apps/web/src/features/newsletter/models/newsletter-add-contact-result-model.ts`:

```ts
export type NewsletterAddContactResultModel = {
  id: string;
};
```

- [ ] **Step 2: Create the provider interface**

Create `apps/web/src/features/newsletter/interfaces/newsletter-provider-interface.ts`:

```ts
import type { NewsletterAddContactResultModel } from '../models/newsletter-add-contact-result-model';

export interface NewsletterProviderInterface {
  addContact(email: string): Promise<NewsletterAddContactResultModel>;
}
```

- [ ] **Step 3: Create the repository interface**

Create `apps/web/src/features/newsletter/interfaces/newsletter-repository-interface.ts`:

```ts
import type { NewsletterAddContactResultModel } from '../models/newsletter-add-contact-result-model';

export interface NewsletterRepositoryInterface {
  addContact(email: string): Promise<NewsletterAddContactResultModel>;
}
```

- [ ] **Step 4: Create the Resend provider**

Create `apps/web/src/features/newsletter/providers/default-resend-provider.ts`:

```ts
import { Resend } from 'resend';

import type { NewsletterProviderInterface } from '../interfaces/newsletter-provider-interface';
import type { NewsletterAddContactResultModel } from '../models/newsletter-add-contact-result-model';

export class DefaultResendProvider implements NewsletterProviderInterface {
  private readonly client: Resend;
  private readonly audienceId: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }

    if (!audienceId) {
      throw new Error('RESEND_AUDIENCE_ID environment variable is not set');
    }

    this.client = new Resend(apiKey);
    this.audienceId = audienceId;
  }

  public async addContact(email: string): Promise<NewsletterAddContactResultModel> {
    const { data, error } = await this.client.contacts.create({
      email,
      audienceId: this.audienceId,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { id: data!.id };
  }
}
```

- [ ] **Step 5: Create the repository**

Create `apps/web/src/features/newsletter/repositories/default-newsletter-repository.ts`:

```ts
import type { NewsletterProviderInterface } from '../interfaces/newsletter-provider-interface';
import type { NewsletterRepositoryInterface } from '../interfaces/newsletter-repository-interface';

export class DefaultNewsletterRepository implements NewsletterRepositoryInterface {
  readonly provider: NewsletterProviderInterface;

  constructor(provider: NewsletterProviderInterface) {
    this.provider = provider;
  }

  public async addContact(email: string) {
    return this.provider.addContact(email);
  }
}
```

- [ ] **Step 6: Verify build**

Run:
```bash
cd apps/web && bun run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 7: Commit**

```bash
git add apps/web/src/features/newsletter/
git commit -m "feat: ✨ add newsletter provider/repository with Resend integration"
```

---

### Task 3: Create form schema and server action

**Files:**
- Create: `apps/web/src/features/layout/components/footer-newsletter-form/constants/form-schema.ts`
- Create: `apps/web/src/features/layout/components/footer-newsletter-form/actions/submit-email.ts`

- [ ] **Step 1: Create the Zod schema**

Create `apps/web/src/features/layout/components/footer-newsletter-form/constants/form-schema.ts`:

```ts
import { z } from 'zod';

export const formSchema = z.object({
  email: z.string().email(),
});

export type FormSchema = z.infer<typeof formSchema>;
```

- [ ] **Step 2: Create the server action**

Create `apps/web/src/features/layout/components/footer-newsletter-form/actions/submit-email.ts`:

```ts
'use server';

import { DefaultResendProvider } from '@/features/newsletter/providers/default-resend-provider';
import { DefaultNewsletterRepository } from '@/features/newsletter/repositories/default-newsletter-repository';

import { formSchema } from '../constants/form-schema';

type SubmitEmailResult =
  | { success: true }
  | { success: false; error: string };

export async function submitEmail(data: { email: string }): Promise<SubmitEmailResult> {
  const parsed = formSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: 'Invalid email address' };
  }

  try {
    const provider = new DefaultResendProvider();
    const repository = new DefaultNewsletterRepository(provider);

    await repository.addContact(parsed.data.email);

    return { success: true };
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
```

- [ ] **Step 3: Verify build**

Run:
```bash
cd apps/web && bun run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/features/layout/components/footer-newsletter-form/constants/ apps/web/src/features/layout/components/footer-newsletter-form/actions/
git commit -m "feat: ✨ add newsletter form schema and server action"
```

---

### Task 4: Wire up React Hook Form in the form component

**Files:**
- Modify: `apps/web/src/features/layout/components/footer-newsletter-form/index.tsx`

- [ ] **Step 1: Update the form component**

Replace the contents of `apps/web/src/features/layout/components/footer-newsletter-form/index.tsx` with:

```tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { InputField } from '@/features/forms/components/input-field';
import { Button } from '@/shared/components/button';
import { Heading } from '@/shared/components/heading';
import { Text } from '@/shared/components/text';

import { footerHeadingStyle } from '../footer/styles.css';
import { submitEmail } from './actions/submit-email';
import { type FormSchema, formSchema } from './constants/form-schema';

export function FooterNewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    const result = await submitEmail(data);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError('email', { message: result.error });
    }
  };

  if (submitted) {
    return (
      <div>
        <Heading as="h6" className={footerHeadingStyle}>
          Paldies!
        </Heading>
        <Text>Jūs esat veiksmīgi pieteikušies jaunumiem.</Text>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h6" className={footerHeadingStyle}>
        Nepalaidiet garām mūsu jaunumus!
      </Heading>
      <InputField
        label="E-pasts"
        type="email"
        placeholder="jusu@epasts.lv"
        errorMessage={errors.email?.message}
        {...register('email')}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Nosūta...' : 'Pieteikties'}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Verify build**

Run:
```bash
cd apps/web && bun run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 3: Verify in browser**

Run:
```bash
cd apps/web && bun run dev
```

Navigate to the page with the footer. Verify:
- The form renders with the email input and submit button
- Submitting an empty field shows a validation error
- Submitting an invalid email shows a validation error
- The InputField `errorMessage` displays below the input
- The button text changes to "Nosūta..." while submitting

Note: The actual Resend API call will only work if `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` are set to valid values in `.env.local`. Without valid keys, submitting a valid email will show the generic "Something went wrong" error from the server action catch block.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/features/layout/components/footer-newsletter-form/index.tsx
git commit -m "feat: ✨ wire up React Hook Form in newsletter signup"
```
