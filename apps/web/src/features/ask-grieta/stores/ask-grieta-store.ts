import { useSyncExternalStore } from 'react';

import type { AskGrietaProductId } from '../constants/ask-grieta-products';

/**
 * How the drawer was opened. `replaced-whatsapp` marks the buttons, cards and
 * links that used to open WhatsApp directly.
 */
export type AskGrietaEntry = 'floating' | 'inline' | 'replaced-whatsapp' | 'deep-link';

export type AskGrietaOpenRequest = {
  entry: AskGrietaEntry;
  /** Unique per button, kebab-case, e.g. `footer-product-consultation`. */
  placement: string;
  product?: AskGrietaProductId | null;
};

type AskGrietaState = {
  open: boolean;
  /** Bumped on every open request, so the drawer can re-apply the product. */
  requestId: number;
  request: AskGrietaOpenRequest | null;
  /** Set once the drawer chunk should be fetched (idle, intent, or open). */
  load: boolean;
};

// A tiny module store instead of a context: the floating button, inline CTAs
// and the lazily loaded drawer live in unrelated trees, and none of them should
// pull a provider into the initial bundle.
let state: AskGrietaState = { open: false, requestId: 0, request: null, load: false };

const listeners = new Set<() => void>();

const setState = (next: Partial<AskGrietaState>): void => {
  state = { ...state, ...next };
  for (const listener of listeners) {
    listener();
  }
};

const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener);

  return () => listeners.delete(listener);
};

const getSnapshot = (): AskGrietaState => state;

export const useAskGrieta = (): AskGrietaState =>
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

export const openAskGrieta = (request: AskGrietaOpenRequest): void => {
  setState({ open: true, load: true, request, requestId: state.requestId + 1 });
};

export const closeAskGrieta = (): void => {
  setState({ open: false });
};

export const preloadAskGrieta = (): void => {
  if (!state.load) {
    setState({ load: true });
  }
};
