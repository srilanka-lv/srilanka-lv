import { useAtom } from 'jotai';

import { useLayoutStore } from './layout-store';

export const useLayoutMobileNavigationIsVisible = () => {
  const { mobileNavigationIsVisibleAtom } = useLayoutStore();

  const [mobileNavigationIsVisible, setMobileNavigationIsVisible] = useAtom(
    mobileNavigationIsVisibleAtom,
  );

  return {
    mobileNavigationIsVisible,
    setMobileNavigationIsVisible,
  };
};
