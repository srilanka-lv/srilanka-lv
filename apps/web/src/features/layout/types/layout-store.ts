import type { createLayoutAtoms } from '../stores/layout-store-atoms';

export type LayoutStore = ReturnType<typeof createLayoutAtoms> | undefined;
