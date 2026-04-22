'use client';

import { createContext } from 'react';

import type { SanityClient } from '../types/index';

interface SanityContextValue {
  client: SanityClient;
}

export const SanityContext = createContext<SanityContextValue | null>(null);
