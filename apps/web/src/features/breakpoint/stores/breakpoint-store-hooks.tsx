import { useAtomValue } from 'jotai';

import { useBreakpointRepository } from '../contexts/breakpoint-repository-context';
import type { Breakpoint } from '../types/breakpoint';
import { useBreakpointStore } from './breakpoint-store';

export const useBreakpoint = () => {
  const { breakpointAtom } = useBreakpointStore();

  return {
    breakpoint: useAtomValue(breakpointAtom),
  };
};

export const useBreakpointIsUp = (breakpoint: Breakpoint) => {
  const breakpointRepository = useBreakpointRepository();

  return breakpointRepository.isUp(breakpoint);
};
