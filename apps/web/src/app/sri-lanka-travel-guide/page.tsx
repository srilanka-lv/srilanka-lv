import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';
import type { FunctionComponent } from 'react';

import { GuidePageLayout } from '@/shared/components/guide-page-layout';
import { DEFAULT_OG_IMAGE } from '@/shared/constants/og-image';

/*
 * The pillar guide. Everything on this page is authored here, in code, rather
 * than in Sanity: the copy, the tables and the media. The Latvian draft it is
 * built from lives in docs/seo/pillar-page-draft-lv.md.
 */

const PATH = `/${PAGES.LV.GUIDE_TRIP}`;

/** Bump whenever the content changes; it drives the visible "Atjaunots" date. */
const UPDATED_AT = '2026-09-13';

const TITLE = 'Ceļojums uz Šrilanku: pilns ceļvedis no Madihas';
const DESCRIPTION =
  'Ceļojums uz Šrilanku bez aģentūras. Vīza, lidojumi no Rīgas, cenas eiro, maršruts un pludmales. Rakstām no Madihas, kur dzīvojam kopš 2022. gada.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: 'Šrilanka.lv',
    locale: 'lv_LV',
    type: 'article',
    images: [DEFAULT_OG_IMAGE],
  },
};

const NextSriLankaTravelGuidePage: FunctionComponent = () => (
  <GuidePageLayout href={PATH} updatedAt={UPDATED_AT}>
    <p>
      Ceļojums uz Šrilanku ir viena no tām lietām, ko latvietes pēdējos gados plāno arvien biežāk,
      un arvien biežāk plāno pašas. Es šeit dzīvoju kopš 2022. gada, Madihā, mazā piekrastes ciematā
      Šrilankas dienvidos, un katru sezonu redzu arvien vairāk ceļotāju no Latvijas.
    </p>
    <p>
      Šis ceļvedis ir viss, ko es pati gribētu būt zinājusi pirms sava pirmā brauciena: kā nokļūt no
      Rīgas, cik maksā vīza, cik maksā diena, kad braukt, kur palikt un no kā izvairīties.
    </p>

    <h2>Kur atrodas Šrilanka un kas tā ir</h2>
    <p>
      Šrilanka ir sala Indijas okeānā, Indijas dienvidu galā, aptuveni 8 500 kilometru attālumā no
      Rīgas. Pēc platības tā ir gandrīz tikpat liela kā Latvija, bet ar desmit reizes vairāk
      iedzīvotāju un ar okeānu visapkārt.
    </p>
  </GuidePageLayout>
);

export default NextSriLankaTravelGuidePage;
