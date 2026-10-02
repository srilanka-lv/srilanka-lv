/**
 * Builds the girls trip gallery photos from Grieta's originals.
 *
 * `bun scripts/build-trip-gallery-images.ts <source-dir>` (macOS: HEIC is decoded with `sips`)
 *
 * Every photo gets two stripped WebP files in public/images/meitenu-celojums-galerija:
 * `_sm`, a 768x480 crop in the page tiles' shape for the grid and the lightbox
 * thumbnails, and `_lg` (long edge 2048px), the whole photo, which only the lightbox
 * and the large photo on the page load. EXIF orientation is applied, the colours
 * are converted to sRGB and every metadata block (GPS, camera, dates) is dropped.
 * Nothing is upscaled. The width and height of each `_lg` file are printed for the
 * gallery data file.
 */

import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const OUTPUT_DIR = join(import.meta.dirname, '../public/images/meitenu-celojums-galerija');
const PUBLIC_IMAGES_DIR = join(import.meta.dirname, '../public/images');

const TILE = { width: 768, height: 480, quality: 74 };
const LARGE = { longEdge: 2048, quality: 76 };

// Source file -> output slug, plus where the tile crop sits from the top of the
// photo in percent (default 50) so the people stay in the page tiles.
// `public:` sources are photos already on the page with no original in the
// delivery; they are rebuilt from the site's own copy.
const PHOTOS: [source: string, slug: string, focusY?: number][] = [
  ['public:srilanka-lv_10-dienu-celojums_apmeklejot-udenskritumu.webp', 'udenskritums'],
  ['IMG_1174 2.HEIC', 'meitenes-pie-baseina', 50],
  ['IMG_2759 2.HEIC', 'rita-joga', 72],
  ['IMG_6187.HEIC', 'pie-devinu-arku-tilta', 52],
  ['public:srilanka-lv_meitenu-celojums_saulrieta-serfosana.webp', 'saulrieta-serfosana'],
  ['IMG_3042.jpg', 'zilonis', 35],
  ['IMG_7302 3.HEIC', 'pie-serfa-delu-plaukta', 62],
  ['IMG_8876 3.HEIC', 'atputa-okeana-vilnos', 65],
  ['GP011925 2.JPG', 'ar-motorolleri', 40],
  ['IMG_3304.HEIC', 'baseins-ar-skatu-uz-dzungliem', 80],
  ['IMG_6181 2.HEIC', 'devinu-arku-tilts', 60],
  ['IMG_3657.JPG', 'joga-saulrieta', 35],
  ['819f8f90-0c61-42d2-b33f-de32a863d986 2.JPG', 'srilankas-okeans', 70],
  ['IMG_5922.HEIC', 'svaigi-tropu-augli', 45],
  ['c8f213b1-4814-4ce8-bd5f-30ff5ed68604.jpg', 'dabigais-udens-slidkalnins', 55],
  ['IMG_2299 2.HEIC', 'smaids-pludmale'],
  ['IMG_0352.HEIC', 'saulriets-pie-okeana', 45],
  ['dbca0399-59b4-4200-9718-3ace1403233f.JPG', 'kokosrieksts-cela'],
  ['IMG_6729 2.heic', 'skats-no-klints', 55],
  ['449910e6-2d09-4a81-a33a-a183c9e8efd1.JPG', 'villa-ar-baseinu'],
  ['IMG_2482.HEIC', 'kokosrieksts-ar-hibisku', 45],
  ['IMG_6215.heic', 'stiepsanas-pie-strauta', 55],
  ['IMG_0639 2.HEIC', 'sveiciens-no-okeana', 72],
  ['IMG_6571.HEIC', 'budas-zoba-templis'],
  ['081bc449-da3c-4505-9c1c-f54444103a79.jpg', 'tropu-cels', 55],
  ['IMG_2529.HEIC', 'smutiju-bloda'],
  ['_H4A4516.JPG', 'upes-straume', 55],
  ['IMG_2272 2.HEIC', 'pastaiga-ar-suni', 72],
  ['IMG_7407.HEIC', 'pludmales-kafejnica', 68],
  ['0cf84a5f-1111-46cb-aff0-44828c5f5098.JPG', 'palmas-saulrieta'],
  ['_H4A4171 2.JPG', 'dzungli'],
  ['IMG_2491 3.HEIC', 'zelta-saulriets', 40],
];

const sourceDir = process.argv[2];

if (!sourceDir) {
  console.error('Usage: bun scripts/build-trip-gallery-images.ts <source-dir>');
  process.exit(1);
}

const workDir = mkdtempSync(join(tmpdir(), 'trip-gallery-'));

// libvips in the sharp build has no HEVC decoder, so HEIC goes through sips
// first. The PNG keeps the orientation tag and the colour profile.
const decodable = (source: string): string => {
  if (source.startsWith('public:')) {
    return join(PUBLIC_IMAGES_DIR, source.slice('public:'.length));
  }

  const path = join(sourceDir, source);

  if (!/\.heic$/i.test(source)) {
    return path;
  }

  const png = join(workDir, `${parse(source).name}.png`);
  execFileSync('sips', ['-s', 'format', 'png', path, '--out', png], { stdio: 'ignore' });

  return png;
};

const totals: Record<string, number> = {};

try {
  for (const [source, slug, focusY = 50] of PHOTOS) {
    const input = decodable(source);
    const { autoOrient } = await sharp(input).metadata();
    const { width, height } = autoOrient;

    // The widest strip of the photo in the tile's shape, centred on focusY.
    const tileRatio = TILE.width / TILE.height;
    const cropWidth = Math.min(width, Math.round(height * tileRatio));
    const cropHeight = Math.min(height, Math.round(width / tileRatio));
    const top = Math.round(
      Math.min(Math.max((height * focusY) / 100 - cropHeight / 2, 0), height - cropHeight),
    );
    const left = Math.round((width - cropWidth) / 2);

    const outputs = [
      {
        suffix: 'sm',
        pipeline: sharp(input)
          .rotate()
          .extract({ left, top, width: cropWidth, height: cropHeight })
          .resize(TILE.width, TILE.height, { withoutEnlargement: true }),
        quality: TILE.quality,
      },
      {
        suffix: 'lg',
        pipeline: sharp(input)
          .rotate()
          .resize(LARGE.longEdge, LARGE.longEdge, { fit: 'inside', withoutEnlargement: true }),
        quality: LARGE.quality,
      },
    ];
    const dimensions: string[] = [];

    for (const { suffix, pipeline, quality } of outputs) {
      const file = join(OUTPUT_DIR, `srilanka-lv_meitenu-celojums_${slug}_${suffix}.webp`);
      const info = await pipeline.toColourspace('srgb').webp({ quality, effort: 6 }).toFile(file);

      totals[suffix] = (totals[suffix] ?? 0) + statSync(file).size;
      dimensions.push(
        `${suffix} ${info.width}x${info.height} ${(statSync(file).size / 1024).toFixed(0)} KB`,
      );
    }

    console.log(`${slug}: ${dimensions.join(', ')}`);
  }
} finally {
  rmSync(workDir, { recursive: true, force: true });
}

for (const [suffix, bytes] of Object.entries(totals)) {
  console.log(`total ${suffix}: ${(bytes / 1024).toFixed(0)} KB`);
}
