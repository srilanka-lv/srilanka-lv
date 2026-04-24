import type { Breakpoint } from '../types/breakpoint';

export interface BreakpointRepository {
  subscribe(callback: (breakpoint: Breakpoint) => void): () => void;
  unsubscribe(): void;
  getCurrent(): Breakpoint;
  isUp(targetBreakpoint: Breakpoint): boolean;
  isDown(targetBreakpoint: Breakpoint): boolean;
}
