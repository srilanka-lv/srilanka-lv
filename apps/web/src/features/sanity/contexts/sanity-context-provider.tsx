'use client';

import type { ReactNode } from 'react';

import { createSanityClient } from '../providers/sanity-client.js';
import { SanityContext } from './sanity-context.js';

const client = createSanityClient();

interface SanityContextProviderProps {
  children: ReactNode;
}

export function SanityContextProvider({ children }: SanityContextProviderProps) {
  return <SanityContext value={{ client }}>{children}</SanityContext>;
}
