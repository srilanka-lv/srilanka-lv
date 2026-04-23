import { z } from 'zod/v4';

const envSchema = z.object({
  NEXT_PUBLIC_SELF_URL: z.string().nonempty(),
  NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID: z.string().nonempty(),
  NEXT_PUBLIC_SANITY_STUDIO_DATASET: z.string().nonempty(),
  SANITY_API_KEY: z.string().nonempty(),
  SERPAPI_API_KEY: z.string().nonempty(),
});

export function register() {
  envSchema.parse(process.env);
}
