import type { Decorator } from '@storybook/nextjs-vite';

import { BreakpointRepositoryProvider } from '@/features/breakpoint/contexts/breakpoint-repository-context';
import { DefaultBreakpointRepository } from '@/features/breakpoint/repositories/default-breakpoint-repository';
import { BreakpointStoreProvider } from '@/features/breakpoint/stores/breakpoint-store';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

export const WithBreakpointRepository: Decorator = (Story) => {
  const breakpointRepository = new DefaultBreakpointRepository({ breakpoints });

  return (
    <BreakpointRepositoryProvider value={breakpointRepository}>
      <BreakpointStoreProvider>
        <Story />
      </BreakpointStoreProvider>
    </BreakpointRepositoryProvider>
  );
};
