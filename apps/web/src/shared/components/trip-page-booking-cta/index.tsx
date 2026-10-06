'use client';

import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import clsx from 'clsx';
import { type FunctionComponent, useEffect, useState } from 'react';

import { AskGrietaCta } from '@/features/ask-grieta/components/ask-grieta-cta';
import { useAskGrieta } from '@/features/ask-grieta/stores/ask-grieta-store';
import { useTripPageBookingPhase } from '@/shared/components/trip-page-booking-provider';
import { GIRLS_TRIP_RESERVATION_EUR, formatEur } from '@/shared/constants/girls-trip-booking';
import {
  GIRLS_TRIP_FULL_REFUND_PROMISE,
  GIRLS_TRIP_GUEST_CANCELS_TEXT,
} from '@/shared/constants/girls-trip-terms';
import { trackEvent } from '@/shared/utils/analytics';
import { emitTripEngagement } from '@/shared/utils/trip-engagement';

import {
  backdropStyle,
  buttonIconStyle,
  buttonStyles,
  closeTriggerStyle,
  closedNoticeStyle,
  contentStyle,
  descriptionStyle,
  detailsTriggerStyle,
  dialogAskStyle,
  positionerStyle,
  promiseIconStyle,
  promiseStyle,
  termsNoteStyle,
  titleStyle,
  tripPageBookingCtaStyle,
} from './styles.css';

// Adds the trip to the celoarmariku.lv (Shopify) cart with the 400€ Downpay
// deposit plan applied. `id` is the variant of the current departure and
// `selling_plan` its deposit plan: both change if the partner recreates the
// product or the plan, which breaks this link. The shorter /cart/<id>:<qty>
// permalink form must NOT be used here: it drops the selling plan and charges
// the full trip price.
const RESERVATION_CART_URL =
  'https://celoarmariku.lv/cart/add?id=54763870814545&quantity=1&selling_plan=692533133649&return_to=/cart';

export const RESERVE_LABEL = `Rezervēt vietu (${formatEur(GIRLS_TRIP_RESERVATION_EUR)})`;
const ASK_LABEL = 'Uzdot jautājumu';

type TripPageAskButtonProps = {
  /** Where on the page the button sits, kebab-case; reported by the drawer's ask-* events. */
  placement: string;
  className?: string;
};

/**
 * Every "Uzdot jautājumu" on the girls trip page: opens the Ask Grieta drawer
 * with the girls trip preselected. The drawer reports its own ask-cta-view
 * and ask-open events, so this adds no tracking of its own.
 */
export const TripPageAskButton: FunctionComponent<TripPageAskButtonProps> = ({
  placement,
  className,
}) => (
  <AskGrietaCta
    product="girls-trip"
    placement={`trip-page-${placement}`}
    entry="replaced-whatsapp"
    className={className}
  >
    {ASK_LABEL}
  </AskGrietaCta>
);

type TripPageReserveButtonProps = {
  /** Where on the page the button sits, reported with the click. Kebab-case. */
  placement: string;
  className?: string;
};

export const TripPageReserveButton: FunctionComponent<TripPageReserveButtonProps> = ({
  placement,
  className,
}) => {
  // Reported with the click, so early-bird conversion can be compared with
  // the regular price after 31 October.
  const phase = useTripPageBookingPhase();

  return (
    <button
      type="button"
      className={clsx(buttonStyles({ variant: 'primary' }), className)}
      onClick={async () => {
        // Cap the tracking wait so a hung beacon can never stall the cart redirect.
        await Promise.race([
          trackEvent('product-cta', { product: 'girls-trip', placement, phase }),
          new Promise((resolve) => {
            setTimeout(resolve, 400);
          }),
        ]);
        window.location.href = RESERVATION_CART_URL;
      }}
    >
      <svg
        className={buttonIconStyle}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        aria-hidden="true"
      >
        <path d="M404 207.9L204.7 104.2C196.7 100.1 187.4 99.4 179 102.5L137.9 117.5C127.6 121.2 124.1 133.9 130.8 142.5L232.3 270.4L132.1 306.8L72 270.2C65.8 266.4 58.2 265.7 51.3 268.1L35 274.1C25.6 277.5 21.6 288.6 26.7 297.2L80.3 389C95.9 415.7 128.4 427.4 157.4 416.8L170.3 412.1L170.3 412.1L568.7 267.1C597.8 256.5 612.7 224.4 602.2 195.3C591.7 166.2 559.5 151.3 530.4 161.8L404 207.9zM64.2 512C46.5 512 32.2 526.3 32.2 544C32.2 561.7 46.5 576 64.2 576L576.2 576C593.9 576 608.2 561.7 608.2 544C608.2 526.3 593.9 512 576.2 512L64.2 512z" />
      </svg>
      {RESERVE_LABEL}
    </button>
  );
};

type TripPageBookingCtaProps = {
  /** Where on the page the buttons sit, reported with each click. Kebab-case. */
  placement: string;
  /** Show the "what happens when I book" dialog under the buttons. */
  withDetails?: boolean;
  className?: string;
};

/** The go/no-go promise as one line with a shield, for under the reserve button. */
export const TripPageRefundPromise: FunctionComponent = () => (
  <p className={promiseStyle}>
    <svg
      className={promiseIconStyle}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 640"
      aria-hidden="true"
    >
      <path d="M320 64C324.6 64 329.2 65 333.4 66.9L521.8 146.8C543.8 156.1 560.2 177.8 560.1 204C559.6 303.2 518.8 484.7 346.5 567.2C329.8 575.2 310.4 575.2 293.7 567.2C121.3 484.7 80.6 303.2 80.1 204C80 177.8 96.4 156.1 118.4 146.8L306.7 66.9C310.9 65 315.4 64 320 64zM409.6 278.1C419.8 265.4 417.7 246.8 405 236.6C392.3 226.4 373.7 228.5 363.5 241.2L295.3 326.5L264.2 295.4C252.5 283.7 233.5 283.7 221.8 295.4C210.1 307.1 210.1 326.1 221.8 337.8L276.2 392.2C282.2 398.2 290.5 401.4 299 400.9C307.5 400.4 315.4 396.4 320.7 389.8L409.6 278.1z" />
    </svg>
    <span>{GIRLS_TRIP_FULL_REFUND_PROMISE}</span>
  </p>
);

/**
 * The two next steps on the trip page: reserve a place (the 400 € deposit in
 * the partner store), or the softer "ask a question", which opens the Ask
 * Grieta drawer with the girls trip preselected. After the booking deadline
 * only the question stays.
 */
export const TripPageBookingCta: FunctionComponent<TripPageBookingCtaProps> = ({
  placement,
  withDetails = true,
  className,
}) => {
  const phase = useTripPageBookingPhase();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { open: askOpen } = useAskGrieta();

  // The dialog's own ask button opens the drawer: step aside for it.
  useEffect(() => {
    if (askOpen) {
      setDetailsOpen(false);
    }
  }, [askOpen]);

  return (
    <div className={clsx(className, tripPageBookingCtaStyle)}>
      {phase === 'closed' ? (
        <p className={closedNoticeStyle}>
          Pieteikšanās šim ceļojumam ir slēgta. Uzraksti man, ja gribi braukt nākamajā reizē.
        </p>
      ) : (
        <TripPageReserveButton placement={placement} />
      )}

      <TripPageAskButton className={buttonStyles({ variant: 'secondary' })} placement={placement} />

      {phase !== 'closed' && <TripPageRefundPromise />}

      {withDetails && phase !== 'closed' && (
        <Dialog.Root
          open={detailsOpen}
          onOpenChange={(details) => {
            if (details.open) {
              emitTripEngagement(document, { type: 'booking-details-open', placement });
            }
            setDetailsOpen(details.open);
          }}
          // Handing focus back to the trigger would count as focus leaving the
          // drawer that just opened, and close it again.
          restoreFocus={!askOpen}
        >
          <Dialog.Trigger className={detailsTriggerStyle}>
            Kas notiek, veicot rezervāciju?
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop className={backdropStyle} />
            <Dialog.Positioner className={positionerStyle}>
              <Dialog.Content className={contentStyle}>
                <Dialog.CloseTrigger className={closeTriggerStyle} aria-label="Aizvērt">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true">
                    <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
                  </svg>
                </Dialog.CloseTrigger>
                <Dialog.Title className={titleStyle}>Rezervējot savu vietu 🌴</Dialog.Title>
                <Dialog.Description className={descriptionStyle}>
                  <p>
                    Rezervējot savu vietu un veicot pirmo iemaksu (
                    {formatEur(GIRLS_TRIP_RESERVATION_EUR)}), Tu oficiāli apstiprini savu dalību
                    šajā piedzīvojumā. Iemaksu veic tiešsaistē, caur Ceļo ar Mariku.
                  </p>
                  <p>
                    Šis maksājums man ļaus laikus nodrošināt Tavu vietu transportā, aktivitātēs un
                    naktsmājās.
                  </p>
                  <p>
                    Tiklīdz būs saņemta rezervācijas iemaksa (
                    {formatEur(GIRLS_TRIP_RESERVATION_EUR)}), es palīdzēšu:
                  </p>
                  <ul>
                    <li>✈️ Atrast pašus izdevīgākos un labākos lidojuma variantus.</li>
                    <li>💬 Atbildēt uz ikvienu Tavu jautājumu, lai Tu justos droši un mierīgi.</li>
                    <li>📝 Neilgi pirms ceļojuma pilnībā sakārtošu Tavu Šrilankas vīzu.</li>
                    <li>
                      👭 Pievienošu Tevi mūsu Šrilankas WhatsApp grupiņai, kur varēsi iepazīties un
                      aprunāties ar pārējām meitenēm.
                    </li>
                    <li>
                      🌸 Un, protams, kad Tu ieradīsies, es sagaidīšu Tevi lidostā, lai kopā dotos
                      uz mūsu pirmajām naktsmājām.
                    </li>
                  </ul>
                  <p>Atlikušo summu varēsi pavisam ērti samaksāt man uz vietas Šrilankā.</p>
                  <div className={termsNoteStyle}>
                    <TripPageRefundPromise />
                    <p>{GIRLS_TRIP_GUEST_CANCELS_TEXT}</p>
                  </div>
                </Dialog.Description>
                <TripPageAskButton
                  className={clsx(buttonStyles({ variant: 'secondary' }), dialogAskStyle)}
                  placement="booking-dialog"
                />
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      )}
    </div>
  );
};
