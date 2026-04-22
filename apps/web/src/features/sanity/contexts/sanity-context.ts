import { createContext } from 'react';

import type { SanityClient } from '../types/index.js';

interface SanityContextValue {
  client: SanityClient;
}

export const SanityContext = createContext<SanityContextValue | null>(null);
