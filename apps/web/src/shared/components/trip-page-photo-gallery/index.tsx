'use client';

import { Images } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { type FunctionComponent, type ReactNode, useRef, useState } from 'react';

import {
  type TripGalleryOpenSource,
  type TripGallerySession,
  startTripGallerySession,
} from './gallery-session';
import { TRIP_GALLERY_GRID_SIZE, tripGalleryImageSrc, tripGalleryPhotos } from './index.data';
import {
  tripPhotoGalleryMainTileStyle,
  tripPhotoGalleryMoreStyle,
  tripPhotoGalleryOverlayStyle,
  tripPhotoGalleryTileButtonStyle,
  tripPhotoGalleryTileImageStyle,
  tripPhotoGalleryTileStyle,
  tripPhotoGalleryTilesStyle,
} from './styles.css';

// The full-screen gallery is its own chunk: it downloads when the visitor
// points at or focuses the photos, so the page itself ships none of it.
const loadLightbox = () => import('./lightbox').then((module) => module.TripPagePhotoLightbox);
const TripPagePhotoLightbox = dynamic(loadLightbox, { ssr: false });

const prefetchLightbox = () => {
  void loadLightbox();
};

const slugs = tripGalleryPhotos.map(({ slug }) => slug);
const [mainPhoto, ...tilePhotos] = tripGalleryPhotos.slice(0, TRIP_GALLERY_GRID_SIZE);
const hiddenCount = tripGalleryPhotos.length - TRIP_GALLERY_GRID_SIZE;

type Visit = {
  startIndex: number;
  session: TripGallerySession;
};

type TripPagePhotoGalleryProps = {
  /** Laid over the large photo without taking clicks, e.g. the price tag. */
  children?: ReactNode;
};

/**
 * The trip photos on the page: one large photo and six tiles, each opening the
 * full-screen gallery at that photo. Renders two grid items, so it slots into
 * the hero's photo grid in place of the old static images.
 */
export const TripPagePhotoGallery: FunctionComponent<TripPagePhotoGalleryProps> = ({
  children,
}) => {
  const [visit, setVisit] = useState<Visit | null>(null);
  const [open, setOpen] = useState(false);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const openAt = (index: number, source: TripGalleryOpenSource) => {
    setVisit({ startIndex: index, session: startTripGallerySession(slugs, index, source) });
    setOpen(true);
  };

  const close = () => {
    visit?.session.close();
    setOpen(false);
  };

  const tileButton = (index: number, label: string, source: TripGalleryOpenSource = 'photo') => ({
    ref: (element: HTMLButtonElement | null) => {
      tileRefs.current[index] = element;
    },
    type: 'button' as const,
    className: tripPhotoGalleryTileButtonStyle,
    'aria-haspopup': 'dialog' as const,
    'aria-label': label,
    onClick: () => openAt(index, source),
    onPointerEnter: prefetchLightbox,
    onFocus: prefetchLightbox,
  });

  return (
    <>
      <span className={tripPhotoGalleryMainTileStyle}>
        <span className={tripPhotoGalleryOverlayStyle}>{children}</span>
        <button {...tileButton(0, `Skatīt galerijā: ${mainPhoto.alt}`)}>
          <Image
            className={tripPhotoGalleryTileImageStyle}
            src={tripGalleryImageSrc(mainPhoto.slug, 'lg')}
            alt={mainPhoto.alt}
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            preload
            quality={75}
          />
        </button>
      </span>
      <span className={tripPhotoGalleryTilesStyle}>
        {tilePhotos.map((photo, tileIndex) => {
          const index = tileIndex + 1;
          const isLast = index === TRIP_GALLERY_GRID_SIZE - 1 && hiddenCount > 0;

          return (
            <span key={photo.slug} className={tripPhotoGalleryTileStyle}>
              <button
                {...tileButton(
                  index,
                  isLast
                    ? `Skatīt visas ${tripGalleryPhotos.length} fotogrāfijas`
                    : `Skatīt galerijā: ${photo.alt}`,
                  isLast ? 'more' : 'photo',
                )}
              >
                <Image
                  className={tripPhotoGalleryTileImageStyle}
                  src={tripGalleryImageSrc(photo.slug, 'sm')}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  quality={75}
                />
                {isLast && (
                  <span className={tripPhotoGalleryMoreStyle} aria-hidden="true">
                    <Images size={18} />+{hiddenCount}
                  </span>
                )}
              </button>
            </span>
          );
        })}
      </span>
      {visit && (
        <TripPagePhotoLightbox
          open={open}
          startIndex={visit.startIndex}
          session={visit.session}
          onClose={close}
          returnFocusTo={() => tileRefs.current[visit.startIndex] ?? null}
        />
      )}
    </>
  );
};
