'use client';

import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';

import { ContactLink } from '@/shared/components/contact-link';
import { useTripPageBookingPhase } from '@/shared/components/trip-page-booking-provider';
import { GIRLS_TRIP_RESERVATION_EUR, formatEur } from '@/shared/constants/girls-trip-booking';
import { trackEvent } from '@/shared/utils/analytics';

import {
  backdropStyle,
  buttonIconStyle,
  buttonStyles,
  closeTriggerStyle,
  closedNoticeStyle,
  contentStyle,
  descriptionStyle,
  detailsTriggerStyle,
  positionerStyle,
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
export const ASK_LABEL = 'Uzdot jautājumu';

type TripPageReserveButtonProps = {
  /** Where on the page the button sits, reported with the click. Kebab-case. */
  placement: string;
  className?: string;
  tabIndex?: number;
};

export const TripPageReserveButton: FunctionComponent<TripPageReserveButtonProps> = ({
  placement,
  className,
  tabIndex,
}) => (
  <button
    type="button"
    className={clsx(buttonStyles({ variant: 'primary' }), className)}
    tabIndex={tabIndex}
    onClick={async () => {
      // Cap the tracking wait so a hung beacon can never stall the cart redirect.
      await Promise.race([
        trackEvent('product-cta', { product: 'girls-trip', placement }),
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

type TripPageBookingCtaProps = {
  /** Where on the page the buttons sit, reported with each click. Kebab-case. */
  placement: string;
  /** Show the "what happens when I book" dialog under the buttons. */
  withDetails?: boolean;
  className?: string;
};

/**
 * The two next steps on the trip page: reserve a place (the 400 € deposit in
 * the partner store), or the softer "ask a question", which opens a chat with
 * Grieta. After the booking deadline only the question stays.
 */
export const TripPageBookingCta: FunctionComponent<TripPageBookingCtaProps> = ({
  placement,
  withDetails = true,
  className,
}) => {
  const phase = useTripPageBookingPhase();

  return (
    <div className={clsx(className, tripPageBookingCtaStyle)}>
      {phase === 'closed' ? (
        <p className={closedNoticeStyle}>
          Pieteikšanās šim ceļojumam ir slēgta. Uzraksti man, ja gribi braukt nākamajā reizē.
        </p>
      ) : (
        <TripPageReserveButton placement={placement} />
      )}

      <ContactLink
        className={buttonStyles({ variant: 'secondary' })}
        placement={`trip-page-ask-${placement}`}
      >
        {ASK_LABEL}
      </ContactLink>

      {withDetails && phase !== 'closed' && (
        <Dialog.Root>
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
                    Atlikušo summu varēsi pavisam ērti samaksāt man uz vietas Šrilankā. Tiklīdz
                    maksājums būs saņemts, es palīdzēšu:
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
                </Dialog.Description>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      )}
    </div>
  );
};
