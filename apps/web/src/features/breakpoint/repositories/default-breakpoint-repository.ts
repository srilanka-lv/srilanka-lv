import { isServer } from '@/shared/utils/is-server';

import type { BreakpointRepository } from '../interfaces/breakpoint-repository-interface';
import type { Breakpoint } from '../types/breakpoint';

export class DefaultBreakpointRepository implements BreakpointRepository {
  private listeners = new Set<(breakpoint: Breakpoint) => void>();
  private defaultBreakpoint: Breakpoint = 'md';
  private currentBreakpoint: Breakpoint;
  private breakpointOrder: Breakpoint[];
  private breakpointOffset = 0.001;
  private mediaQueries: Record<Breakpoint, string>;
  private mediaQueryLists: Record<Breakpoint, MediaQueryList>;

  public constructor({ breakpoints }: { breakpoints: Record<Breakpoint, string> }) {
    this.mediaQueries = this.generateMediaQueries(breakpoints);
    this.breakpointOrder = Object.keys(breakpoints) as Breakpoint[];

    // If we're on the server or when the browser doesn't support matchMedia, do not do anything with breakpoints
    if (isServer || typeof window.matchMedia !== 'function') {
      this.mediaQueryLists = {} as Record<Breakpoint, MediaQueryList>;
      this.currentBreakpoint = this.defaultBreakpoint;
      return;
    }

    // For each breakpoint, ask the browser to watch this media query
    this.mediaQueryLists = Object.entries(this.mediaQueries).reduce(
      (acc, [bp, query]) => {
        acc[bp as Breakpoint] = window.matchMedia(query);
        return acc;
      },
      {} as Record<Breakpoint, MediaQueryList>,
    );

    // Find which breakpoint currently matches (could be multiple, so pick the first)
    this.currentBreakpoint = this.findMatchingBreakpoint();

    // For each media query, listen to changes and run our handler when they change
    Object.values(this.mediaQueryLists).forEach((mql) => {
      mql.addEventListener('change', this.handleMediaChange);
    });
  }

  public getCurrent(): Breakpoint {
    return this.currentBreakpoint;
  }

  public isUp(targetBreakpoint: Breakpoint): boolean {
    return (
      this.breakpointOrder.indexOf(this.currentBreakpoint) >=
      this.breakpointOrder.indexOf(targetBreakpoint)
    );
  }

  public isDown(targetBreakpoint: Breakpoint): boolean {
    return (
      this.breakpointOrder.indexOf(this.currentBreakpoint) <=
      this.breakpointOrder.indexOf(targetBreakpoint)
    );
  }

  public subscribe(callback: (breakpoint: Breakpoint) => void): () => void {
    this.listeners.add(callback);

    callback(this.currentBreakpoint);

    return () => {
      this.listeners.delete(callback);
    };
  }

  public unsubscribe(): void {
    if (this.mediaQueryLists) {
      Object.values(this.mediaQueryLists).forEach((mql) => {
        mql.removeEventListener('change', this.handleMediaChange);
      });
    }

    this.listeners?.clear();
  }

  private generateMediaQueries(themeBreakpoints: Record<Breakpoint, string>) {
    const entries = Object.entries(themeBreakpoints) as [Breakpoint, string][];

    return Object.fromEntries(
      entries.map(([key, value], index) => {
        const remValue = parseFloat(value);
        const nextEntry = entries[index + 1];

        if (index === 0) {
          const nextRem = parseFloat(nextEntry[1]);
          return [key, `(max-width: ${nextRem - this.breakpointOffset}rem)`];
        }

        if (!nextEntry) {
          return [key, `(min-width: ${remValue}rem)`];
        }

        const nextRem = parseFloat(nextEntry[1]);
        return [
          key,
          `(min-width: ${remValue}rem) and (max-width: ${nextRem - this.breakpointOffset}rem)`,
        ];
      }),
    ) as Record<Breakpoint, string>;
  }

  private pendingUpdate = false;

  private handleMediaChange = () => {
    if (this.pendingUpdate) {
      return;
    }

    this.pendingUpdate = true;

    queueMicrotask(() => {
      this.pendingUpdate = false;
      const next = this.findMatchingBreakpoint();

      if (next !== this.currentBreakpoint) {
        this.currentBreakpoint = next;

        this.listeners.forEach((callback) => {
          callback(next);
        });
      }
    });
  };

  private findMatchingBreakpoint(): Breakpoint {
    if (!this.mediaQueries) {
      return this.defaultBreakpoint;
    }

    const breakpoints = Object.keys(this.mediaQueries) as Breakpoint[];

    for (const breakpoint of breakpoints) {
      if (this.mediaQueryLists[breakpoint]?.matches) {
        return breakpoint;
      }
    }

    return this.defaultBreakpoint;
  }
}
