'use client';

import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';

import { trackEvent } from '@/shared/utils/analytics';

import {
  backdropStyle,
  buttonIconStyle,
  buttonStyles,
  closeTriggerStyle,
  contentStyle,
  descriptionStyle,
  positionerStyle,
  titleStyle,
  tripPageHeroSectionCtaStyle,
} from './styles.css';

type TripPageHeroSectionCtaProps = {
  className?: string;
};

export const TripPageHeroSectionCta: FunctionComponent<TripPageHeroSectionCtaProps> = ({
  className,
}) => (
  <div className={clsx(className, tripPageHeroSectionCtaStyle)}>
    <button
      type="button"
      className={buttonStyles({ variant: 'primary' })}
      onClick={async () => {
        // Cap the tracking wait so a hung beacon can never stall the payment redirect.
        await Promise.race([
          trackEvent('product-cta', { product: 'girls-trip' }),
          new Promise((resolve) => {
            setTimeout(resolve, 400);
          }),
        ]);
        window.location.href =
          'https://revolut.me/srilankalv?currency=EUR&amount=25000&note=10%20dienu%20ce%C4%BCojums%20uz%20%C5%A0rilanku%20meiten%C4%93m%20-%20Rezerv%C4%81cija';
      }}
    >
      <svg
        className={buttonIconStyle}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        aria-label="Rezervē savu vietu!"
      >
        <path d="M404 207.9L204.7 104.2C196.7 100.1 187.4 99.4 179 102.5L137.9 117.5C127.6 121.2 124.1 133.9 130.8 142.5L232.3 270.4L132.1 306.8L72 270.2C65.8 266.4 58.2 265.7 51.3 268.1L35 274.1C25.6 277.5 21.6 288.6 26.7 297.2L80.3 389C95.9 415.7 128.4 427.4 157.4 416.8L170.3 412.1L170.3 412.1L568.7 267.1C597.8 256.5 612.7 224.4 602.2 195.3C591.7 166.2 559.5 151.3 530.4 161.8L404 207.9zM64.2 512C46.5 512 32.2 526.3 32.2 544C32.2 561.7 46.5 576 64.2 576L576.2 576C593.9 576 608.2 561.7 608.2 544C608.2 526.3 593.9 512 576.2 512L64.2 512z" />
      </svg>
      Rezervēt savu vietu! (250€)
    </button>

    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button type="button" className={buttonStyles({ variant: 'secondary' })}>
          Kas notiek, veicot rezervāciju?
        </button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop className={backdropStyle} />
        <Dialog.Positioner className={positionerStyle}>
          <Dialog.Content className={contentStyle}>
            <Dialog.CloseTrigger className={closeTriggerStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-label="Close">
                <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
              </svg>
            </Dialog.CloseTrigger>
            <Dialog.Title className={titleStyle}>Rezervējot savu vietu 🌴</Dialog.Title>
            <Dialog.Description className={descriptionStyle}>
              <p>
                Rezervējot savu vietu un veicot šo pirmo iemaksu, Tu oficiāli apstiprini savu dalību
                šajā piedzīvojumā.
              </p>{' '}
              <p>
                Šis maksājums man ļaus laikus nodrošināt Tavu vietu transportā, aktivitātēs un
                naktsmājās.
              </p>
              <p>
                Atlikušo summu varēsi pavisam ērti samaksāt uz vietas Šrilankā, skaidrā naudā.
                Tiklīdz maksājums būs saņemts, es palīdzēšu.
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
                  🌸 Un, protams, kad Tu ieradīsies, es sagaidīšu Tevi lidostā, lai kopā dotos uz
                  mūsu pirmajām naktsmājām.
                </li>
              </ul>
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  </div>
);
