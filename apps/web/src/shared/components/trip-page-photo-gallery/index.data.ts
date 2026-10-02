/**
 * The girls trip photo gallery, in display order. The first seven fill the
 * grid on the page (the first one is the large photo), and all of them open in
 * the full-screen gallery.
 *
 * Grieta can reorder the list, edit `alt` and `caption`, or delete a photo.
 * `alt` is read aloud to blind visitors and shown if the photo fails to load,
 * so every photo needs one. `caption` is optional and shows under the photo in
 * the full-screen gallery; leave it out rather than guess a place.
 *
 * `slug` names the two files in public/images/meitenu-celojums-galerija, built
 * by scripts/build-trip-gallery-images.ts: a small tile-shaped crop and the
 * large whole photo. `width` and `height` are the large file's pixels. A new
 * photo needs a line in that script too; the script also sets where the tile
 * crop sits.
 */

export type TripGalleryPhoto = {
  slug: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export const TRIP_GALLERY_GRID_SIZE = 7;

export const tripGalleryPhotos: TripGalleryPhoto[] = [
  {
    slug: 'udenskritums',
    alt: 'Laura Grieta no srilanka.lv apmeklē ūdenskritumu Šrilankā',
    width: 1686,
    height: 1000,
  },
  {
    slug: 'meitenes-pie-baseina',
    alt: 'Latviešu meiteņu grupa atpūšas pie baseina Šrilankā',
    caption: 'Atpūta pie baseina',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'rita-joga',
    alt: 'Rīta joga Šrilankas tropiskajā atmosfērā',
    caption: 'Rīta joga',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'pie-devinu-arku-tilta',
    alt: 'Meitene sēž pie Deviņu arku tilta Ellā',
    caption: 'Deviņu arku tilts Ellā',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'saulrieta-serfosana',
    alt: 'Sērfošana ar meitenēm Šrilankā',
    caption: 'Sērfošana saulrietā',
    width: 2048,
    height: 1280,
  },
  {
    slug: 'zilonis',
    alt: 'Zilonis tropu zaļumos Šrilankā',
    width: 1180,
    height: 2048,
  },
  {
    slug: 'pie-serfa-delu-plaukta',
    alt: 'Izbaudi sērfošanu, smiltis starp kāju pirkstiem un tropiskos kokosriekstus',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'atputa-okeana-vilnos',
    alt: 'Atpūta pludmalē ar zilām debesīm un skaistu apkārtni',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'ar-motorolleri',
    alt: 'Meitene ķiverē brauc ar motorolleri',
    caption: 'Ar motorolleri pa Šrilanku',
    width: 1454,
    height: 2048,
  },
  {
    slug: 'baseins-ar-skatu-uz-dzungliem',
    alt: 'Meitene peldbaseinā ar skatu uz džungļiem',
    caption: 'Baseins ar skatu uz džungļiem',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'devinu-arku-tilts',
    alt: 'Deviņu arku tilts Ellā starp zaļiem kalniem',
    caption: 'Deviņu arku tilts Ellā',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'joga-saulrieta',
    alt: 'Meitene jogas pozā pie okeāna saulrietā',
    caption: 'Joga saulrietā',
    width: 1152,
    height: 2048,
  },
  {
    slug: 'srilankas-okeans',
    alt: 'Zilais, tropiskais okeāns Šrilankā',
    width: 1536,
    height: 2040,
  },
  {
    slug: 'svaigi-tropu-augli',
    alt: 'Šķīvji ar banāniem, ananasu un arbūzu',
    caption: 'Svaigi tropu augļi',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'dabigais-udens-slidkalnins',
    alt: 'Meitene slīd lejup pa akmeņiem kalnu upē',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'smaids-pludmale',
    alt: 'Smaidoša meitene pludmalē saulainā dienā',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'saulriets-pie-okeana',
    alt: 'Oranžs saulriets pār okeāna klintīm',
    caption: 'Saulriets pie okeāna',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'kokosrieksts-cela',
    alt: 'Meitene pasniedz svaigu kokosriekstu ar salmiņu',
    width: 1600,
    height: 1144,
  },
  {
    slug: 'skats-no-klints',
    alt: 'Meitene uz klints virsotnes skatās pār mežainu līdzenumu',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'villa-ar-baseinu',
    alt: 'Meitene pie baseina tropiskā villā',
    width: 2048,
    height: 1259,
  },
  {
    slug: 'kokosrieksts-ar-hibisku',
    alt: 'Kokosrieksts ar sarkanu hibiska ziedu pie baseina',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'stiepsanas-pie-strauta',
    alt: 'Meitene stiepjas uz akmeņiem pie džungļu strauta',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'sveiciens-no-okeana',
    alt: 'Meitene māj no seklā, tirkīzzilā okeāna',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'budas-zoba-templis',
    alt: 'Budas zoba templis Kandī ar ziedu ziedojumiem',
    caption: 'Budas zoba templis Kandī',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'tropu-cels',
    alt: 'Meitene ar motorolleri uz tropu ceļa starp palmām',
    width: 2048,
    height: 1771,
  },
  {
    slug: 'smutiju-bloda',
    alt: 'Smūtiju bļoda ar mango, marakuju un hibiska ziedu',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'upes-straume',
    alt: 'Meitene atpūšas upes straumē džungļos',
    width: 1365,
    height: 2048,
  },
  {
    slug: 'pastaiga-ar-suni',
    alt: 'Meitene pastaigājas pa pludmali kopā ar suni',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'pludmales-kafejnica',
    alt: 'Divas meitenes atpūšas pludmales kafejnīcā pie okeāna',
    width: 1536,
    height: 2048,
  },
  {
    slug: 'palmas-saulrieta',
    alt: 'Palmas un okeāns rožainā saulrietā',
    width: 1600,
    height: 1096,
  },
  {
    slug: 'dzungli',
    alt: 'Saules apspīdēti tropu džungļi',
    width: 2048,
    height: 1365,
  },
  {
    slug: 'zelta-saulriets',
    alt: 'Zeltains saulriets pār pludmali',
    width: 1536,
    height: 2048,
  },
];

const IMAGE_DIR = '/images/meitenu-celojums-galerija';

export const tripGalleryImageSrc = (slug: string, size: 'sm' | 'lg'): string =>
  `${IMAGE_DIR}/srilanka-lv_meitenu-celojums_${slug}_${size}.webp`;
