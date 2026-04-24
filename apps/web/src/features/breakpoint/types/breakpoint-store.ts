import type { createBreakpointAtoms } from '../stores/breakpoint-store-atoms';

export type BreakpointStore = ReturnType<typeof createBreakpointAtoms> | undefined;
