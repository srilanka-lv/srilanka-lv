import { describe, expect, it } from 'bun:test';

import { VALIDATION } from '../../constants/validation-messages';
import { type FormSchema, formSchema } from './form-schema';

const valid: FormSchema = {
  product: 'girls-trip',
  name: 'Anna Bērziņa',
  country: 'LV',
  phone: '26 123 456',
  email: '',
  message: '',
};

const errorsOf = (value: unknown) => {
  const result = formSchema.safeParse(value);

  return result.success
    ? {}
    : Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message]));
};

describe('formSchema', () => {
  it('accepts a minimal lead: name and WhatsApp number, product optional', () => {
    expect(formSchema.safeParse(valid).success).toBe(true);
    expect(formSchema.safeParse({ ...valid, product: null }).success).toBe(true);
    expect(formSchema.safeParse({ ...valid, email: 'anna@example.com' }).success).toBe(true);
  });

  it('reports each broken rule with the drawer message', () => {
    expect(errorsOf({ ...valid, name: ' ', phone: '' })).toEqual({
      name: VALIDATION.nameRequired.message,
      phone: VALIDATION.phoneRequired.message,
    });
    expect(errorsOf({ ...valid, name: 'A' })).toEqual({ name: VALIDATION.nameTooShort.message });
    expect(errorsOf({ ...valid, name: 'A'.repeat(81) })).toEqual({
      name: VALIDATION.nameTooLong.message,
    });
    expect(errorsOf({ ...valid, email: 'anna@' })).toEqual({
      email: VALIDATION.emailFormat.message,
    });
    expect(errorsOf({ ...valid, message: 'x'.repeat(1001) })).toEqual({
      message: VALIDATION.messageTooLong.message,
    });
  });

  it('accepts an email address with stray spaces', () => {
    const result = formSchema.safeParse({ ...valid, email: ' anna@example.com ' });

    expect(result.success && result.data.email).toBe('anna@example.com');
  });

  it('rejects products that do not exist', () => {
    expect(formSchema.safeParse({ ...valid, product: 'yacht' }).success).toBe(false);
  });
});
