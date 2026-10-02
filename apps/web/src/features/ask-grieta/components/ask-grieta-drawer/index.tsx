'use client';

import { Clipboard } from '@ark-ui/react/clipboard';
import { Drawer } from '@ark-ui/react/drawer';
import { Portal } from '@ark-ui/react/portal';
import { SiInstagram, SiWhatsapp } from '@icons-pack/react-simple-icons';
import { Check, Copy, Phone, X } from 'lucide-react';
import {
  type FocusEvent,
  type FunctionComponent,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

import { Button } from '@/shared/components/button';
import { INSTAGRAM_DM_URL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/shared/constants/instagram';
import { WHATSAPP_NUMBER, buildWhatsAppUrl } from '@/shared/constants/whatsapp';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';
import {
  type ContactLinkTarget,
  DEFAULT_CONTACT_LINK,
  isInAppBrowser,
  resolveContactLink,
} from '@/shared/utils/contact-link';

import { submitAskGrieta } from '../../actions/submit-ask-grieta';
import { findAskGrietaProduct } from '../../constants/ask-grieta-products';
import { GRIETA_PHOTO_SRC } from '../../constants/grieta-photo';
import { ruleFor } from '../../constants/validation-messages';
import { closeAskGrieta, useAskGrieta } from '../../stores/ask-grieta-store';
import type { SubmitAskGrietaResult } from '../../utils/handle-lead-submission';
import { productProp, trackAskGrieta } from '../../utils/track';
import { AskGrietaForm, type AskGrietaFormExtras, useAskGrietaForm } from '../ask-grieta-form';
import type { FormSchema } from '../ask-grieta-form/form-schema';
import {
  avatarStyle,
  backdropStyle,
  bodyInnerStyle,
  bodyStyle,
  closeTriggerStyle,
  contentStyle,
  descriptionStyle,
  directCopyButtonStyle,
  directCopyCornerStyle,
  directGridStyle,
  directIconStyle,
  directItemStyle,
  directPhoneClipboardStyle,
  directPhoneStyle,
  directRoutesStyle,
  directRoutesTitleStyle,
  directStaticStyle,
  directTextStyle,
  directTitleStyle,
  directValueStyle,
  grabberIndicatorStyle,
  grabberStyle,
  headerStyle,
  headerTextStyle,
  positionerStyle,
  successAvatarStyle,
  successButtonStyle,
  successStyle,
  successTextStyle,
  successTitleStyle,
  titleStyle,
} from './styles.css';

// Mobile opens as a peek (60% of the screen) so the page stays visible behind
// it; focusing any field snaps to full height so the keyboard hides nothing.
const PEEK = 0.6;
const FULL = 1;

const DESKTOP_QUERY = `(min-width: ${breakpoints.md})`;

type CloseMethod = 'escape' | 'outside' | 'close-button' | 'done-button' | 'swipe';

const useMediaQuery = (query: string): boolean =>
  useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', onChange);

      return () => media.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );

const formatWhatsAppNumber = (digits: string): string =>
  `+${digits.slice(0, 2)} ${digits.slice(2).replace(/(\d{3})(\d{3})(\d+)/, '$1 $2 $3')}`;

const isTextEntry = (element: EventTarget): boolean =>
  element instanceof HTMLTextAreaElement ||
  (element instanceof HTMLInputElement && !['radio', 'checkbox'].includes(element.type));

const stripAskParam = (): void => {
  const url = new URL(window.location.href);

  if (url.searchParams.has('ask')) {
    url.searchParams.delete('ask');
    window.history.replaceState(window.history.state, '', url);
  }
};

type DirectRoutesProps = {
  link: ContactLinkTarget;
  inApp: boolean;
  stage: 'form' | 'success';
};

// The same three routes for every visitor: WhatsApp, Instagram and the phone
// number. `data-analytics-owner` keeps the head contact-link guard and Umami's
// declarative click tracking off these links: the drawer sends exactly one
// `ask-direct-click` per tap itself.
const DirectRoutes: FunctionComponent<DirectRoutesProps> = ({ link, inApp, stage }) => {
  const onPhone = link.context !== 'desktop';
  const number = formatWhatsAppNumber(WHATSAPP_NUMBER);
  const track = (channel: string) => () => trackAskGrieta('ask-direct-click', { channel, stage });

  return (
    <div className={directRoutesStyle}>
      <p className={directRoutesTitleStyle}>Vari arī uzrakstīt vai piezvanīt man uzreiz:</p>
      <ul className={directGridStyle}>
        <li>
          <a
            className={directItemStyle}
            href={buildWhatsAppUrl()}
            target={link.target}
            rel={link.target ? 'noopener noreferrer' : undefined}
            data-analytics-owner="ask-grieta"
            onClick={track('whatsapp')}
          >
            <SiWhatsapp className={directIconStyle} color="#25D366" title="" aria-hidden="true" />
            <span className={directTextStyle}>
              <span className={directTitleStyle}>WhatsApp</span>
              <span className={directValueStyle}>Raksti man</span>
            </span>
          </a>
        </li>
        <li>
          {/* In Instagram's own browser the DM link opens the chat in the app;
              elsewhere the profile (same tab on phones, so the app opens). */}
          <a
            className={directItemStyle}
            href={inApp ? INSTAGRAM_DM_URL : INSTAGRAM_URL}
            target={inApp || onPhone ? undefined : '_blank'}
            rel={inApp || onPhone ? undefined : 'noopener noreferrer'}
            data-analytics-owner="ask-grieta"
            onClick={track(inApp ? 'instagram-dm' : 'instagram-profile')}
          >
            <SiInstagram className={directIconStyle} title="" aria-hidden="true" />
            <span className={directTextStyle}>
              <span className={directTitleStyle}>Instagram</span>
              <span className={directValueStyle}>@{INSTAGRAM_HANDLE}</span>
            </span>
          </a>
        </li>
        <li className={directPhoneStyle}>
          <Clipboard.Root value={`+${WHATSAPP_NUMBER}`} className={directPhoneClipboardStyle}>
            {onPhone ? (
              <>
                <a
                  className={directItemStyle}
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  aria-label={`Zvanīt ${number}`}
                  data-analytics-owner="ask-grieta"
                  onClick={track('phone-call')}
                >
                  <Phone className={directIconStyle} aria-hidden="true" />
                  <span className={directTextStyle}>
                    <span className={directTitleStyle}>Tālrunis</span>
                    <span className={directValueStyle}>{number}</span>
                  </span>
                </a>
                <Clipboard.Trigger
                  className={directCopyButtonStyle}
                  aria-label="Kopēt manu numuru"
                  onClick={track('copy-number')}
                >
                  <Clipboard.Indicator copied={<Check size={18} aria-hidden="true" />}>
                    <Copy size={18} aria-hidden="true" />
                  </Clipboard.Indicator>
                </Clipboard.Trigger>
              </>
            ) : (
              // Desktop: the number stays plain, selectable text; copy is its own button.
              <div className={`${directItemStyle} ${directStaticStyle}`}>
                <Phone className={directIconStyle} aria-hidden="true" />
                <span className={directTextStyle}>
                  <span className={directTitleStyle}>
                    <Clipboard.Context>
                      {(clipboard) => (clipboard.copied ? 'Nokopēts!' : 'Tālrunis')}
                    </Clipboard.Context>
                  </span>
                  <span className={directValueStyle} data-phone-number="">
                    {number}
                  </span>
                </span>
                <Clipboard.Trigger
                  className={directCopyCornerStyle}
                  aria-label="Kopēt manu numuru"
                  onClick={track('copy-number')}
                >
                  <Clipboard.Indicator copied={<Check size={14} aria-hidden="true" />}>
                    <Copy size={14} aria-hidden="true" />
                  </Clipboard.Indicator>
                </Clipboard.Trigger>
              </div>
            )}
          </Clipboard.Root>
        </li>
      </ul>
    </div>
  );
};

type SubmitOutcome = SubmitAskGrietaResult | { status: 'failed'; reason: 'network' };

/**
 * "Jautā Grietai" contact drawer (Ark UI Drawer). Lazy loaded by the launcher
 * and kept mounted once loaded, so whatever the visitor typed survives closing
 * and reopening, and client-side page navigations.
 *
 * Submitting calls the `submitAskGrieta` server action; success is shown only
 * once Grieta's lead email was accepted.
 */
const AskGrietaDrawer: FunctionComponent = () => {
  const { open, requestId, request } = useAskGrieta();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [snapPoint, setSnapPoint] = useState<number | string | null>(PEEK);
  const [submitted, setSubmitted] = useState<FormSchema | null>(null);
  const [link, setLink] = useState(DEFAULT_CONTACT_LINK);
  const [inApp, setInApp] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const positionerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeMethodRef = useRef<CloseMethod | null>(null);
  const lastSnapRef = useRef<number | string>(PEEK);
  // Ark can report the same close more than once (close, then closing ->
  // closed); only the first one after an open counts.
  const isOpenRef = useRef(false);
  // Each open request is handled once, also under React's dev double-invoked
  // effects (a ?ask deep link mounts the drawer with a request already queued).
  const handledRequestRef = useRef(0);
  const openedAtRef = useRef(0);
  const [submitFailed, setSubmitFailed] = useState(false);
  const form = useAskGrietaForm();

  useEffect(() => {
    setLink(resolveContactLink(navigator.userAgent));
    setInApp(isInAppBrowser(navigator.userAgent));
  }, []);

  // iOS keeps the layout viewport when the keyboard opens; follow the visual
  // viewport so the sheet's bottom edge sits on top of the keyboard. Written
  // straight to the positioner, so viewport changes never re-render React.
  useEffect(() => {
    const viewport = window.visualViewport;
    const positioner = positionerRef.current;

    if (!open || isDesktop || !viewport || !positioner) {
      return;
    }

    const update = (): void => {
      positioner.style.setProperty('--ask-viewport-height', `${viewport.height}px`);
      positioner.style.setProperty('--ask-viewport-top', `${viewport.offsetTop}px`);
    };

    update();
    viewport.addEventListener('resize', update);
    viewport.addEventListener('scroll', update);

    return () => {
      viewport.removeEventListener('resize', update);
      viewport.removeEventListener('scroll', update);
    };
  }, [open, isDesktop]);

  // Every open request: start as a peek at the top, apply the product it came
  // with and send one `ask-open`. A product the visitor chose wins over the
  // floating button's page guess; an explicit CTA or ?ask=<product> wins over both.
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-run per open request only
  useEffect(() => {
    if (requestId === 0 || !request || handledRequestRef.current === requestId) {
      return;
    }

    handledRequestRef.current = requestId;
    openedAtRef.current = performance.now();
    setSubmitFailed(false);

    setSnapPoint(PEEK);
    lastSnapRef.current = PEEK;
    closeMethodRef.current = null;
    isOpenRef.current = true;
    bodyRef.current?.scrollTo({ top: 0 });

    if (submitted) {
      setSubmitted(null);
      form.setValue('message', '');
    }

    const { entry, placement, product } = request;

    if (product && (entry !== 'floating' || !form.getValues('product'))) {
      form.setValue('product', product);
    }

    trackAskGrieta('ask-open', {
      entry,
      placement,
      product: productProp(form.getValues('product')),
      context: resolveContactLink(navigator.userAgent).context,
    });
  }, [requestId]);

  const handleFocus = (event: FocusEvent<HTMLDivElement>): void => {
    if (!isDesktop && isTextEntry(event.target)) {
      setSnapPoint(FULL);
      lastSnapRef.current = FULL;
    }
  };

  const handleOpenChange = ({ open: nextOpen }: { open: boolean }): void => {
    if (nextOpen || !isOpenRef.current) {
      return;
    }

    isOpenRef.current = false;
    closeAskGrieta();
    stripAskParam();

    // Ark reports the close before the close button's own click handler runs;
    // read the method once this event has finished.
    const stage = submitted ? 'success' : 'form';
    const { name, phone, email, message } = form.getValues();
    // Whether anything was typed and for how long it was open; never what.
    const typed = [name, phone, email, message].some((value) => value.trim()) ? 'yes' : 'no';
    const seconds = Math.round((performance.now() - openedAtRef.current) / 1000);
    setTimeout(() => {
      trackAskGrieta('ask-close', {
        method: closeMethodRef.current ?? 'swipe',
        snap: isDesktop ? 'panel' : lastSnapRef.current === FULL ? 'full' : 'peek',
        stage,
        typed,
        seconds,
      });
      closeMethodRef.current = null;
    }, 0);
  };

  const handleSnapPointChange = ({ snapPoint: next }: { snapPoint: number | string | null }) => {
    setSnapPoint(next);

    if (next === null) {
      return;
    }

    // Only a drag lands here; focus-driven expansion is set directly and is
    // already covered by `ask-field-start`.
    if (next === FULL && lastSnapRef.current === PEEK) {
      trackAskGrieta('ask-expand', { cause: 'drag' });
    }
    lastSnapRef.current = next;
  };

  const handleSubmit = async (
    data: FormSchema,
    { website }: AskGrietaFormExtras,
  ): Promise<void> => {
    setSubmitFailed(false);

    let result: SubmitOutcome;
    try {
      result = await submitAskGrieta({
        lead: data,
        meta: {
          page: window.location.pathname,
          entry: request?.entry ?? 'unknown',
          placement: request?.placement ?? 'unknown',
          context: resolveContactLink(navigator.userAgent).context,
        },
        website,
      });
    } catch {
      // Offline, or the request never reached the server.
      result = { status: 'failed', reason: 'network' };
    }

    const seconds = Math.round((performance.now() - openedAtRef.current) / 1000);
    const product = productProp(data.product);

    // The server checks the same rules as the form; if it still disagrees,
    // show its messages on the fields like any other validation error.
    if (result.status === 'invalid') {
      const fields = Object.entries(result.errors) as [keyof FormSchema, string][];
      for (const [field, message] of fields) {
        form.setError(field, { message });
      }
      trackAskGrieta('ask-submit', {
        result: 'invalid',
        errors: fields
          .map(([field, message]) => `${field}:${ruleFor(message)}`)
          .sort()
          .join(','),
        product,
      });
      return;
    }

    if (result.status === 'failed') {
      trackAskGrieta('ask-submit', { result: 'failed', reason: result.reason, product, seconds });
      setSubmitFailed(true);
      return;
    }

    // The lead counts here: the server has accepted Grieta's email.
    trackAskGrieta('ask-submit', {
      result: 'sent',
      product,
      entry: request?.entry ?? 'unknown',
      placement: request?.placement ?? 'unknown',
      email: data.email ? 'yes' : 'no',
      message: data.message ? 'yes' : 'no',
      country: data.country,
      seconds,
    });
    setSnapPoint(FULL);
    lastSnapRef.current = FULL;
    setSubmitted(data);
  };

  const header = (
    <header className={headerStyle}>
      {/* biome-ignore lint/performance/noImgElement: small fixed avatar */}
      <img className={avatarStyle} src={GRIETA_PHOTO_SRC} alt="" width={48} height={48} />
      <div className={headerTextStyle}>
        <Drawer.Title className={titleStyle}>Čau, esmu Grieta!</Drawer.Title>
        <Drawer.Description className={descriptionStyle}>
          Atstāj savu numuru, un es Tev uzrakstīšu WhatsApp.
        </Drawer.Description>
      </div>
      <Drawer.CloseTrigger
        className={closeTriggerStyle}
        aria-label="Aizvērt"
        onPointerDown={() => {
          closeMethodRef.current = 'close-button';
        }}
        onKeyDown={() => {
          closeMethodRef.current = 'close-button';
        }}
      >
        <X size={20} aria-hidden="true" />
      </Drawer.CloseTrigger>
    </header>
  );

  const firstName = submitted?.name.trim().split(/\s+/)[0];
  const about = findAskGrietaProduct(submitted?.product)?.about;

  return (
    <Drawer.Root
      open={open}
      onOpenChange={handleOpenChange}
      onEscapeKeyDown={() => {
        closeMethodRef.current = 'escape';
      }}
      onInteractOutside={() => {
        closeMethodRef.current ??= 'outside';
      }}
      swipeDirection={isDesktop ? 'end' : 'down'}
      snapPoints={isDesktop ? [FULL] : [PEEK, FULL]}
      snapPoint={isDesktop ? FULL : snapPoint}
      onSnapPointChange={handleSnapPointChange}
      initialFocusEl={() => contentRef.current}
      // Content (and the form) only enters the DOM on first open, then stays.
      lazyMount
    >
      <Portal>
        <Drawer.Backdrop className={backdropStyle} />
        <Drawer.Positioner ref={positionerRef} className={positionerStyle}>
          <Drawer.Content
            ref={contentRef}
            className={contentStyle}
            onFocus={handleFocus}
            draggable={false}
          >
            {/* Only the grabber and header drag the sheet (mobile); the content
                never does, so selecting text, scrolling or using the inputs
                can't move or close it. The desktop panel doesn't drag at all. */}
            {isDesktop ? (
              header
            ) : (
              <Drawer.Grabber className={grabberStyle}>
                <Drawer.GrabberIndicator className={grabberIndicatorStyle} />
                {header}
              </Drawer.Grabber>
            )}

            <div ref={bodyRef} className={bodyStyle}>
              <div className={bodyInnerStyle}>
                {submitted ? (
                  <div className={successStyle} role="status">
                    <span className={successAvatarStyle}>
                      {/* biome-ignore lint/performance/noImgElement: small fixed avatar */}
                      <img src={GRIETA_PHOTO_SRC} alt="Grieta" width={88} height={88} />
                      <Check aria-hidden="true" size={18} strokeWidth={3} />
                    </span>
                    <h3 className={successTitleStyle}>Paldies, {firstName}!</h3>
                    <p className={successTextStyle}>
                      Uzrakstīšu Tev WhatsApp 24 stundu laikā
                      {about ? `, lai parunātu par ${about}` : ''}.
                    </p>
                    <p className={successTextStyle}>
                      Mans numurs ir{' '}
                      <strong className={successButtonStyle.nowrap}>
                        {formatWhatsAppNumber(WHATSAPP_NUMBER)}
                      </strong>
                      . Saglabā to, lai uzreiz atpazītu manu ziņu.
                    </p>
                    <Drawer.CloseTrigger asChild>
                      <Button
                        size="large"
                        variant="secondary"
                        className={successButtonStyle.button}
                        onPointerDown={() => {
                          closeMethodRef.current = 'done-button';
                        }}
                        onKeyDown={() => {
                          closeMethodRef.current = 'done-button';
                        }}
                      >
                        Atpakaļ uz lapu
                      </Button>
                    </Drawer.CloseTrigger>
                  </div>
                ) : (
                  <AskGrietaForm form={form} onSubmit={handleSubmit} submitFailed={submitFailed} />
                )}

                <DirectRoutes link={link} inApp={inApp} stage={submitted ? 'success' : 'form'} />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default AskGrietaDrawer;
