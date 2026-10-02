'use client';

import { MessageCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { type FunctionComponent, useEffect, useState } from 'react';

import { resolveDeepLinkProduct, resolvePageProduct } from '../../constants/ask-grieta-products';
import { GRIETA_PHOTO_SRC } from '../../constants/grieta-photo';
import { openAskGrieta, preloadAskGrieta, useAskGrieta } from '../../stores/ask-grieta-store';
import {
  avatarStyle,
  avatarWrapStyle,
  badgeIconStyle,
  badgeStyle,
  labelStyle,
  launcherStyle,
} from './styles.css';

// The drawer, form, Ark Drawer/Select/RadioGroup/Clipboard and react-hook-form
// live in their own chunk. Nothing of it is server-rendered or in the initial
// bundle; only this button is.
const AskGrietaDrawer = dynamic(() => import('../ask-grieta-drawer'), { ssr: false });

// Hysteresis: collapse after 48px of continuous downward scroll, expand after
// 24px back up, near the top, or after a pause. Small back-and-forth jitter
// (momentum scrolling, address bar resizes) never flips the state.
const TOP_ZONE_PX = 160;
const COLLAPSE_AFTER_PX = 48;
const EXPAND_AFTER_PX = 24;
const EXPAND_AFTER_PAUSE_MS = 900;

// Once per page load, also under React's dev double-invoked effects.
let deepLinkHandled = false;

const useCollapsedOnScroll = (): boolean => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let anchorY = lastY;
    let direction: 'up' | 'down' | null = null;
    let ticking = false;
    let pauseTimer: ReturnType<typeof setTimeout> | undefined;

    const update = (): void => {
      ticking = false;
      const y = Math.max(0, window.scrollY);

      if (y > lastY) {
        if (direction !== 'down') {
          direction = 'down';
          anchorY = lastY;
        }
        if (y > TOP_ZONE_PX && y - anchorY > COLLAPSE_AFTER_PX) {
          setCollapsed(true);
        }
      } else if (y < lastY) {
        if (direction !== 'up') {
          direction = 'up';
          anchorY = lastY;
        }
        if (y < TOP_ZONE_PX || anchorY - y > EXPAND_AFTER_PX) {
          setCollapsed(false);
        }
      }

      lastY = y;
    };

    // Passive, one read per frame; React skips renders when the value is unchanged.
    const handleScroll = (): void => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(() => setCollapsed(false), EXPAND_AFTER_PAUSE_MS);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(pauseTimer);
    };
  }, []);

  return collapsed;
};

/**
 * Floating "Jautā Grietai" button, on every page via the root layout. Opens the
 * contact drawer; the drawer chunk is fetched when the browser is idle, or
 * earlier on hover/touch/focus of this button.
 *
 * `?ask` (or `?ask=trip|consultation|plan`) opens the drawer on load. Without
 * that parameter it never opens on its own.
 */
export const AskGrietaLauncher: FunctionComponent = () => {
  const { open, load } = useAskGrieta();
  const collapsed = useCollapsedOnScroll();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.has('ask')) {
      if (deepLinkHandled) {
        return;
      }
      deepLinkHandled = true;
      openAskGrieta({
        entry: 'deep-link',
        placement: 'url',
        product:
          resolveDeepLinkProduct(params.get('ask')) ?? resolvePageProduct(window.location.pathname),
      });

      return;
    }

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(preloadAskGrieta, { timeout: 4000 });

      return () => window.cancelIdleCallback(id);
    }

    const timer = setTimeout(preloadAskGrieta, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <button
        type="button"
        className={launcherStyle}
        data-ask-launcher=""
        data-collapsed={collapsed || undefined}
        data-hidden={open || undefined}
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={preloadAskGrieta}
        onTouchStart={preloadAskGrieta}
        onFocus={preloadAskGrieta}
        onClick={() =>
          openAskGrieta({
            entry: 'floating',
            placement: 'floating-button',
            product: resolvePageProduct(window.location.pathname),
          })
        }
      >
        <span className={labelStyle}>Jautā Grietai</span>
        <span className={avatarWrapStyle}>
          {/* biome-ignore lint/performance/noImgElement: tiny fixed avatar; keeps next/image out of the hot path */}
          <img
            className={avatarStyle}
            src={GRIETA_PHOTO_SRC}
            alt=""
            width={52}
            height={52}
            decoding="async"
          />
          <span className={badgeStyle} aria-hidden="true">
            <MessageCircle className={badgeIconStyle} strokeWidth={2.75} />
          </span>
        </span>
      </button>
      {load && <AskGrietaDrawer />}
    </>
  );
};
