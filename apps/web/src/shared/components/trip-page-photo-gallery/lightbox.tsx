'use client';

import { Carousel, useCarousel } from '@ark-ui/react/carousel';
import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { type FunctionComponent, type KeyboardEvent, useEffect, useRef, useState } from 'react';

import type { TripGalleryNavigation, TripGallerySession } from './gallery-session';
import { type TripGalleryPhoto, tripGalleryImageSrc, tripGalleryPhotos } from './index.data';
import {
  lightboxArrowStyle,
  lightboxBackdropStyle,
  lightboxCaptionStyle,
  lightboxCloseStyle,
  lightboxContentStyle,
  lightboxCounterStyle,
  lightboxFrameStyle,
  lightboxImageStyle,
  lightboxItemGroupStyle,
  lightboxPositionerStyle,
  lightboxSlideStyle,
  lightboxStageStyle,
  lightboxThumbnailImageStyle,
  lightboxThumbnailStyle,
  lightboxThumbnailsStyle,
  lightboxTitleStyle,
  lightboxTopBarStyle,
  lightboxViewportStyle,
} from './lightbox.css';

const count = tripGalleryPhotos.length;

const wrap = (index: number) => (index + count) % count;

// A portrait photo fills the screen height long before it fills the width, so
// the browser only needs a file as wide as the height allows.
const photoSizes = ({ width, height }: TripGalleryPhoto) =>
  `(min-aspect-ratio: ${width}/${height}) ${((width / height) * 100).toFixed(1)}vh, 100vw`;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type TripPagePhotoLightboxProps = {
  open: boolean;
  startIndex: number;
  session: TripGallerySession;
  onClose: () => void;
  returnFocusTo: () => HTMLElement | null;
};

type GalleryCarouselProps = {
  startIndex: number;
  session: TripGallerySession;
};

const GalleryCarousel: FunctionComponent<GalleryCarouselProps> = ({ startIndex, session }) => {
  // Set by the arrows, keys and thumbnails just before they move the carousel;
  // a page change with no intent behind it came from a swipe or a scroll.
  const intent = useRef<TripGalleryNavigation | null>(null);
  const thumbnails = useRef<(HTMLButtonElement | null)[]>([]);
  // Only the photo on screen and its two neighbours load their large file;
  // photos already seen stay loaded so going back does not flash.
  const [loaded, setLoaded] = useState(
    () => new Set([wrap(startIndex - 1), startIndex, wrap(startIndex + 1)]),
  );

  const carousel = useCarousel({
    slideCount: count,
    defaultPage: startIndex,
    loop: true,
    translations: {
      item: (index, total) => `${index + 1}. fotogrāfija no ${total}`,
      indicator: (index) => `Rādīt ${index + 1}. fotogrāfiju`,
      prevTrigger: 'Iepriekšējā fotogrāfija',
      nextTrigger: 'Nākamā fotogrāfija',
    },
    onPageChange: ({ page }) => {
      session.view(page, intent.current ?? 'swipe');
      setLoaded((previous) => new Set([...previous, wrap(page - 1), page, wrap(page + 1)]));
    },
  });

  const { page } = carousel;
  const photo = tripGalleryPhotos[page];

  useEffect(() => {
    thumbnails.current[page]?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [page]);

  const move = (direction: 'prev' | 'next', via: TripGalleryNavigation) => {
    intent.current = via;
    // Looping from the last photo to the first jumps instead of scrolling
    // back past every photo in between.
    const wraps = direction === 'prev' ? page === 0 : page === count - 1;
    const instant = wraps || prefersReducedMotion();

    if (direction === 'prev') {
      carousel.scrollPrev(instant);
    } else {
      carousel.scrollNext(instant);
    }
  };

  const isArrowKey = (event: KeyboardEvent) =>
    event.key === 'ArrowLeft' || event.key === 'ArrowRight';

  // Capture runs before the thumbnail strip's own arrow keys move the page.
  const onKeyDownCapture = (event: KeyboardEvent) => {
    if (isArrowKey(event)) {
      intent.current = 'key';
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    // The thumbnail strip has already moved the page.
    if (event.defaultPrevented || !isArrowKey(event)) {
      return;
    }

    event.preventDefault();
    move(event.key === 'ArrowLeft' ? 'prev' : 'next', 'key');
  };

  const forgetIntent = () => {
    intent.current = null;
  };

  return (
    <Carousel.RootProvider
      value={carousel}
      className={lightboxStageStyle}
      onKeyDownCapture={onKeyDownCapture}
      onKeyDown={onKeyDown}
    >
      {/* Inside the carousel root so the arrow keys work wherever focus is. */}
      <div className={lightboxTopBarStyle}>
        <Dialog.CloseTrigger className={lightboxCloseStyle} aria-label="Aizvērt galeriju">
          <X size={24} aria-hidden="true" />
        </Dialog.CloseTrigger>
      </div>
      <p className={lightboxCounterStyle}>
        {page + 1} / {count}
      </p>
      <div className={lightboxViewportStyle}>
        <Carousel.ItemGroup
          className={lightboxItemGroupStyle}
          onTouchStart={forgetIntent}
          onWheel={forgetIntent}
          onPointerDown={forgetIntent}
        >
          {tripGalleryPhotos.map((item, index) => (
            <Carousel.Item key={item.slug} index={index} className={lightboxSlideStyle}>
              <span className={lightboxFrameStyle}>
                {loaded.has(index) && (
                  <Image
                    className={lightboxImageStyle}
                    src={tripGalleryImageSrc(item.slug, 'lg')}
                    alt={item.alt}
                    fill
                    sizes={photoSizes(item)}
                    quality={75}
                    loading="eager"
                    fetchPriority={index === page ? 'high' : 'low'}
                    draggable={false}
                  />
                )}
              </span>
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
        <Carousel.PrevTrigger
          className={lightboxArrowStyle({ side: 'prev' })}
          onClick={(event) => {
            event.preventDefault();
            move('prev', 'arrow');
          }}
        >
          <ChevronLeft size={28} aria-hidden="true" />
        </Carousel.PrevTrigger>
        <Carousel.NextTrigger
          className={lightboxArrowStyle({ side: 'next' })}
          onClick={(event) => {
            event.preventDefault();
            move('next', 'arrow');
          }}
        >
          <ChevronRight size={28} aria-hidden="true" />
        </Carousel.NextTrigger>
      </div>
      <p className={lightboxCaptionStyle} aria-hidden={!photo.caption}>
        {photo.caption}
      </p>
      <Carousel.IndicatorGroup className={lightboxThumbnailsStyle}>
        {tripGalleryPhotos.map((item, index) => (
          <Carousel.Indicator
            key={item.slug}
            index={index}
            ref={(element) => {
              thumbnails.current[index] = element;
            }}
            className={lightboxThumbnailStyle}
            // Capture runs before Ark's own click handler changes the page.
            onClickCapture={() => {
              intent.current = 'thumbnail';
            }}
          >
            <Image
              className={lightboxThumbnailImageStyle}
              src={tripGalleryImageSrc(item.slug, 'sm')}
              alt=""
              fill
              sizes="64px"
              quality={75}
            />
          </Carousel.Indicator>
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.RootProvider>
  );
};

/** Full-screen gallery: Ark Dialog for focus and Escape, Ark Carousel for the photos. */
export const TripPagePhotoLightbox: FunctionComponent<TripPagePhotoLightboxProps> = ({
  open,
  startIndex,
  session,
  onClose,
  returnFocusTo,
}) => {
  // Leaving the page with the gallery open still closes the visit.
  useEffect(() => {
    if (!open) {
      return;
    }

    window.addEventListener('pagehide', session.close);

    return () => window.removeEventListener('pagehide', session.close);
  }, [open, session]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={({ open: isOpen }) => {
        if (!isOpen) {
          onClose();
        }
      }}
      lazyMount
      unmountOnExit
      // The gallery covers the whole screen, so nothing outside it can be
      // touched; an "outside" focus is the tap that opened it still settling
      // (WebKit), which would otherwise close it at once. Escape and the close
      // button still close it.
      closeOnInteractOutside={false}
      finalFocusEl={returnFocusTo}
    >
      <Portal>
        <Dialog.Backdrop className={lightboxBackdropStyle} />
        <Dialog.Positioner className={lightboxPositionerStyle}>
          <Dialog.Content className={lightboxContentStyle}>
            <Dialog.Title className={lightboxTitleStyle}>Ceļojuma fotogrāfijas</Dialog.Title>
            <GalleryCarousel startIndex={startIndex} session={session} />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
