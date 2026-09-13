import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { GuideAuthor } from '@/shared/components/guide-author';
import { GuideCallout } from '@/shared/components/guide-callout';
import { GuideFaq } from '@/shared/components/guide-faq';
import { GuideFigure } from '@/shared/components/guide-figure';
import { GuideLeadMagnet } from '@/shared/components/guide-lead-magnet';
import { GuidePageLayout } from '@/shared/components/guide-page-layout';
import { GuideSection } from '@/shared/components/guide-section';
import { GuideTable } from '@/shared/components/guide-table';
import { GuideToc } from '@/shared/components/guide-toc';
import { GuideTodo } from '@/shared/components/guide-todo';
import { GuideVideo } from '@/shared/components/guide-video';
import { INSTAGRAM_URL } from '@/shared/constants/instagram';
import { DEFAULT_OG_IMAGE } from '@/shared/constants/og-image';

import { GuideJsonLd } from './guide-json-ld';
import {
  DESCRIPTION,
  LEDE,
  PUBLISHED_AT,
  TITLE,
  UPDATED_AT,
  faqs,
  images,
  sections,
  tocItems,
  videoList,
  videos,
} from './index.data';

/*
 * The pillar guide. Everything is authored here in code: copy, tables and
 * media. The Latvian source draft is docs/seo/pillar-page-draft-lv.md, and the
 * strategy behind the section order is docs/seo/pillar-page-plan.md.
 *
 * Yellow <GuideTodo> marks and the "vietturis" images and videos are
 * placeholders: none of them may survive to release.
 */

const PATH = `/${PAGES.LV.GUIDE_TRIP}`;

const href = {
  bestTime: `/${PAGES.LV.INFO_BEST_TIME_TO_TRAVEL}`,
  flights: `/${PAGES.LV.FLIGHT_TICKETS}`,
  visa: `/${PAGES.LV.INFO_VISA}`,
  budget: `/${PAGES.LV.INFO_DAILY_BUDGET}`,
  whereToStay: `/${PAGES.LV.INFO_WHERE_TO_STAY}`,
  transport: `/${PAGES.LV.INFO_TRANSPORT}`,
  whatToDo: `/${PAGES.LV.INFO_WHAT_TO_DO}`,
  howLong: `/${PAGES.LV.INFO_HOW_LONG_TO_GO}`,
  girlsTrip: `/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_GIRLS_TRIP}`,
  post: (slug: string) => `/${PAGES.LV.BLOGS}/${slug}`,
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
  <>
    <GuideJsonLd
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      datePublished={PUBLISHED_AT}
      dateModified={UPDATED_AT}
      images={images}
      faqs={faqs}
      videos={videoList}
    />

    <GuidePageLayout href={PATH} updatedAt={UPDATED_AT} lede={LEDE} tocItems={tocItems}>
      <GuideFigure
        src="/images/guide/hero.svg"
        alt="Madihas pludmale Šrilankas dienvidos saullēktā"
        width={3456}
        height={2234}
        preload
        sizes="(min-width: 1024px) 768px, 100vw"
        caption="Vietturis. Šeit nāks hero foto no Madihas."
      />

      <p>
        Ceļojums uz Šrilanku pēdējos gados vairs nav nekāda eksotika. Latvieši to plāno arvien
        biežāk un arvien biežāk plāno paši, bez aģentūras. Es kopš 2022. gada dzīvoju Madihā, mazā
        piekrastes ciematā Šrilankas dienvidos, un katru sezonu te satieku arvien vairāk savējo.
      </p>
      <p>
        Šajā ceļvedī ir viss, ko es pati gribētu zināt pirms pirmā brauciena: kā tikt šurp no Rīgas,
        cik maksā vīza, cik maksā viena diena, kad braukt, kur palikt un no kā labāk izvairīties.
        Cenas visas ir eiro, un katrai ir klāt datums, jo Šrilankā tās mainās ātri.
      </p>

      <GuideVideo {...videos.intro} />

      <GuideToc items={tocItems} />

      <GuideTable
        rows={[
          ['Oficiālais nosaukums', 'Šrilankas Demokrātiskā Sociālistiskā Republika'],
          ['Galvaspilsēta', 'Šrī Džajavardenepura-Kote, lielākā pilsēta Kolombo'],
          ['Platība', '65 610 km², gandrīz tāda pati kā Latvijai (64 589 km²)'],
          ['Iedzīvotāji', '23 miljoniem (2026. gada septembrī)'],
          ['Valodas', 'singāļu un tamilu; angļu valodu tūrisma zonās saprot'],
          ['Valūta', '1 EUR = ~381.34 LKR (2026. gada septembrī)'],
          ['Laika starpība', '+3,5 stundas Latvijas ziemā, +2,5 stundas vasarā'],
          ['Tālruņa kods', '+94'],
          ['Lidosta', 'Bandaranaike (CMB), ap 35 km no Kolombo'],
          ['Vīza', 'ETA jānoformē tiešsaistē pirms lidojuma'],
          ['Rozetes', 'D un G tipa, 230 V'],
          ['Krāna ūdens', 'nedzer, tikai pudelēs pildītu vai filtrētu'],
        ]}
        caption="Īsie fakti par Šrilanku, 2026. gada septembris."
      />

      <GuideSection id={sections.where} title="Kur atrodas Šrilanka un kas tā ir">
        <p>
          Šrilanka ir sala Indijas okeānā, netālu no Indijas dienvidu gala, aptuveni 8 500 kilometru
          attālumā no Rīgas. Pēc platības tā ir gandrīz tikpat liela kā Latvija, bet ar desmit
          reizes vairāk iedzīvotāju un ar okeānu visapkārt.
        </p>

        <GuideFigure
          src="/images/guide/map.svg"
          alt="Karte ar lidojuma maršrutu no Rīgas uz Šrilanku ar pārsēšanos"
          width={1920}
          height={1080}
          caption="Vietturis. Šeit nāks karte ar Rīgu, pārsēšanās punktu un Kolombo."
        />

        <p>
          Līdz 1972. gadam sala saucās Ceilona, un tāpēc tēja no šejienes joprojām ir Ceilonas tēja.
          Oficiālā galvaspilsēta ir Šrī Džajavardenepura-Kote, bet dzīve un lidosta ir Kolombo, un
          tur sākas arī lielākā daļa ceļojumu. Aptuveni 70 procenti iedzīvotāju ir budisti, un to
          jūt visur: tempļos, svētku dienās un tajā, cik mierīgs te ir ikdienas ritms.
        </p>
        <p>
          Salai ir sešas UNESCO kultūras mantojuma vietas: Sigiriya, Kandy, Anuradhapura,
          Polonnaruva, Dambullas alu tempļi un Galles forts. Trīs no tām ir maršrutā, ko iesaku
          zemāk.
        </p>

        <GuideCallout tone="personal">
          <p>
            Svarīgākais, kas par Šrilanku jāsaprot: tā nav liela, bet tā ir lēna. Ceļš, kas kartē
            izskatās pēc divām stundām, dzīvē ir četras. To labāk zināt uzreiz, jo tieši tas izlemj,
            cik daudz tu paspēsi redzēt.
          </p>
        </GuideCallout>
      </GuideSection>

      <GuideSection id={sections.when} title="Kad doties uz Šrilanku">
        <p>
          Labākais laiks ceļojumam uz Šrilankas dienvidiem ir no novembra līdz aprīlim. Tas sakrīt
          ar Latvijas ziemu, un tieši tāpēc lielākā daļa latviešu brauc šajā laikā.
        </p>
        <p>
          Šrilankā ir divas musonu sezonas, un tās nenāk pār visu salu reizē. Dienvidrietumu
          piekrastē, kur ir Mirissa, Madiha, Galle un Kolombo, lietus līst no maija līdz augustam,
          bet sausā sezona ilgst no novembra līdz aprīlim. Ziemeļos un austrumos, kur ir Arugam Bay
          un Trincomalee, viss ir otrādi: sauss no maija līdz septembrim, lietains no oktobra līdz
          janvārim.
        </p>
        <p>
          Vienkāršais likums, ko es saku visiem: kad Latvijā ir ziema, brauc uz dienvidiem un
          rietumiem. Kad Latvijā ir vasara, brauc uz austrumiem un ziemeļiem.
        </p>

        <GuideTable
          head={['Mēnesis', 'Kur braukt', 'Laiks']}
          rows={[
            ['Janvāris', 'Dienvidi un rietumi', 'Sauss, saulains, silts'],
            ['Februāris', 'Dienvidi un rietumi', 'Ļoti sauss un saulains'],
            ['Marts', 'Dienvidi un rietumi', 'Silts, pārsvarā sauss'],
            ['Aprīlis', 'Dienvidi un rietumi', 'Karsts, iespējams neliels lietus'],
            ['Maijs', 'Ziemeļi un austrumi', 'Sauss, labs laiks pludmalēm un sērfošanai'],
            ['Jūnijs', 'Ziemeļi un austrumi', 'Sauss, saulains, vējaināks'],
            ['Jūlijs', 'Ziemeļi un austrumi', 'Silts un sauss'],
            ['Augusts', 'Ziemeļi un austrumi', 'Ļoti labs laiks atpūtai'],
            ['Septembris', 'Ziemeļi un austrumi', 'Silts, iespējams īslaicīgs lietus'],
            ['Oktobris', 'Visā salā mainīgi', 'Lietaināks periods'],
            ['Novembris', 'Dienvidi un rietumi', 'Sākas sausā sezona, vairāk saules'],
            ['Decembris', 'Dienvidi un rietumi', 'Sauss, silts un saulains'],
          ]}
          caption="Kurā mēnesī kurp braukt. Tā pati tabula, kas lapā par labāko ceļošanas laiku."
        />

        <GuideTable
          head={['Mēnesis', 'Gaiss dienā', 'Gaiss naktī', 'Ūdens', 'Lietainas dienas']}
          rows={[
            ['Janvāris', '29 °C', '24 °C', '28 °C', 'ap 7'],
            ['Februāris', '29 °C', '24 °C', '28 °C', 'ap 6'],
            ['Marts', '30 °C', '25 °C', '29 °C', 'ap 9'],
            ['Aprīlis', '30 °C', '26 °C', '29 °C', 'ap 14'],
            ['Maijs', '30 °C', '26 °C', '29 °C', 'ap 20'],
            ['Jūnijs', '29 °C', '25 °C', '28 °C', 'ap 18'],
            ['Jūlijs', '29 °C', '25 °C', '27 °C', 'ap 14'],
            ['Augusts', '29 °C', '25 °C', '27 °C', 'ap 13'],
            ['Septembris', '29 °C', '25 °C', '28 °C', 'ap 16'],
            ['Oktobris', '29 °C', '24 °C', '28 °C', 'ap 20'],
            ['Novembris', '29 °C', '24 °C', '28 °C', 'ap 17'],
            ['Decembris', '29 °C', '24 °C', '28 °C', 'ap 11'],
          ]}
          caption="Temperatūra Šrilankas dienvidu piekrastē. Aptuvenas vidējās vērtības, jāapstiprina pirms publicēšanas."
        />

        <GuideFigure
          src="/images/guide/infographic-season.svg"
          alt="Infografika ar Šrilankas sezonām pa mēnešiem dienvidos un austrumos"
          width={1920}
          height={1080}
          caption="Vietturis. Šeit nāks sezonu infografika ar tiem pašiem skaitļiem, kas tabulā."
        />

        <p>
          Temperatūra dienvidos praktiski nemainās visu gadu. Mainās tikai lietus. Pat lietus
          sezonā, no jūnija līdz augustam, dienvidos ir karsts, un līst īsi, parasti pēcpusdienā vai
          naktī. Es te dzīvoju visu gadu, un jūnijs pie okeāna joprojām ir labāks nekā jūnijs Rīgā.
        </p>

        <GuideCallout tone="tip">
          <p>
            Ja gribi lētāk, plāno pa vidu: ne decembra beigās, kad cenas ir visaugstākās, un ne
            jūlija vidū. Mans ieteikums ir novembra sākums vai aprīlis. Tur cena un laiks sakrīt
            vislabāk.
          </p>
        </GuideCallout>

        <p>
          Vairāk par sezonām:{' '}
          <Link href={href.bestTime}>labākais laiks, lai ceļotu uz Šrilanku</Link>.
        </p>
      </GuideSection>

      <GuideSection id={sections.flights} title="Kā nokļūt no Rīgas uz Šrilanku">
        <p>
          Tieša lidojuma no Rīgas uz Šrilanku nav. Ērtākais ceļš ir ar vienu pārsēšanos Stambulā,
          Abū Dabī, Dubaijā vai Dohā, un ceļā kopā paiet no 15 līdz 18 stundām.
        </p>
        <p>
          Mūsu lidojumu cenu rīks 2026. gada jūlijā un augustā rādīja šādas lētākās vienvirziena
          biļetes no Rīgas uz Kolombo:
        </p>
        <ul>
          <li>no 380 līdz 420 eiro oktobrī, novembrī un janvāra otrajā pusē,</li>
          <li>no 500 līdz 550 eiro janvāra beigās un februārī,</li>
          <li>no 650 līdz 740 eiro Ziemassvētku un Jaungada nedēļās.</li>
        </ul>
        <p>
          Turp un atpakaļ rēķinies ar 750 līdz 1 000 eiro ārpus svētkiem un ar 1 300 eiro vai
          vairāk, ja lido decembra beigās. Biļetes ir lielākais ceļojuma izdevums, tāpēc pērc tās
          vismaz divus līdz trīs mēnešus iepriekš.
        </p>
        <p>
          Turkish Airlines caur Stambulu ir ātrākais variants ar vienu pārsēšanos, aptuveni 14
          stundas 45 minūtes. Etihad caur Abū Dabī kopā ar airBaltic vai LOT parasti ir lētākais.
          Emirates caur Dubaiju un Qatar Airways caur Dohu ir kaut kur pa vidu.
        </p>
        <p>
          Ielidosi Bandaranaike lidostā (CMB) pie Kolombo. Līdz dienvidu piekrastei no turienes ir
          2,5 līdz 3,5 stundas pa šoseju. Vislētāk un vienkāršāk ir ar PickMe lietotni, vietējo
          Boltu, kas cenu parāda jau pirms brauciena. Brauciens no lidostas līdz Madihai maksā
          aptuveni 75 līdz 100 eiro.
        </p>

        <GuideCallout tone="tip">
          <p>
            Pēc ielidošanas rēķinies ar 30 līdz 40 minūšu rindu imigrācijā. Tā ir katru reizi, arī
            man. Nerezervē transfēru uz precīzu minūti.
          </p>
        </GuideCallout>

        <p>
          Aktuālās cenas mēnesi pa mēnesim:{' '}
          <Link href={href.flights}>kad ir lētāk lidot uz Šrilanku no Rīgas</Link>. Dati atjaunojas
          katru nedēļu.
        </p>
      </GuideSection>

      <GuideSection id={sections.visa} title="Šrilankas vīza Latvijas pilsoņiem">
        <p>
          Latvijas pilsoņiem ceļojumam uz Šrilanku ir vajadzīga tūristu vīza ETA, ko noformē
          tiešsaistē pirms lidojuma. Latvija nav to 40 valstu sarakstā, kurām Šrilanka 2026. gadā
          vīzu izsniedz bez maksas, tāpēc mums par to ir jāmaksā.
        </p>
        <ul>
          <li>
            ETA ir derīga 30 dienas, un to var pagarināt līdz pat sešiem vai deviņiem mēnešiem.
          </li>
          <li>Maksa ir aptuveni 60 EUR par cilvēku, bērniem līdz 12 gadiem parasti bez maksas.</li>
          <li>Piesakies vismaz septiņas dienas pirms lidojuma.</li>
          <li>
            Piesakies tikai oficiālajā lapā{' '}
            <a
              href="https://www.eta.gov.lk/slvisa/"
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="outbound-link"
              data-umami-event-url="https://www.eta.gov.lk/slvisa/"
            >
              eta.gov.lk
            </a>
            . Internetā ir desmitiem starpnieku lapu, kas prasa divreiz vairāk.
          </li>
        </ul>

        <h3>Kā pieteikties, soli pa solim</h3>
        <ol>
          <li>Atver oficiālo lapu, izvēlies Apply un Tourist ETA.</li>
          <li>Ievadi datus precīzi tā, kā pasē. Viena kļūdaina zīme, un pieteikumu noraida.</li>
          <li>Ievadi ielidošanas datumu, pirmās naktsmītnes adresi un atpakaļlidojuma datumu.</li>
          <li>Atbildi uz drošības jautājumiem. Ja nav nekā īpaša, visur “No”.</li>
          <li>Samaksā ar karti un saglabā apstiprinājumu telefonā.</li>
        </ol>

        <GuideTable
          head={['Dokuments', 'Kāpēc']}
          rows={[
            ['Pase', 'Derīga vismaz 6 mēnešus pēc ielidošanas datuma'],
            ['Apstiprināta ETA', 'Pierādījums, ka drīksti ieceļot'],
            ['Atpakaļceļa vai tālākā lidojuma biļete', 'Pierādījums, ka plāno izceļot laikā'],
            ['Naktsmītņu rezervācijas', 'Dažreiz lūdz uzrādīt'],
            ['Pietiekami daudz līdzekļu', 'Reti, bet var pajautāt'],
          ]}
          caption="Ko var prasīt imigrācijā pēc ielidošanas."
        />

        <p>
          Pilns ceļvedis ar kļūdām, kuras redzu visbiežāk:{' '}
          <Link href={href.visa}>kā iegūt Šrilankas tūristu vīzu Latvijas pilsoņiem</Link>.
        </p>
      </GuideSection>

      <GuideSection id={sections.cost} title="Cik maksā ceļojums uz Šrilanku">
        <p>
          Divu nedēļu ceļojums uz Šrilanku, ja to plāno patstāvīgi, maksā no aptuveni 1 550 eiro
          budžeta variantā līdz 2 250 eiro ar komfortu, ieskaitot biļetes un vīzu. Aģentūru paketes
          Latvijā 2026. gada rudenī maksā no 1 500 līdz 2 650 eiro par 10 līdz 13 naktīm. Tātad par
          to pašu naudu vari būt šeit divas nedēļas un visu laiku darīt, ko gribi.
        </p>

        <GuideTable
          head={['Stils', 'Diena', '14 dienas uz vietas', 'Kopā ar biļetēm un vīzu']}
          rows={[
            ['Budžeta ceļojums', 'ap 50 EUR', 'ap 700 EUR', 'ap 1 550 EUR'],
            ['Ceļojums ar komfortu', 'ap 100 EUR', 'ap 1 400 EUR', 'ap 2 250 EUR'],
          ]}
          caption="Divu nedēļu ceļojuma kopsavilkums. Biļetes rēķinātas ap 800 eiro."
        />

        <GuideTable
          head={['Kas', 'Cena', 'Piezīme']}
          rows={[
            ['Rice and curry', '3 EUR', 'Vietējā ēstuvē, ne tūristu kafejnīcā'],
            [
              'Kafija tūristu kafejnīcā',
              '1,50 līdz 5 EUR',
              'Maksās vairāk, ja ņemsi ar auzu pienu',
            ],
            ['Maltīte kafejnīcā', '3 līdz 15 EUR', 'Rietumu ēdiens 3 līdz 4 reizes dārgāks'],
            ['Alus Lion', '2 EUR', 'Maksās vairāk, ja pērc restorānos pie okeāna'],
            ['Ūdens 1,5 l', '1 EUR', 'Nedzer ūdeni no krāna'],
            ['Kokosrieksts', '1 EUR', 'Prasi ar ledu'],
            ['Tuk-tuks īsam braucienam', '1 līdz 5 EUR', 'Vienojies par cenu pirms brauciena'],
            ['PickMe pilsētā', '3 līdz 15 EUR', ''],
            ['Autobuss', '0,50 līdz 2 EUR', 'Vislētākais veids, kā ceļot Šrilankā'],
            ['Vilciens', '1 līdz 10 EUR', '3. klase Ella–Nanu Oja ap 0,60 EUR'],
            ['Skūtera noma dienā', '3 līdz 7 EUR', 'Pilna bāka ap 3 EUR'],
            ['Auto ar šoferi dienā', '60 līdz 100 EUR', ''],
            ['Nakts viesu mājā', '20 līdz 60 EUR', 'Hosteļi un homestay 8 līdz 15 EUR'],
            ['Nakts villā ar baseinu', '200 līdz 450 EUR', ''],
            ['SIM karte ar 10 līdz 30 GB', '5 līdz 10 EUR', 'Lidostā'],
            ['Joga vai pilates nodarbība', 'ap 8 EUR', 'Ja ņem 5x vai 10x abonementu, būs lētāk'],
            ['Vaļu vērošana Mirissā', '75 EUR', ''],
            ['Safari Udawalawē', '50 EUR', ''],
          ]}
          caption="Cenas uz vietas, 2026. gada septembris, Šrilankas dienvidos."
        />

        <GuideFigure
          src="/images/guide/infographic-cost.svg"
          alt="Infografika ar 14 dienu ceļojuma izmaksu sadalījumu Šrilankā"
          width={1920}
          height={1080}
          caption="Vietturis. Šeit nāks izmaksu infografika ar tiem pašiem skaitļiem, kas tabulā."
        />

        <p>
          Slēptās izmaksas, par kurām neviens nebrīdina: ieejas maksas populārajos objektos
          tūristiem ir daudzkārt augstākas nekā vietējiem, tuk-tuku cena bez vienošanās var
          dubultoties, un pica vai burgers maksā trīs līdz četras reizes vairāk nekā rice and curry.
        </p>
        <p>
          Šrilankā joprojām valda skaidra nauda. Kartes pieņem lielākās viesnīcas un restorāni, bet
          ārpus tūristu zonām gandrīz viss notiek skaidrā. Bankomāti ir visur, tikai ar komisiju,
          tāpēc izņem lielāku summu uzreiz.
        </p>

        <GuideCallout tone="tip">
          <p>
            Vienmēr turi līdzi mazas banknotes. Tirgū un tuk-tukā par lielu banknoti sīknaudu ne
            vienmēr atradīs.
          </p>
        </GuideCallout>

        <p>
          Vairāk: <Link href={href.budget}>dienas budžets ceļojumam uz Šrilanku</Link> un{' '}
          <Link href={href.post('vai-celot-uz-srilanku-ir-dargi')}>
            vai ceļot uz Šrilanku ir dārgi
          </Link>
          .
        </p>
      </GuideSection>

      <GuideSection id={sections.regions} title="Šrilankas reģioni vienā tabulā">
        <p>
          Šrilanka ir maza sala ar piecām pilnīgi atšķirīgām daļām. Šī tabula ir ātrākais veids, kā
          saprast, kurp tieši tev jābrauc.
        </p>

        <GuideTable
          head={['Reģions', 'Kam der', 'Labākie mēneši', 'Cik dienas']}
          rows={[
            [
              'Dienvidu piekraste',
              'Pludmales, sērfošana, snorkelēšana, kafejnīcas, vaļu vērošana',
              'Novembris–aprīlis',
              '5–7',
            ],
            [
              'Kalnu reģions',
              'Pārgājieni, tējas plantācijas, vilcienu braucieni, ūdenskritumi',
              'Janvāris–marts',
              '2–3',
            ],
            [
              'Kultūras trīsstūris',
              'Sigiriya, Dambulla, Anuradhapura, Polonnaruva, tempļi',
              'Visu gadu',
              '2–3',
            ],
            [
              'Austrumu piekraste',
              'Sērfošana, niršana, mierīgas pludmales, mazāk tūristu',
              'Maijs–septembris',
              '3–5',
            ],
            [
              'Nacionālie parki',
              'Safari: ziloņi, leopardi, krokodili, putni',
              'Visu gadu, sausajā sezonā labāk',
              '1–2',
            ],
          ]}
          caption="Kurā Šrilankas daļā ko darīt un kad."
        />
      </GuideSection>

      <GuideSection id={sections.highlights} title="Ko redzēt Šrilankā: galvenās vietas">
        <p>
          Šrilankā ir sešas UNESCO mantojuma vietas, divi nacionālie parki ar ziloņiem un
          leopardiem, kalnu reģions ar tējas plantācijām un ap 1 300 kilometru piekrastes. Šis ir
          saraksts ar vietām, kuras es tiešām iesaku, un pie katras ir godīga piezīme.
        </p>

        <GuideTable
          head={['Vieta', 'Kas tas ir', 'Cik ilgi', 'Mans viedoklis']}
          rows={[
            [
              'Sigiriya',
              'Klints, kas paceļas 180 metrus virs apkārtnes un 349 metrus virs jūras līmeņa, ar 5. gadsimta cietoksni, freskām un dārziem. UNESCO vieta.',
              'Pusdiena, kāpiens ap 1,5 stundu',
              'Jā, bet kāp saullēktā. Dienas vidū ir karsts un pilns ar cilvēkiem.',
            ],
            [
              'Dambullas alu tempļi',
              'Lielākais alu tempļu komplekss salā, vairāk nekā 150 Budas statujas.',
              'Ap 1,5 stundu',
              'Jā, un to ir viegli apvienot ar Sigiriyu vienā dienā.',
            ],
            [
              'Kandy un Zoba relikvijas templis',
              'Budisma svētākā vieta Šrilankā, pilsēta ap mākslīgu ezeru.',
              'Pusdiena',
              'Jā, bet vienai naktij pietiek. Kalnu miers sākas tikai aiz Kandy.',
            ],
            [
              'Ella un Deviņu arku tilts',
              'Kalnu ciemats, tējas plantācijas, Little Adam’s Peak, Ravanas ūdenskritums.',
              '2 līdz 3 dienas',
              'Jā. Mana vismīļākā vieta Šrilankā, un gaiss tur ir pavisam cits.',
            ],
            [
              'Galles forts',
              'Holandiešu cietoksnis ar koloniālām ieliņām, veikaliem un bāku.',
              'Pusdiena',
              'Jā. Viegli sasniedzams no jebkuras dienvidu pludmales.',
            ],
            [
              'Udawalawe vai Yala',
              'Nacionālie parki. Udawalawē ziloņi, Yalā arī leopardi.',
              'Pusdiena, no rīta',
              'Jā. Man Udawalawe patīk labāk: ziloņi ir garantēti un džipu ir mazāk.',
            ],
            [
              'Mirissa un Coconut Tree Hill',
              'Fotografētākā vieta dienvidos un viena no skaistākajām pludmalēm.',
              '1 stunda skatam, vairākas dienas pludmalei',
              'Jā, bet ej saullēktā vai saulrietā, kad tur nav rindas.',
            ],
            [
              'Tējas plantācijas',
              'Nuwara Eliya, Haputale, Ellas apkārtne. Ceilonas tēja un kalnu ainavas.',
              'Pusdiena',
              'Jā, un pa taciņām tur var pastaigāt bez maksas.',
            ],
            [
              'Adam’s Peak',
              'Svētais kalns, 2 243 metri. Svētceļnieki kāpj naktī, lai augšā sagaidītu saullēktu.',
              'Visa nakts, kāpiens 3 līdz 4 stundas',
              'Tikai ar labu fizisko formu. Vieglāka alternatīva ir Little Adam’s Peak Ellā.',
            ],
            [
              'Anuradhapura un Polonnaruva',
              'Senās galvaspilsētas ar tempļu drupām, statujām un ūdenskrātuvēm.',
              'Viena diena katrai',
              'Tikai tad, ja patīk vēsture. Ar Sigiriyu un Dambullu pietiek, ja laika ir maz.',
            ],
            [
              'Ūdenskritumi',
              'Ravana Ellā, Dijaluma, Koodalu Dola dienvidos.',
              '1 līdz 3 stundas',
              'Jā. Ņem līdzi peldkostīmu, daudzos var nopeldēties.',
            ],
          ]}
          caption="Galvenās apskates vietas Šrilankā un cik daudz laika tām atvēlēt."
        />

        <GuideCallout tone="personal">
          <p>
            Gandrīz viss, ko gribēsi redzēt, atrodas citā salas pusē. Sala nav liela, bet sešas
            stundas ceļā vienā virzienā vienas vienīgas vietas dēļ nav tā vērtas. Izvēlies divas vai
            trīs vietas un apvieno tās ar tuvāko pilsētu.
          </p>
        </GuideCallout>

        <p>
          Sīkāk par katru vietu:{' '}
          <Link href={href.post('ko-redzet-srilanka')}>ko redzēt Šrilankā</Link> un{' '}
          <Link
            href={href.post('ko-redzet-ko-darit-kur-palikt-labakie-ieteikumi-srilankas-dienvidiem')}
          >
            labākie ieteikumi Šrilankas dienvidiem
          </Link>
          .
        </p>
      </GuideSection>

      <GuideSection id={sections.activities} title="Ko darīt Šrilankā: aktivitātes">
        <p>
          Šrilankā vienā ceļojumā var iemācīties sērfot, vērot vaļus, izbraukt safari, uzkāpt kalnā
          un iemācīties pagatavot kariju. Tabulā ir tikai tas, ko esmu izmēģinājusi pati, ar vietu
          un aptuveno cenu.
        </p>

        <GuideTable
          head={['Aktivitāte', 'Kur', 'Kad', 'Cena']}
          rows={[
            ['Sērfošana iesācējiem', 'Weligama', 'Novembris–aprīlis', '15 EUR'],
            [
              'Sērfošana ar pieredzi',
              'Midigama, Ahangama',
              'Novembris–aprīlis',
              '1 EUR par stundu',
            ],
            ['Vaļu un delfīnu vērošana', 'Mirissa', 'Novembris–aprīlis', '45 EUR'],
            [
              'Snorkelēšana ar bruņurupučiem',
              'Madiha, Polhena',
              'Visu gadu',
              'Bez maksas, maskas noma ap 3 EUR',
            ],
            ['Niršana', 'Unawatuna, Hikkaduwa', 'Novembris–aprīlis', '45 EUR'],
            [
              'Safari ar džipu',
              'Udawalawe, Yala, Minneriya',
              'Visu gadu, sausajā sezonā labāk',
              '100 EUR',
            ],
            ['Krokodilu tūre pa upi', 'Nilwalas upe pie Mataras', 'Visu gadu', '25 EUR'],
            ['Sikspārņu vakars uz ezera', 'Mirissa', 'Visu gadu', '15 EUR'],
            ['Joga vai pilates', 'Madiha, Mirissa, Weligama', 'Visu gadu', 'Ap 8 EUR nodarbība'],
            [
              'Ajūrvēdas masāža',
              'Weligama, Mirissa',
              'Visu gadu',
              <>
                10 EUR vai 100 EUR ja gribi skaistā vietā, kā{' '}
                <a href="https://goodspa.lk/" rel="noopener noreferrer" target="_blank">
                  Good Spa
                </a>
              </>,
            ],
            [
              'Ēdiena gatavošanas meistarklase',
              'Gandrīz katrā tūristu pilsētā',
              'Visu gadu',
              <>
                30 EUR kā{' '}
                <a
                  href="https://www.airbnb.com/experiences/6553301"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Prabodi
                </a>
              </>,
            ],
            ['Pārgājiens Little Adam’s Peak', 'Ella', 'Visu gadu', 'Bez maksas'],
            [
              'Vilciena brauciens kalnos',
              'Kandy–Ella vai Ella–Nanu Oja',
              'Visu gadu',
              '0,60 līdz 15 EUR atkarībā no klases',
            ],
            ['Bruņurupuču vērošana dabā', 'Rekawa, Hiriketiya', 'Sezonā, vakaros', '5 EUR'],
            [
              'Gredzenu darināšana juvelieru darbnīcā',
              'Weligama',
              'Visu gadu',
              <>
                40 EUR kā{' '}
                <a
                  href="https://www.sapienssrilanka.com/jewelryworkshop"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Sapiens
                </a>
              </>,
            ],
            [
              'SUP vai kajaks',
              'Koggala ezers',
              'Visu gadu',
              <>
                35 EUR kā{' '}
                <a
                  href="https://discoverborderlands.com/weligama/stand-up-paddle-board-lesson-and-tour/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Borderlands
                </a>
              </>,
            ],
          ]}
          caption="Aktivitātes Šrilankā ar vietu, sezonu un aptuveno cenu, 2026. gada septembris."
        />

        <h3>Ko es neiesaku</h3>
        <ul>
          <li>
            Ekskursijas, ko piedāvā uz ielas. Ziloņu apskates, slepenie tempļi un īpašie piedāvājumi
            no tuk-tuka loga gandrīz vienmēr nozīmē, ka pārmaksāsi, un bieži vien ieeja tur
            patiesībā ir bez maksas.
          </li>
          <li>
            Vietas, kur piedāvā jāt ar ziloņiem vai kur dzīvniekus tur mazos aplokos. Safari
            nacionālajā parkā ir gan lētāk, gan godīgāk pret dzīvniekiem.
          </li>
          <li>
            Kandy - Ella slaveno vilciena maršrutu. Tev sanāks pārmaksāt un ceļu nevarēsi izbaudīt,
            jo viss būs pārpildīts! Iesaku izvēlēties jebkuru citu vilcienu braucienā no Ella. Skati
            tie paši, bet cena daudz izdveīgāka. Kāp iekšā pēdējais, lai tiec stāvāt tieši pie
            atvērtajām durvīm!
          </li>
        </ul>

        <p>
          Vairāk: <Link href={href.whatToDo}>ko darīt un ko nedarīt Šrilankas brīvdienās</Link>.
        </p>
      </GuideSection>

      <GuideSection id={sections.route} title="Maršruts 10 līdz 14 dienām">
        <p>
          Šrilankā 14 dienās var apvienot kultūras trīsstūri, kalnus, safari un dienvidu pludmales,
          ja vien nemaini vietu katru dienu. Šo maršrutu es ieteiktu cilvēkam, kurš uz Šrilanku
          brauc pirmo reizi.
        </p>

        <GuideFigure
          src="/images/guide/route.svg"
          alt="Ceļojuma maršruts pa Šrilanku 14 dienām no Kolombo līdz Madihai"
          width={1920}
          height={1080}
          caption="Vietturis. Šeit nāks maršruta karte ar sešām pieturām."
        />

        <GuideTable
          head={['Dienas', 'Vieta', 'Kāpēc', 'Naktis']}
          rows={[
            ['1', 'Kolombo vai Negombo', 'Ielido, izguli lidojumu. Neplāno neko vairāk.', '1'],
            [
              '2–3',
              'Sigiriya un Dambulla',
              'Lauvas klints saullēktā, Dambullas alu tempļi, ziloņi Minneriyā.',
              '2',
            ],
            ['4', 'Kandy', 'Zoba relikvijas templis, ezers, vakara ceremonija.', '1'],
            [
              '5–7',
              'Ella',
              'Little Adam’s Peak, Deviņu arku tilts, tējas plantācijas, ūdenskritumi.',
              '2–3',
            ],
            ['8', 'Udawalawe vai Yala', 'Safari no rīta. Udawalawe: ziloņi, mazāk džipu.', '1'],
            [
              '9–10',
              'Hiriketiya vai Tangalle',
              'Pirmās pludmales dienas, sērfošana iesācējiem, joga.',
              '2',
            ],
            [
              '11–14',
              'Madiha, Mirissa vai Weligama',
              'Okeāns, snorkelēšana, vaļu vērošana sezonā, Galles forts.',
              '3–4',
            ],
          ]}
          caption="Maršruts 14 dienām. Pēdējā dienā 2,5 līdz 3,5 stundas līdz lidostai."
        />

        <p>
          Ja tev ir 10 dienas, izlaid nakti Kolombo un Kandy, brauc no lidostas uzreiz uz Sigiriyu
          un no Ellas pa taisno uz dienvidiem. Ja tev ir viena nedēļa, paliec tikai dienvidos.
          Vienai nedēļai visa sala vienkārši ir par tālu.
        </p>

        <p>
          Sīkāk par katru vietu:{' '}
          <Link href={href.post('ko-redzet-srilanka')}>ko redzēt Šrilankā</Link>,{' '}
          <Link href={href.post('ella-srilanka-ko-redzet-darit-un-vai-ir-verts-turp-doties')}>
            Ella
          </Link>
          ,{' '}
          <Link href={href.post('mirissa-srilanka-ko-redzet-darit-un-vai-ir-verts-turp-doties')}>
            Mirissa
          </Link>{' '}
          un <Link href={href.howLong}>cik ilgu laiku ieplānot</Link>. Ja brauc ar bērniem:{' '}
          <Link href={href.post('celojums-uz-srilanku-ar-berniem')}>ceļojums ar bērniem</Link>.
        </p>
      </GuideSection>

      <GuideSection id={sections.stay} title="Dienvidu piekraste: kur palikt">
        <p>
          Šrilankas dienvidu piekraste no Galles līdz Tangallei ir tā vieta, kur ceļotāji no
          Latvijas pavada lielāko daļu sava ceļojuma, un katrs ciemats tur ir citāds. Es dzīvoju
          Madihā un esmu palikusi katrā no šīm vietām, tāpēc šis ir mans godīgais salīdzinājums.
        </p>

        <GuideVideo {...videos.southCoast} />

        <GuideTable
          head={['Vieta', 'Kam der', 'Kas tur ir', 'Nakts no']}
          rows={[
            [
              'Madiha',
              'Mieram, jogai un sērfošanai bez pūļiem',
              'Klusa pludmale, snorkelēšana, bruņurupuči',
              <GuideTodo key="madiha">cena</GuideTodo>,
            ],
            [
              'Mirissa',
              'Pirmajam braucienam, draugu kompānijai',
              'Skaistākā pludmale, vaļu vērošana, saulrieti',
              <GuideTodo key="mirissa">cena</GuideTodo>,
            ],
            [
              'Weligama',
              'Tiem, kas tikai mācās sērfot, un attālinātam darbam',
              'Sērfošanas skolas, coworking, lēti hosteļi',
              <GuideTodo key="weligama">cena</GuideTodo>,
            ],
            [
              'Ahangama',
              'Tiem, kam patīk skaistas, estētiskas kafejnīcas un tūristīga gaisotne.',
              'Boutique viesnīcas, sērfošana pieredzējušiem',
              <GuideTodo key="ahangama">cena</GuideTodo>,
            ],
            [
              'Unawatuna',
              'Piemērots naktsdzīvei un ģimenēm. Labi, ja protat krievu valodu.',
              'Viegli pieejama pludmale, restorāni, tuvu Gallei',
              <GuideTodo key="unawatuna">cena</GuideTodo>,
            ],
            [
              'Hiriketiya',
              'Lieliski piemērots sērfošanas cienītājiem, kuri ceļo vieni.',
              'Sērfošana, joga, mierīga peldēšanās',
              <GuideTodo key="hiriketiya">cena</GuideTodo>,
            ],
            [
              'Tangalle un Talalla',
              'Tukšai pludmalei',
              'Garas, klusas pludmales, maz tūristu',
              <GuideTodo key="tangalle">cena</GuideTodo>,
            ],
          ]}
          caption="Dienvidu pludmaļu salīdzinājums, 2026. gada septembris."
        />

        <GuideFigure
          src="/images/guide/beach-madiha.svg"
          alt="Madihas pludmale ar palmām Šrilankas dienvidos"
          width={1920}
          height={1080}
          caption="Vietturis. Madihas pludmale."
        />

        <p>
          Sērfošana: Weligama ir labākā vieta, kur sākt, pat ja tā tev būs pirmā reize uz dēļa.
          Midigama un Ahangama ir tiem, kas jau prot. Sērfot dienvidos var visu sausās sezonas
          laiku, no novembra līdz aprīlim.
        </p>
        <p>
          Naktsmītnes vidēji maksā no 20 līdz 60 eiro naktī. Hosteļi un homestay ir 8 līdz 15 eiro,
          villa ar privātu baseinu var maksāt arī 400 eiro. Rezervē caur Booking vai Airbnb, bet, ja
          paliec ilgāk, pajautā saimniekiem cenu uz vietas, tā bieži ir daudz zemāka.
        </p>

        <GuideCallout tone="warning">
          <p>
            Ja rezervācijā rakstīts, ka wifi ir, pārjautā vēlreiz. Ne vienmēr tā ir taisnība.
            Mobilais internets Šrilankā gandrīz vienmēr ir labāks par viesnīcas wifi.
          </p>
        </GuideCallout>

        <GuideFigure
          src="/images/guide/beach-mirissa.svg"
          alt="Mirissas līcis un Coconut Tree Hill saulrietā"
          width={1920}
          height={1080}
          caption="Vietturis. Mirissa, Coconut Tree Hill."
        />

        <GuideFigure
          src="/images/guide/beach-weligama.svg"
          alt="Sērfotāji Weligamas līcī Šrilankā"
          width={1920}
          height={1080}
          caption="Vietturis. Weligama, sērfošana iesācējiem."
        />

        <p>
          Vairāk: <Link href={href.whereToStay}>kurās Šrilankas vietās vislabāk palikt</Link> un, ja
          gribi ko īpašu,{' '}
          <Link href={href.post('labaka-naktsmitne-srilankas-dienvidos-amare-villas-madiha')}>
            Amare Villas Madihā
          </Link>
          .
        </p>
      </GuideSection>

      <GuideLeadMagnet
        title="Šrilankas dienvidu ceļvedis PDF formātā"
        note={
          <>
            Reizi mēnesī atsūtīšu arī jaunumus par lidojumu cenām un salu. Atteikties var ar vienu
            klikšķi.{' '}
            <GuideTodo>vietturis: piegāde vēl nav ieslēgta, sk. request-guide-pdf.ts</GuideTodo>
          </>
        }
      >
        Esmu sagatavojusi atsevišķu ceļvedi par Šrilankas dienvidiem:{' '}
        <GuideTodo>kas tieši ir PDF: pludmales, kafejnīcas, naktsmītnes, karte</GuideTodo>. Atstāj
        e-pastu, un es to atsūtīšu.
      </GuideLeadMagnet>

      <GuideSection id={sections.transport} title="Transports Šrilankā">
        <p>
          Pa Šrilanku pārvietoties ir viegli un lēti, bet lēni. Populārākie veidi ir tuk-tuks,
          PickMe taksometrs, skūteris, vilciens un autobuss, un katram ir sava vieta ceļojumā.
        </p>

        <GuideVideo {...videos.transport} />

        <ul>
          <li>
            <strong>PickMe.</strong> Šrilankas Bolt. Cena redzama pirms brauciena, nav jākaulējas.
            Ja šoferis brauciena laikā piedāvā kaut kur apstāties, saki nē, par to būs jāpiemaksā.
          </li>
          <li>
            <strong>Tuk-tuks.</strong> Īsiem braucieniem piekrastē. Vienmēr vienojies par cenu pirms
            iekāpšanas. Ja nevienojies, brauciens par 2 eiro galamērķī izmaksās 8.
          </li>
          <li>
            <strong>Skūteris.</strong> Vispopulārākais veids dienvidos, 3 līdz 7 eiro dienā. Legāli
            vajadzīgas starptautiskās tiesības ar motocikla kategoriju vai vietējā atļauja, ko tagad
            var noformēt turpat lidostā. Ķivere vienmēr.
          </li>
          <li>
            <strong>Vilciens.</strong> Lēns, pārpildīts un ļoti skaists. Kandy–Ella biļetes
            jārezervē nedēļas iepriekš, visos citos maršrutos pērc stacijā. 2. klase ir labākā
            izvēle: var atvērt logus.
          </li>
          <li>
            <strong>Autobuss.</strong> Daži centi par braucienu, grafika nav, pieturas nav marķētas.
            Pajautā vietējiem, viņi vienmēr pasaka, kur kāpt ārā.
          </li>
          <li>
            <strong>Auto ar šoferi.</strong> 60 līdz 100 eiro dienā. Ērtākais variants garākiem
            pārbraucieniem, ar bērniem vai lielu bagāžu.
          </li>
        </ul>

        <GuideCallout tone="warning">
          <p>
            Vilciens regulāri brauc cauri tuneļiem. Katru gadu notiek nelaimes, kad cilvēki, kas
            karājas durvīs, lai nofotografētos, nepaspēj atkāpties. Neviena bilde nav tā vērta.
          </p>
        </GuideCallout>

        <p>
          Vairāk: <Link href={href.transport}>transports Šrilankā</Link> un{' '}
          <Link
            href={href.post('srilankas-brauciens-ar-vilcienu-viss-kas-jazina-pirms-dodies-cela')}
          >
            brauciens ar vilcienu
          </Link>
          .
        </p>
      </GuideSection>

      <GuideSection id={sections.safety} title="Drošība un ceļošana vienatnē">
        <p>
          Šrilanka ir droša valsts ceļotājiem, arī tad, ja brauc vienatnē. Es šeit dzīvoju kopš
          2022. gada un nevienā brīdī neesmu jutusies nedroši. Galvenie riski nav noziedzība, bet
          satiksme, karstums un pārmaksāšana tūristu vietās.
        </p>

        <h3>Ko es ievēroju kā sieviete, kura šeit dzīvo</h3>
        <ul>
          <li>
            Lielajās pilsētās un ārpus pludmales ģērbjos pieticīgāk, pleci un ceļi nosegti. Nevis
            tāpēc, ka kāds skatītos dīvaini, bet tāpēc, ka tā šeit ir pieņemts.
          </li>
          <li>Naktī viena nestaigāju pa vientuļām vietām. Tāpat es darītu jebkur citur.</li>
          <li>
            Tuk-tuku šoferiem un gidiem māku pateikt nē, ar smaidu. Šrilankieši ne vienmēr saprot
            vārdu nē no pirmās reizes, un personīgā telpa šeit ir cita. Tas nav domāts ļauni.
          </li>
          <li>
            Vērtīgās lietas turu aizvērtā somā pārpildītā vilcienā un tirgū. Kabatzagļi izmanto
            brīžus, kad visi fotografē.
          </li>
          <li>
            Neuzķeros uz īpašiem piedāvājumiem uz ielas: ekskursijām, ziloņu apskatēm, slepeniem
            tempļiem. Bieži ieeja tur ir bez maksas.
          </li>
        </ul>

        <p>
          Vislielākā krāpšana Šrilankā ir pārmaksāšana. Tūristam cena vienmēr būs mazliet augstāka,
          jo vietējie pelna krietni mazāk. Strīdēties nav vērts, te tas neko nedod. Ar smaidu un
          mieru tiksi daudz tālāk.
        </p>
        <p>
          Bez ceļojuma apdrošināšanas uz Šrilanku nebrauc. Biežākās traumas ir no satiksmes
          negadījumiem, it sevišķi ar skūteri. Privātās klīnikas strādā ātri un labi, bet rēķins var
          iet simtos un tūkstošos eiro.
        </p>
        <p>
          Obligātu vakcīnu nav. Ārsti mēdz ieteikt vakcīnas pret A un B hepatītu, vēdertīfu un
          stingumkrampjiem. Malārija nav aktuāla, bet odi pārnēsā dengue, tāpēc pretodu līdzeklis ir
          obligāts un labāk to pirkt uz vietas. Krāna ūdeni nedzer. Sauleskrēms ik pēc 30 minūtēm.
        </p>
        <p>
          Oficiālā informācija:{' '}
          <a
            href="https://www.mfa.gov.lv/lv/srilanka-celojumu-bridinajumi"
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="outbound-link"
            data-umami-event-url="https://www.mfa.gov.lv/lv/srilanka-celojumu-bridinajumi"
          >
            Ārlietu ministrijas ceļojumu brīdinājumi Šrilankai
          </a>
          .
        </p>
        <p>
          Vairāk:{' '}
          <Link href={href.post('vai-celot-uz-srilanku-ir-drosi')}>
            vai ceļot uz Šrilanku ir droši
          </Link>{' '}
          un{' '}
          <Link href={href.post('kas-jazina-pirms-celo-uz-srilanku')}>
            kas jāzina pirms ceļo uz Šrilanku
          </Link>
          .
        </p>
      </GuideSection>

      <GuideSection id={sections.food} title="Ēdiens Šrilankā">
        <p>
          Šrilankas ēdiens ir krāsains, aromātisks, lēts un gandrīz vienmēr ass. Nacionālais ēdiens
          ir rice and curry: rīsi ar vairākām mazām piedevām, dārzeņu karijiem, lēcām, kokosriekstu
          sambolu un dažreiz vistu vai zivi. Katrā vietā tas ir citāds.
        </p>

        <GuideFigure
          src="/images/guide/food.svg"
          alt="Rice and curry uz banānu lapas vietējā ēstuvē Šrilankas dienvidos"
          width={1920}
          height={1080}
          caption="Vietturis. Rice and curry uz banānu lapas."
        />

        <h3>Pieci ēdieni, kas jānogaršo</h3>
        <ol>
          <li>
            <strong>Rice and curry.</strong> Katru dienu citāds. Visgaršīgākais ir vienkāršās
            vietējās ēstuvēs, kur ēd paši šrilankieši.
          </li>
          <li>
            <strong>Hoppers (appa).</strong> Bļodiņas formas pankūkas no rīsu miltiem un
            kokosriekstu piena. Egg hopper ar olu vidū ir klasika.
          </li>
          <li>
            <strong>Kottu roti.</strong> Sasmalcināta roti maize ar dārzeņiem, olu vai gaļu.
            Dzirdēsi, kā to gatavo, vēl pirms ieraudzīsi.
          </li>
          <li>
            <strong>String hoppers.</strong> Smalkas rīsu nūdeļu ligzdiņas brokastīs ar kariju.
          </li>
          <li>
            <strong>Uzkodas.</strong> Samosas, zivju kotletes, pildīti pīrādziņi. Ātri un par
            centiem.
          </li>
        </ol>

        <GuideCallout tone="personal">
          <p>
            Es šeit dzīvoju gadiem un joprojām katru reizi saku “Please, no spicy”. Pat tad ēdiens
            būs pikantāks nekā gaidi. Pirmajās dienās pārliecinies trīs reizes, ka pavārs saprata.
          </p>
        </GuideCallout>

        <p>
          Vai var saindēties? Man šajos gados tas nav gadījies ne reizi. Ēd tur, kur jau sēž
          vietējie un kur ēdienu gatavo svaigu.
        </p>
        <p>
          Manas mīļākās vietas vietējai virtuvei: Saras Kitchen, Malli’s Hoppers, Kalage, Papa
          Jeevz. Eiropas garšām: Surf Lodge, Atha, KIP, KOH Mirissā.
        </p>
        <p>
          Vairāk: <Link href={href.post('ediens-srilanka')}>ēdiens Šrilankā</Link>.
        </p>
      </GuideSection>

      <GuideSection id={sections.practical} title="Praktiskā informācija">
        <h3>Nauda un kartes</h3>
        <p>
          Valūta ir Šrilankas rūpija. Maksā ar skaidru naudu, karti pieņem tikai lielākajās vietās.
          Bankomāti ir visur, bet ar komisiju. Starptautiskas kartes strādā labāk nekā Latvijas
          banku kartes. Naudu var izņemt jau lidostā.
        </p>

        <h3>SIM karte un internets</h3>
        <p>
          Lidostā uzreiz nopērc vietējo SIM karti, Dialog, Mobitel vai SLT, par 5 līdz 10 eiro ar 10
          līdz 30 GB. Ar to pietiek visam ceļojumam. Mobilais internets Šrilankā ir labāks nekā wifi
          viesnīcās, un, kad pazūd elektrība, tas ir vienīgais, kas vēl strādā. Ņem līdzi power
          banku un izslēdz Latvijas SIM kartes mobilos datus.
        </p>

        <h3>Rozetes</h3>
        <p>D un G tipa, 230 V. Universālais adapteris der.</p>

        <h3>Tempļu etiķete</h3>
        <p>
          Tempļos jānosedz pleci un ceļi, apavi jānovelk pie ieejas, un fotografējoties nekad
          nestāvi ar muguru pret Budas statuju. Pusdienlaikā akmens grīda ir tik karsta, ka pēdas
          apdeg: paņem līdzi zeķes. Un plāns sarongs somā izglābj gandrīz vienmēr.
        </p>

        <h3>Ko ņemt līdzi</h3>
        <p>
          Vieglas kokvilnas vai lina drēbes, garās bikses vai svārki tempļiem, plāns džemperis Ellai
          un vilcienam, lietus jaka ārpus sausās sezonas, sandales un slēgti apavi Sigiriyai.
          Sauleskrēms uz vietas ir dārgs, ņem līdzi no Latvijas. Pretodu līdzekli pērc uz vietas.
          Neņem līdzi daudz drēbju, dārgas rotaslietas un smagu čemodānu: vilcienā un tuk-tukā katrs
          kilograms ir jūtams.
        </p>

        <p>
          Vairāk:{' '}
          <Link href={href.post('ko-nemt-lidzi-uz-srilanku')}>ko ņemt līdzi uz Šrilanku</Link> un,
          ja plāno strādāt attālināti,{' '}
          <Link href={href.post('srilanka-digitalajiem-nomadiem')}>
            Šrilanka digitālajiem nomadiem
          </Link>
          .
        </p>
      </GuideSection>

      <GuideSection id={sections.souvenirs} title="Ko atvest no Šrilankas">
        <p>
          No Šrilankas visvairāk ir vērts vest tēju, garšvielas un kaut ko no vietējiem amatniekiem.
          Ceilonas tēju pērc plantācijās vai specializētos veikalos, ne lidostā. Kanēlis no
          Šrilankas ir īstais Ceilonas kanēlis, un tirgū tas maksā centus. Vērts paņemt arī
          kardamonu, krustnagliņas, karija maisījumus, sarongu, batikas audumus un kokosriekstu
          eļļu.
        </p>

        <GuideFigure
          src="/images/guide/spices.svg"
          alt="Garšvielas un Ceilonas tēja Šrilankas tirgū"
          width={1920}
          height={1080}
          caption="Vietturis. Garšvielu tirgus vai tējas plantācija."
        />

        <p>
          <GuideTodo>
            Grieta: tavs personīgais saraksts, ko tu vedi mājās draugiem, divi līdz trīs teikumi
          </GuideTodo>
        </p>
        <p>
          Muitas noteikumi: tēju un garšvielas var vest bez ierobežojumiem personīgai lietošanai.
          Neved koraļļus, gliemežvākus un neko, kas nāk no savvaļas dzīvniekiem. Par to sodu dabūsi
          jau Šrilankas lidostā.
        </p>
      </GuideSection>

      <GuideSection id={sections.reviews} title="Ko saka citi ceļotāji">
        <blockquote>
          <GuideTodo>Citāts 1, vārds, ar atļauju</GuideTodo>
        </blockquote>
        <blockquote>
          <GuideTodo>Citāts 2, vārds, ar atļauju</GuideTodo>
        </blockquote>
        <blockquote>
          <GuideTodo>Citāts 3, vārds, ar atļauju</GuideTodo>
        </blockquote>

        <GuideFigure
          src="/images/guide/group.svg"
          alt="Meiteņu ceļojuma grupa Šrilankas dienvidu piekrastē"
          width={1920}
          height={1080}
          caption="Vietturis. Grupas foto no iepriekšējā meiteņu ceļojuma."
        />

        <p>
          Manas pašas lielākās bailes pirms pirmā brauciena bija netīrība, krāpšana, bankomāti,
          valoda, karstums un transports no lidostas. Realitāte izrādījās daudz maigāka nekā bailes.
          Visu stāstu esmu uzrakstījusi šeit:{' '}
          <Link href={href.post('celojums-uz-srilanku-atsauksmes')}>
            ceļojums uz Šrilanku, atsauksmes un mana pieredze
          </Link>
          .
        </p>
      </GuideSection>

      <GuideSection id={sections.faq} title="Biežāk uzdotie jautājumi">
        <GuideFaq items={faqs} />
      </GuideSection>

      <GuideSection id={sections.trip} title="Ceļo kopā ar mani">
        <p>
          Ja, to visu lasot, radās sajūta, ka gribi to piedzīvot, bet ne viena pati, 2027. gada
          janvārī es vedu uz Šrilanku nelielu meiteņu grupu. Dienvidu piekraste, kalni un safari, un
          es visu laiku esmu blakus. Sīkāk:{' '}
          <Link href={href.girlsTrip}>meiteņu ceļojums uz Šrilanku</Link>.
        </p>
        <p>
          Ikdienu no Madihas rādu{' '}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="outbound-link"
            data-umami-event-url={INSTAGRAM_URL}
          >
            Instagramā
          </a>
          . Ja kaut kas par ceļojuma plānošanu palika neskaidrs, raksti man. Atbildu visām.
        </p>
      </GuideSection>

      <GuideAuthor
        name="Laura Grieta Grinberga"
        portraitSrc="/images/guide/author.svg"
        portraitAlt="Grieta Šrilankas dienvidos, Madihā"
      >
        <p>
          Kopš 2022. gada dzīvo Šrilankas dienvidos, Madihā, pirms tam vairākas sezonas pavadīja
          Šrilankā un Bali. Raksta vietnē srilanka.lv un vada meiteņu ceļojumus. Ikdiena no salas:{' '}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="outbound-link"
            data-umami-event-url={INSTAGRAM_URL}
          >
            @dzivetropos
          </a>
          .
        </p>
      </GuideAuthor>
    </GuidePageLayout>
  </>
);

export default NextSriLankaTravelGuidePage;
