import { atom } from 'jotai';

import type { BreakpointRepository } from '@/features/breakpoint/interfaces/breakpoint-repository-interface';

export const createLayoutAtoms = (breakpointRepository: BreakpointRepository) => {
  const mobileNavigationIsVisibleAtom = atom(false);

  mobileNavigationIsVisibleAtom.onMount = (set) => {
    const unsubscribe = breakpointRepository.subscribe(() => {
      if (breakpointRepository.isUp('md')) {
        set(false);
      }
    });

    return unsubscribe;
  };

  return {
    mobileNavigationIsVisibleAtom,
  };
};
