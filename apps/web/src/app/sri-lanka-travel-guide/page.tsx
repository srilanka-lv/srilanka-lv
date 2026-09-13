import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { GuideAuthor } from '@/shared/components/guide-author';
import { GuideCallout } from '@/shared/components/guide-callout';
import { GuideFaq } from '@/shared/components/guide-faq';
import { GuideFigure } from '@/shared/components/guide-figure';
import { GuidePageLayout } from '@/shared/components/guide-page-layout';
import { GuideSection } from '@/shared/components/guide-section';
import { GuideTable } from '@/shared/components/guide-table';
import { GuideToc } from '@/shared/components/guide-toc';
import { GuideTodo } from '@/shared/components/guide-todo';
import { GuideVideo } from '@/shared/components/guide-video';
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

    <GuidePageLayout href={PATH} updatedAt={UPDATED_AT} lede={LEDE}>
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
        Ceļojums uz Šrilanku ir viena no tām lietām, ko latvietes pēdējos gados plāno arvien biežāk,
        un arvien biežāk plāno pašas. Es šeit dzīvoju kopš 2022. gada, Madihā, mazā piekrastes
        ciematā Šrilankas dienvidos, un katru sezonu redzu arvien vairāk ceļotāju no Latvijas.
      </p>
      <p>
        Šis ceļvedis ir viss, ko es pati gribētu būt zinājusi pirms sava pirmā brauciena: kā nokļūt
        no Rīgas, cik maksā vīza, cik maksā diena, kad braukt, kur palikt un no kā izvairīties.
        Visas cenas ir eiro un ar datumu, jo Šrilankā tās mainās.
      </p>

      <GuideVideo {...videos.intro} />

      <GuideToc items={tocItems} />

      <GuideTable
        rows={[
          ['Oficiālais nosaukums', 'Šrilankas Demokrātiskā Sociālistiskā Republika'],
          ['Galvaspilsēta', 'Šrī Džajavardenepura-Kote, lielākā pilsēta Kolombo'],
          ['Platība', '65 610 km², gandrīz tikpat, cik Latvijai (64 589 km²)'],
          ['Iedzīvotāji', <GuideTodo key="pop">iedzīvotāju skaits un gads</GuideTodo>],
          ['Valodas', 'singāļu, tamilu; angļu tūrisma zonās saprot'],
          [
            'Valūta',
            <>
              Šrilankas rūpija (LKR), 1 EUR ≈ <GuideTodo>kurss septembrī</GuideTodo> LKR
            </>,
          ],
          ['Laika starpība', '+3,5 stundas Latvijas ziemā, +2,5 stundas vasarā'],
          ['Tālruņa kods', '+94'],
          ['Lidosta', 'Bandaranaike (CMB), ap 35 km no Kolombo'],
          ['Vīza', 'ETA jānoformē tiešsaistē pirms lidojuma'],
          ['Rozetes', 'D un G tips, 230 V'],
          ['Krāna ūdens', 'nedzer, tikai pudelēs vai filtrētu'],
        ]}
        caption="Īsie fakti par Šrilanku, 2026. gada septembris."
      />

      <GuideSection id={sections.where} title="Kur atrodas Šrilanka un kas tā ir">
        <p>
          Šrilanka ir sala Indijas okeānā, Indijas dienvidu galā, aptuveni 8 500 kilometru attālumā
          no Rīgas. Pēc platības tā ir gandrīz tikpat liela kā Latvija, bet ar desmit reizes vairāk
          iedzīvotāju un ar okeānu visapkārt.
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
          Oficiālā galvaspilsēta ir Šrī Džajavardenepura-Kote, bet dzīve, lidosta un vairums
          ceļotāju sākas Kolombo. Aptuveni 70 procenti iedzīvotāju ir budisti, un tas ir redzams
          visur: tempļos, svētku dienās un tajā, cik mierīgs ir dzīves ritms.
        </p>
        <p>
          Salai ir sešas UNESCO kultūras mantojuma vietas: Sigirija, Kandi, Anuradhapura,
          Polonnaruva, Dambullas alu tempļi un Galles forts. Trīs no tām ir manā ieteiktajā maršrutā
          zemāk.
        </p>

        <GuideCallout tone="personal">
          <p>
            Man vissvarīgākais fakts par Šrilanku ir šis: tā nav liela, bet tā ir lēna. Ceļš, kas
            kartē izskatās pēc divām stundām, bieži ir četras. To vērts zināt jau tagad, jo tas
            nosaka, cik daudz reāli iespējams redzēt.
          </p>
        </GuideCallout>
      </GuideSection>

      <GuideSection id={sections.when} title="Kad doties uz Šrilanku">
        <p>
          Labākais laiks ceļojumam uz Šrilankas dienvidiem ir no novembra līdz aprīlim. Tas sakrīt
          ar Latvijas ziemu, un tieši tāpēc lielākā daļa latviešu brauc šajā laikā.
        </p>
        <p>
          Šrilankā ir divas musonu sezonas, un tās skar dažādas salas puses dažādos laikos.
          Dienvidrietumu piekrastē, kur ir Mirisa, Madiha, Galle un Kolombo, lietus līst no maija
          līdz augustam, bet sausā sezona ilgst no novembra līdz aprīlim. Ziemeļos un austrumos, kur
          ir Arugam Bay un Trinkomalī, ir otrādi: sauss no maija līdz septembrim, lietus no oktobra
          līdz janvārim.
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
          caption="Kurā mēnesī kurp braukt. Grietas tabula no lapas par labāko ceļošanas laiku."
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
          Temperatūra dienvidos praktiski nemainās visu gadu. Mainās tikai lietus. Un pat lietus
          sezonā, no jūnija līdz augustam, dienvidos ir karsti un lietus līst īsi, parasti
          pēcpusdienā vai naktī. Es šeit dzīvoju visu gadu, un jūnijs pie okeāna joprojām ir labāks
          par jūniju Rīgā.
        </p>

        <GuideCallout tone="tip">
          <p>
            Ja gribi lētāk, plāno pa vidu: ne decembra beigās, kad cenas ir augstākās, un ne jūlija
            vidū. Novembra sākums un aprīlis ir mans ieteikums cenas un laika līdzsvaram.
          </p>
        </GuideCallout>

        <p>
          Vairāk par sezonām:{' '}
          <Link href={href.bestTime}>labākais laiks, lai ceļotu uz Šrilanku</Link>.
        </p>
      </GuideSection>

      <GuideSection id={sections.flights} title="Kā nokļūt no Rīgas uz Šrilanku">
        <p>
          Tiešā lidojuma no Rīgas uz Šrilanku nav. Ērtākais ceļš ir ar vienu pārsēšanos Stambulā,
          Abū Dabī, Dubaijā vai Dohā, un kopējais ceļā pavadītais laiks ir no 15 līdz 18 stundām.
        </p>
        <p>
          Pēc mūsu lidojumu cenu rīka datiem 2026. gada jūlijā un augustā lētākās biļetes vienā
          virzienā no Rīgas uz Kolombo bija:
        </p>
        <ul>
          <li>no 380 līdz 420 eiro oktobrī, novembrī un janvāra otrajā pusē,</li>
          <li>no 500 līdz 550 eiro janvāra beigās un februārī,</li>
          <li>no 650 līdz 740 eiro Ziemassvētku un Jaungada nedēļās.</li>
        </ul>
        <p>
          Turp un atpakaļ rēķinies ar 750 līdz 1 000 eiro ārpus svētkiem un ar 1 300 eiro vai
          vairāk, ja lido decembra beigās. Biļetes ir lielākais viena ceļojuma izdevums, tāpēc pērc
          tās vismaz divus līdz trīs mēnešus iepriekš.
        </p>
        <p>
          Turkish Airlines caur Stambulu ir ātrākais variants ar vienu pārsēšanos, aptuveni 14
          stundas 45 minūtes. Etihad caur Abū Dabī kopā ar airBaltic vai LOT parasti ir lētākais.
          Emirates caur Dubaiju un Qatar Airways caur Dohu ir starp tiem.
        </p>
        <p>
          Ielidosi Bandaranaike lidostā (CMB) pie Kolombo. Līdz dienvidu piekrastei no turienes ir
          2,5 līdz 3,5 stundas pa šoseju. Lētākais un ērtākais ir PickMe lietotne, Šrilankas Bolt,
          kas parāda cenu jau pirms brauciena. Brauciens no lidostas līdz Madihai maksā aptuveni{' '}
          <GuideTodo>PickMe cena no lidostas līdz Madihai</GuideTodo> eiro.
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
          vīzu izsniedz bez maksas, tāpēc mums tā ir jāapmaksā.
        </p>
        <ul>
          <li>
            ETA ir derīga 30 dienām, ar iespēju pagarināt līdz pat sešiem vai deviņiem mēnešiem.
          </li>
          <li>
            Maksa ir aptuveni <GuideTodo>precīzā ETA maksa</GuideTodo> USD par cilvēku, bērniem līdz
            12 gadiem parasti bez maksas.
          </li>
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
            ['Pietiekami līdzekļi', 'Reti, bet var pajautāt'],
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
          Ceļojums uz Šrilanku divām nedēļām, ja plāno pati, maksā no aptuveni 1 550 eiro budžeta
          variantā līdz 2 250 eiro ar komfortu, ieskaitot biļetes un vīzu. Aģentūru pakešu cenas
          Latvijā 2026. gada rudenī ir no 1 500 līdz 2 650 eiro par 10 līdz 13 naktīm, tātad par to
          pašu naudu pašai izplānots ceļojums dod divas nedēļas un pilnu brīvību.
        </p>

        <GuideTable
          head={['Stils', 'Diena', '14 dienas uz vietas', 'Kopā ar biļetēm un vīzu']}
          rows={[
            ['Budžeta ceļotāja', 'ap 50 EUR', 'ap 700 EUR', 'ap 1 550 EUR'],
            ['Komforta ceļotāja', 'ap 100 EUR', 'ap 1 400 EUR', 'ap 2 250 EUR'],
          ]}
          caption="Divu nedēļu ceļojuma kopsavilkums. Biļetes rēķinātas ap 800 eiro."
        />

        <GuideTable
          head={['Kas', 'Cena', 'Piezīme']}
          rows={[
            [
              'Rice and curry vietējā ēstuvē',
              <GuideTodo key="rc">cena</GuideTodo>,
              'Vietējā ēstuvē, ne tūristu kafejnīcā',
            ],
            ['Kafija tūristu kafejnīcā', '1,50 līdz 5 EUR', ''],
            ['Maltīte kafejnīcā', '3 līdz 15 EUR', 'Rietumu ēdiens 3 līdz 4 reizes dārgāks'],
            ['Alus Lion', <GuideTodo key="beer">cena</GuideTodo>, ''],
            ['Ūdens 1,5 l', <GuideTodo key="water">cena</GuideTodo>, ''],
            ['Kokosrieksts', <GuideTodo key="coco">cena</GuideTodo>, 'Prasi ar ledu'],
            ['Tuk-tuks īsam braucienam', '1 līdz 5 EUR', 'Vienojies par cenu pirms brauciena'],
            ['PickMe pilsētā', '3 līdz 15 EUR', ''],
            ['Autobuss', '0,50 līdz 2 EUR', ''],
            ['Vilciens', '1 līdz 10 EUR', '3. klase Ella–Nanu Oja ap 0,60 EUR'],
            ['Skūtera noma dienā', '3 līdz 7 EUR', 'Pilna bāka ap 3 EUR'],
            ['Auto ar šoferi dienā', '60 līdz 100 EUR', ''],
            ['Nakts viesu mājā', '20 līdz 60 EUR', 'Hosteļi un homestay 8 līdz 15 EUR'],
            ['Nakts villā ar baseinu', <GuideTodo key="villa">cena</GuideTodo>, ''],
            ['SIM karte ar 10 līdz 30 GB', '5 līdz 10 EUR', 'Lidostā'],
            ['Joga vai pilates nodarbība', 'ap 8 EUR', ''],
            ['Vaļu vērošana Mirisā', <GuideTodo key="whale">cena</GuideTodo>, ''],
            ['Safari Udavalavē', <GuideTodo key="safari">cena</GuideTodo>, ''],
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
          Skaidra nauda Šrilankā joprojām ir galvenais norēķinu veids. Kartes pieņem lielākās
          viesnīcas un restorāni, bet ārpus tūristu zonas gandrīz viss notiek skaidrā naudā.
          Bankomāti ir visur, bet ar komisiju, tāpēc izņem lielāku summu vienā reizē.
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

      <GuideSection id={sections.route} title="Ko redzēt: maršruts 10 līdz 14 dienām">
        <p>
          Šrilankā 14 dienās iespējams apvienot kultūras trīsstūri, kalnus, safari un dienvidu
          pludmales, ja nemaini vietu katru dienu. Šis ir maršruts, ko es ieteiktu draudzenei, kura
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
              'Sigirija un Dambulla',
              'Lauvas klints saullēktā, Dambullas alu tempļi, ziloņi Minnerijā.',
              '2',
            ],
            ['4', 'Kandi', 'Zoba relikvijas templis, ezers, vakara ceremonija.', '1'],
            [
              '5–7',
              'Ella',
              'Little Adam’s Peak, Deviņu arku tilts, tējas plantācijas, ūdenskritumi.',
              '2–3',
            ],
            ['8', 'Udavalave vai Jala', 'Safari no rīta. Udavalave: ziloņi, mazāk džipu.', '1'],
            [
              '9–10',
              'Hiriketija vai Tangalle',
              'Pirmās pludmales dienas, sērfošana iesācējām, joga.',
              '2',
            ],
            [
              '11–14',
              'Madiha, Mirisa vai Veligama',
              'Okeāns, snorkelēšana, vaļu vērošana sezonā, Galles forts.',
              '3–4',
            ],
          ]}
          caption="Maršruts 14 dienām. Pēdējā dienā 2,5 līdz 3,5 stundas līdz lidostai."
        />

        <p>
          Ja tev ir 10 dienas, izlaid Kolombo nakti un Kandi, brauc no lidostas uzreiz uz Sigiriju
          un no Ellas pa taisno uz dienvidiem. Ja tev ir viena nedēļa, paliec tikai dienvidos: tik
          tāls ceļš ir par garu, lai vienā nedēļā mestos pa visu salu.
        </p>

        <h3>Mani ieteikumi katrai vietai</h3>
        <ul>
          <li>
            <strong>Sigirija.</strong> Kāp saullēktā, pirms karstuma un pūļiem. Ieeja tūristiem ir
            dārga, bet to no maršruta neizmestu.
          </li>
          <li>
            <strong>Kandi.</strong> Vienai naktij pietiek. Kalnu miers sākas tikai aiz tās.
          </li>
          <li>
            <strong>Vilciens Kandi–Ella.</strong> Skaists, bet pārpildīts ar tūristiem. Mana
            alternatīva ir posms Ella–Nanu Oja ar 3. klases biļeti: tie paši skati, vietējie
            cilvēki, dažas desmit centu.
          </li>
          <li>
            <strong>Ella.</strong> Mana vismīļākā vieta Šrilankā. Vēsāks gaiss, pārgājieni,
            ūdenskritumi. Divas līdz trīs dienas.
          </li>
          <li>
            <strong>Safari.</strong> Udavalave ziloņiem, Jala leopardiem. Brauc agrā rītā.
          </li>
          <li>
            <strong>Mirisa.</strong> Ja jāiesaka viena pludmales vieta, tā ir Mirisa. Vaļu vērošana,
            Coconut Tree Hill saulrietā, Secret Beach mierīgākai peldei.
          </li>
          <li>
            <strong>Galle.</strong> Holandiešu forts un mazās ieliņas, viena pēcpusdiena no jebkuras
            dienvidu vietas.
          </li>
          <li>
            <strong>Ko es izlaistu.</strong>{' '}
            <GuideTodo>Grieta: viena vieta vai aktivitāte, ko tu izlaistu, un kāpēc</GuideTodo>
          </li>
        </ul>

        <p>
          Sīkāk par katru vietu:{' '}
          <Link href={href.post('ko-redzet-srilanka')}>ko redzēt Šrilankā</Link>,{' '}
          <Link href={href.post('ella-srilanka-ko-redzet-darit-un-vai-ir-verts-turp-doties')}>
            Ella
          </Link>
          ,{' '}
          <Link href={href.post('mirissa-srilanka-ko-redzet-darit-un-vai-ir-verts-turp-doties')}>
            Mirisa
          </Link>{' '}
          un <Link href={href.howLong}>cik ilgu laiku ieplānot</Link>. Ja brauc ar bērniem:{' '}
          <Link href={href.post('celojums-uz-srilanku-ar-berniem')}>ceļojums ar bērniem</Link>.
        </p>
      </GuideSection>

      <GuideSection id={sections.regions} title="Šrilankas reģioni vienā tabulā">
        <p>
          Šrilanka ir maza sala ar piecām pilnīgi atšķirīgām pusēm. Šī tabula ir īsākais veids, kā
          saprast, kur tev jābrauc.
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
              'Sigirija, Dambulla, Anuradhapura, Polonnaruva, tempļi',
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

      <GuideSection id={sections.stay} title="Dienvidu piekraste: kur palikt">
        <p>
          Šrilankas dienvidu piekraste no Galles līdz Tangallei ir tā vieta, kur latvietes pavada
          lielāko daļu sava ceļojuma, un katrs ciemats tur ir citāds. Es dzīvoju Madihā un esmu
          palikusi katrā no šīm vietām, tāpēc šis ir mans godīgais salīdzinājums.
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
              'Mirisa',
              'Pirmajam braucienam, draudzeņu kompānijai',
              'Skaistākā pludmale, vaļu vērošana, saulrieti',
              <GuideTodo key="mirissa">cena</GuideTodo>,
            ],
            [
              'Veligama',
              'Sērfošanas iesācējām un attālinātam darbam',
              'Sērfošanas skolas, coworking, lēti hosteļi',
              <GuideTodo key="weligama">cena</GuideTodo>,
            ],
            [
              'Ahangama',
              'Tām, kurām patīk stils un kafejnīcas',
              'Boutique viesnīcas, sērfošana pieredzējušām',
              <GuideTodo key="ahangama">cena</GuideTodo>,
            ],
            [
              'Unavatuna',
              'Dzīvībai un naktsdzīvei',
              'Viegli pieejama pludmale, restorāni, tuvu Gallei',
              <GuideTodo key="unawatuna">cena</GuideTodo>,
            ],
            [
              'Hiriketija',
              'Mazam līcim ar labu vibe',
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
          caption="Dienvidu pludmales salīdzinājumā, 2026. gada septembris."
        />

        <GuideFigure
          src="/images/guide/beach-madiha.svg"
          alt="Madihas pludmale ar palmām Šrilankas dienvidos"
          width={1920}
          height={1080}
          caption="Vietturis. Madihas pludmale."
        />

        <p>
          Sērfošana: Veligama ir labākā vieta, kur sākt, pat ja nekad neesi stāvējusi uz dēļa.
          Midigama un Ahangama ir tām, kuras jau prot. Sērfot dienvidos var visu sausās sezonas
          laiku, no novembra līdz aprīlim.
        </p>
        <p>
          Naktsmītnes vidēji maksā no 20 līdz 60 eiro naktī. Hosteļi un homestay ir 8 līdz 15 eiro,
          villa ar privātu baseinu var būt arī 400 eiro. Rezervē caur Booking vai Airbnb, bet, ja
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
          alt="Mirisas līcis un Coconut Tree Hill saulrietā"
          width={1920}
          height={1080}
          caption="Vietturis. Mirisa, Coconut Tree Hill."
        />

        <GuideFigure
          src="/images/guide/beach-weligama.svg"
          alt="Sērfotāji Veligamas līcī Šrilankā"
          width={1920}
          height={1080}
          caption="Vietturis. Veligama, sērfošana iesācējām."
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
            iekāpšanas. Ja nesarunā, 2 eiro galamērķī kļūst par 8.
          </li>
          <li>
            <strong>Skūteris.</strong> Vispopulārākais veids dienvidos, 3 līdz 7 eiro dienā. Legāli
            vajadzīgas starptautiskās tiesības ar motocikla kategoriju vai vietējā atļauja, ko tagad
            var noformēt turpat lidostā. Ķivere vienmēr.
          </li>
          <li>
            <strong>Vilciens.</strong> Lēns, pārpildīts un ļoti skaists. Kandi–Ella biļetes
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
            Vilciens regulāri brauc cauri tuneļiem. Katru gadu notiek nelaimes, kad cilvēki,
            karājoties durvīs pēc fotogrāfijas, nepaspēj atkāpties. Neviena bilde nav tā vērta.
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

      <GuideSection id={sections.safety} title="Drošība un ceļošana vienai">
        <p>
          Šrilanka ir droša valsts ceļotājai, arī tad, ja brauc viena. Es šeit dzīvoju kopš 2022.
          gada un nevienā brīdī neesmu jutusies nedroši. Galvenie riski nav noziedzība, bet
          satiksme, karstums un pārmaksāšana tūristu vietās.
        </p>

        <h3>Ko es ievēroju kā sieviete, kura šeit dzīvo</h3>
        <ul>
          <li>
            Lielajās pilsētās un ārpus pludmales ģērbjos pieticīgāk, pleci un ceļi nosegti. Nevis
            tāpēc, ka kāds skatītos dīvaini, bet tāpēc, ka tā šeit ir pieņemts.
          </li>
          <li>Naktī viena nestaigāju pa vientuļām vietām. Tas pats, ko darītu jebkur.</li>
          <li>
            Tuk-tuku šoferiem un gidiem māku pateikt nē, ar smaidu. Šrilankieši ne vienmēr saprot
            vārdu nē no pirmās reizes, un personīgā telpa šeit ir cita. Tas nav ļaunprātīgi.
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
          Vislielākā krāpniecība Šrilankā ir pārmaksāšana. Tūristēm cenas vienmēr būs mazliet
          augstākas, jo vietējie pelna mazāk. Strīdi te neko neatrisina. Ja smaidi un paliec
          mierīga, viss atrisinās daudz vieglāk.
        </p>
        <p>
          Bez ceļojuma apdrošināšanas uz Šrilanku nebrauc. Biežākās traumas ir satiksmes negadījumi,
          it sevišķi ar skūteri. Privātās klīnikas strādā ātri un labi, bet rēķins var būt simtos
          vai tūkstošos eiro.
        </p>
        <p>
          Obligātu vakcīnu nav. Ārsti mēdz ieteikt A un B hepatītu, vēdertīfu un stingumkrampjus.
          Malārija nav aktuāla, bet odi pārnēsā dengue, tāpēc pretodu līdzeklis ir obligāts un labāk
          to pirkt uz vietas. Krāna ūdeni nedzer. Sauleskrēms ik pēc 30 minūtēm.
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
            Dzirdēsi to gatavojam pirms ieraudzīsi.
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
          Vai var saindēties? Mana pieredze ir pozitīva: vairākos gados ne reizi neesmu saslimusi no
          vietējā ēdiena. Izvēlies vietas, kur cilvēki jau ēd un ēdiens tiek gatavots svaigs.
        </p>
        <p>
          Manas vietas vietējai virtuvei: Saras Kitchen, Malli’s Hoppers, Kalage, Papa Jeevz.
          Eiropas garšām: Surf Lodge, Atha, KIP, KOH Mirisā.
        </p>
        <p>
          Vairāk: <Link href={href.post('ediens-srilanka')}>ēdiens Šrilankā</Link>.
        </p>
      </GuideSection>

      <GuideSection id={sections.practical} title="Praktiskā informācija">
        <h3>Nauda un kartes</h3>
        <p>
          Valūta ir Šrilankas rūpija. Skaidra nauda ir galvenais, kartes pieņem lielākās vietās.
          Bankomāti ir visur, bet ar komisiju. Starptautiska karte strādā labāk nekā Latvijas banku
          kartes. Naudu var izņemt jau lidostā.
        </p>

        <h3>SIM karte un internets</h3>
        <p>
          Lidostā uzreiz nopērc vietējo SIM karti, Dialog, Mobitel vai SLT, par 5 līdz 10 eiro ar 10
          līdz 30 GB. Tas pietiek visam ceļojumam. Mobilais internets Šrilankā ir labāks par wifi
          viesnīcās, un elektrības pārrāvumu laikā tas ir vienīgais, kas strādā. Ņem līdzi power
          banku un izslēdz Latvijas SIM kartes mobilos datus.
        </p>

        <h3>Rozetes</h3>
        <p>D un G tips, 230 V. Universālais adapteris der.</p>

        <h3>Tempļu etiķete</h3>
        <p>
          Tempļos jānosedz pleci un ceļi, apavi jānoņem pie ieejas, un fotografējoties nekad nestāvi
          ar muguru pret Budas statuju. Pusdienlaikā akmens grīda ir tik karsta, ka pēdas apdeg:
          paņem līdzi zeķes. Ērts risinājums ir plāns sarongs somā.
        </p>

        <h3>Ko ņemt līdzi</h3>
        <p>
          Vieglas kokvilnas vai lina drēbes, garās bikses vai svārki tempļiem, plāns džemperis Ellai
          un vilcienam, lietus jaka ārpus sausās sezonas, sandales un slēgti apavi Sigirijai.
          Sauleskrēms ir dārgs uz vietas, ņem no Latvijas. Pretodu līdzekli pērc uz vietas. Neņem
          daudz drēbju, dārgas rotas un smagu čemodānu: vilcienā un tuk-tukā katrs kilograms
          skaitās.
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
          No Šrilankas visvairāk vērts vest tēju, garšvielas un ko no vietējiem amatniekiem.
          Ceilonas tēju pērc plantācijās vai specializētos veikalos, ne lidostā. Kanēlis no
          Šrilankas ir īstais Ceilonas kanēlis, un tirgū tas maksā centus. Kardamons, krustnagliņas,
          karija maisījumi, sarongs, batikas audumi un kokosriekstu eļļa.
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
          Neved koraļļus, gliemežvākus vai ko no savvaļas dzīvniekiem, par to ir sodi jau Šrilankas
          lidostā.
        </p>
      </GuideSection>

      <GuideSection id={sections.reviews} title="Ko saka citas latvietes">
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
          valoda, karstums un transports no lidostas. Bailes bija daudz lielākas nekā realitāte.
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

      <GuideSection id={sections.trip} title="Ceļo kopā ar mums">
        <p>
          Ja lasot tev radās sajūta, ka gribi to visu piedzīvot, bet ne viena, mums ir meiteņu
          ceļojums uz Šrilanku 2027. gada janvārī. Maza grupa, dienvidu piekraste, kalni un safari,
          un mēs uz vietas visu laiku. Sīkāk:{' '}
          <Link href={href.girlsTrip}>meiteņu ceļojums uz Šrilanku</Link>.
        </p>
        <p>
          Ikdienu no Madihas rādām Instagram. Jautājumi par ceļojuma plānošanu vienmēr ir laipni
          gaidīti, atbildam visām.
        </p>
      </GuideSection>

      <GuideAuthor
        name="Laura Grieta Grinberga"
        portraitSrc="/images/guide/author.svg"
        portraitAlt="Grieta Šrilankas dienvidos, Madihā"
      >
        <p>
          Dzīvo Šrilankas dienvidos, Madihā, kopš 2022. gada, pirms tam vairākas sezonas Šrilankā un
          Bali. Raksta srilanka.lv un vada meiteņu ceļojumus.{' '}
          <GuideTodo>Deiva teikums un Instagram saite</GuideTodo>
        </p>
      </GuideAuthor>
    </GuidePageLayout>
  </>
);

export default NextSriLankaTravelGuidePage;
