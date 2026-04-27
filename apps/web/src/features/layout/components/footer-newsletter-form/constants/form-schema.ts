import { z } from 'zod';

export const formSchema = z.object({
  email: z.email(),
});

export type FormSchema = z.infer<typeof formSchema>;
