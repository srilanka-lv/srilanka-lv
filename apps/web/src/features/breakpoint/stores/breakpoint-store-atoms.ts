import { atom } from 'jotai';

import type { BreakpointRepository } from '../interfaces/breakpoint-repository-interface';

export const createBreakpointAtoms = (breakpointRepository: BreakpointRepository) => {
  const breakpointAtom = atom(breakpointRepository.getCurrent());

  breakpointAtom.onMount = (set) => {
    const unsubscribe = breakpointRepository.subscribe((breakpoint) => {
      set(breakpoint);
    });

    return unsubscribe;
  };

  return {
    breakpointAtom,
  };
};
