import { z } from 'zod';

import { ASK_GRIETA_PRODUCTS } from '../../constants/ask-grieta-products';
import { VALIDATION } from '../../constants/validation-messages';
import { validateNationalNumber } from '../../utils/phone';

const productIds = ASK_GRIETA_PRODUCTS.map((product) => product.id) as [string, ...string[]];

export const NAME_MAX_LENGTH = 80;
export const MESSAGE_MAX_LENGTH = 1000;

// Shared by the drawer and the server action, so the server accepts exactly
// what the form lets through and answers with the same messages.
export const formSchema = z
  .object({
    product: z.enum(productIds).nullable(),
    name: z.string(),
    country: z.string(),
    phone: z.string(),
    // Trimmed first: phone keyboards often add a space after an autocompleted address.
    email: z
      .string()
      .trim()
      .pipe(z.union([z.literal(''), z.email(VALIDATION.emailFormat.message)])),
    message: z.string().max(MESSAGE_MAX_LENGTH, VALIDATION.messageTooLong.message),
  })
  .superRefine((value, context) => {
    const name = value.name.trim();

    if (name.length < 2) {
      context.addIssue({
        code: 'custom',
        path: ['name'],
        message: name ? VALIDATION.nameTooShort.message : VALIDATION.nameRequired.message,
      });
    } else if (name.length > NAME_MAX_LENGTH) {
      context.addIssue({ code: 'custom', path: ['name'], message: VALIDATION.nameTooLong.message });
    }

    const phoneError = validateNationalNumber(value.country, value.phone);

    if (phoneError) {
      context.addIssue({ code: 'custom', path: ['phone'], message: phoneError });
    }
  });

export type FormSchema = z.infer<typeof formSchema>;
