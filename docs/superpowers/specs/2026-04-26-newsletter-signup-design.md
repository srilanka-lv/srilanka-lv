# Newsletter Signup Design

## Overview

A newsletter signup feature using the repository/provider pattern, with React Hook Form + Zod validation and a Next.js server action. Only the provider implementation references Resend — everything else is provider-agnostic.

## Feature boundaries

### `features/newsletter/` — provider abstraction

```
features/newsletter/
├── interfaces/
│   ├── newsletter-provider-interface.ts
│   └── newsletter-repository-interface.ts
├── providers/
│   └── default-resend-provider.ts          (only Resend reference)
├── repositories/
│   └── default-newsletter-repository.ts
└── models/
    └── newsletter-add-contact-result-model.ts
```

### `features/layout/components/footer-newsletter-form/` — form and action

```
features/layout/components/footer-newsletter-form/
├── index.tsx                    (existing — add RHF + success state)
├── constants/
│   └── form-schema.ts
└── actions/
    └── submit-email.ts
```

The form component never imports from `features/newsletter` directly. The server action is the bridge.

## Newsletter provider/repository

### Interfaces

**`newsletter-provider-interface.ts`:**
```ts
export interface NewsletterProviderInterface {
  addContact(email: string): Promise<NewsletterAddContactResultModel>;
}
```

**`newsletter-repository-interface.ts`:**
```ts
export interface NewsletterRepositoryInterface {
  addContact(email: string): Promise<NewsletterAddContactResultModel>;
}
```

### Model

**`newsletter-add-contact-result-model.ts`:**
```ts
export type NewsletterAddContactResultModel = {
  id: string;
};
```

### Provider — `default-resend-provider.ts`

- Uses the `resend` npm package
- Reads `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` from environment variables
- Calls `resend.contacts.create({ email, audienceId })`
- Returns the contact ID on success, throws on failure
- This is the only file in the entire codebase that references Resend

### Repository — `default-newsletter-repository.ts`

- Accepts `NewsletterProviderInterface` via constructor (same pattern as SerpAPI)
- Delegates `addContact()` to the provider

## Server action and form

### Zod schema — `constants/form-schema.ts`

```ts
import { z } from 'zod';

export const formSchema = z.object({
  email: z.string().email(),
});

export type FormSchema = z.infer<typeof formSchema>;
```

### Server action — `actions/submit-email.ts`

- Marked with `'use server'`
- Receives the form data, validates with the Zod schema (server-side re-validation)
- Instantiates `DefaultResendProvider` + `DefaultNewsletterRepository`
- Calls `repository.addContact(email)`
- Returns `{ success: true }` or `{ success: false, error: string }`

### Form component — `index.tsx`

- Requires `'use client'` directive (uses React Hook Form hooks and `useState`)
- Uses `useForm<FormSchema>` with `zodResolver(formSchema)`
- `handleSubmit` calls the server action
- Tracks `submitted` state — when `true`, replaces the form with a success message
- Shows `errorMessage` on the `InputField` from either RHF validation or server action failure
- Button shows loading state while submitting (using RHF's `formState.isSubmitting`)

## Dependencies

### Packages to install (in `apps/web`)

- `resend` — Resend SDK
- `@hookform/resolvers` — for `zodResolver`
- `zod` — schema validation

### Environment variables

Already added to `apps/web/.env.local` and `apps/web/.env.local.example`:

- `RESEND_API_KEY` — API key from Resend dashboard
- `RESEND_AUDIENCE_ID` — the audience to add contacts to

Read inside `default-resend-provider.ts` only. No `NEXT_PUBLIC_` prefix needed.

## UX behavior

- **Success:** Form is replaced entirely with a success message. Prevents double submissions.
- **Validation error:** Inline error on the InputField via React Hook Form + Zod (client-side).
- **Server error:** Inline error on the InputField from the server action response.
- **Loading:** Button shows loading state during submission (via `formState.isSubmitting`).

## Architectural constraints

- Only `default-resend-provider.ts` references the Resend SDK — swapping providers means creating a new provider file and changing one line of instantiation in the server action.
- The form component never imports from `features/newsletter` — only the server action does.
- No barrel exports — import from specific file paths.
