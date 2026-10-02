'use client';

import { MessageCircle } from 'lucide-react';
import { type FunctionComponent, type MouseEvent, type ReactNode, useEffect, useRef } from 'react';

import { type AskGrietaProductId, DEEP_LINK_ALIAS } from '../../constants/ask-grieta-products';
import {
  type AskGrietaEntry,
  openAskGrieta,
  preloadAskGrieta,
} from '../../stores/ask-grieta-store';
import { productProp, trackAskGrieta } from '../../utils/track';

type AskGrietaCtaProps = {
  product?: AskGrietaProductId | null;
  /** Unique per button, kebab-case, e.g. `footer-product-consultation`. */
  placement: string;
  /** `replaced-whatsapp` for buttons, cards and links that used to open WhatsApp. */
  entry?: Extract<AskGrietaEntry, 'inline' | 'replaced-whatsapp'>;
  /**
   * `button` for button-shaped CTAs; `link` for text links and cards, which
   * keep the site's link styling and fall back to the `?ask=` deep link.
   */
  as?: 'button' | 'link';
  /** Chat bubble before the label; off for text links and cards. */
  icon?: boolean;
  className?: string;
  tabIndex?: number;
  children: ReactNode;
};

/**
 * Inline "Jautā man…" CTA inside page content. Opens the same drawer as the
 * floating button, with this product preselected. A plain button or link, so
 * page content and SEO stay untouched; the form never renders server side.
 */
export const AskGrietaCta: FunctionComponent<AskGrietaCtaProps> = ({
  product = null,
  placement,
  entry = 'inline',
  as = 'button',
  icon = as === 'button',
  className,
  tabIndex,
  children,
}) => {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  // One `ask-cta-view` per CTA per page view, once it is half visible.
  useEffect(() => {
    const element = ref.current;

    if (!element || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entryItem]) => {
        if (entryItem?.isIntersecting) {
          trackAskGrieta('ask-cta-view', { entry, placement, product: productProp(product) });
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [entry, placement, product]);

  const handleClick = (event: MouseEvent): void => {
    // Let modified clicks open the ?ask= link in a new tab as usual.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    openAskGrieta({ entry, placement, product });
  };

  const content = (
    <>
      {icon && <MessageCircle size={18} aria-hidden="true" />}
      {children}
    </>
  );

  if (as === 'link') {
    return (
      <a
        ref={ref}
        className={className}
        tabIndex={tabIndex}
        href={product ? `?ask=${DEEP_LINK_ALIAS[product]}` : '?ask'}
        rel="nofollow"
        aria-haspopup="dialog"
        onPointerEnter={preloadAskGrieta}
        onTouchStart={preloadAskGrieta}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      className={className}
      tabIndex={tabIndex}
      aria-haspopup="dialog"
      onPointerEnter={preloadAskGrieta}
      onTouchStart={preloadAskGrieta}
      onClick={handleClick}
    >
      {content}
    </button>
  );
};
