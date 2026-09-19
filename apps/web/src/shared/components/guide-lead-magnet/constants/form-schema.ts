import * as z from 'zod/mini';

// The message is the same string the server action returns, so the reader
// sees one Latvian sentence whether validation trips in the browser or on
// the server.
export const formSchema = z.object({
  email: z.email('Nederīga e-pasta adrese'),
});

export type FormSchema = z.infer<typeof formSchema>;
