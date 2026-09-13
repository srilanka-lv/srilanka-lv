import type { GuideFaqItem } from '@/shared/components/guide-faq';
import type { GuideTocItem } from '@/shared/components/guide-toc';
import type { GuideVideoData } from '@/shared/components/guide-video';

/*
 * Content data for the pillar guide. Text lives in the page component; this
 * file holds the arrays that are rendered AND fed to the structured data, so
 * the two can never drift: the table of contents, the FAQ and the videos.
 *
 * Placeholder rules while the page is being built:
 * - Every video below points at the same placeholder clip. Swap `url` and
 *   `uploadDate` per clip once Grieta and Dave have published the real ones.
 * - Every image lives in `public/images/guide/` as a labelled SVG at the exact
 *   target size. Replace the file, keep the name, width and height.
 */

/** Bump on every content change: it drives the visible "Atjaunots" date and `dateModified`. */
export const UPDATED_AT = '2026-09-13';
export const PUBLISHED_AT = '2026-09-13';

export const TITLE = 'Ceļojums uz Šrilanku: pilns ceļvedis no Madihas';
export const DESCRIPTION =
  'Ceļojums uz Šrilanku bez aģentūras. Vīza, lidojumi no Rīgas, cenas eiro, maršruts un pludmales. Rakstām no Madihas, kur dzīvojam kopš 2022. gada.';
export const LEDE =
  'Pilns ceļvedis no diviem cilvēkiem, kuri šeit dzīvo. Vīza, lidojumi, cenas, maršruts, pludmales un viss, ko gribēsi zināt pirms pirmā brauciena.';

/** TODO(pillar): replace with the real clips before release. */
const PLACEHOLDER_VIDEO_URL = 'https://www.youtube.com/watch?v=DgF8qcLSCb4';
const PLACEHOLDER_UPLOAD_DATE = '2026-09-13';

export const videos = {
  intro: {
    url: PLACEHOLDER_VIDEO_URL,
    title: 'Kas mēs esam un kas ir šajā ceļvedī',
    description:
      'Vietturis. Grieta un Deivs Madihas pludmalē pastāsta, cik ilgi šeit dzīvo un ko šajā ceļvedī atradīsi.',
    uploadDate: PLACEHOLDER_UPLOAD_DATE,
  },
  southCoast: {
    url: PLACEHOLDER_VIDEO_URL,
    title: 'Šrilankas dienvidu piekraste',
    description:
      'Vietturis. Madiha, Mirisa, Veligama un Unavatuna vienā minūtē: kā katra pludmale izskatās no zemes, nevis no droņa.',
    uploadDate: PLACEHOLDER_UPLOAD_DATE,
  },
  transport: {
    url: PLACEHOLDER_VIDEO_URL,
    title: 'Ar tuk-tuku un vilcienu pa Šrilanku',
    description:
      'Vietturis. Kā izskatās brauciens ar tuk-tuku pa dienvidu piekrasti un vilciena brauciens kalnos.',
    uploadDate: PLACEHOLDER_UPLOAD_DATE,
  },
} satisfies Record<string, GuideVideoData>;

export const videoList: GuideVideoData[] = [videos.intro, videos.southCoast, videos.transport];

/** Section anchors. The ids are also the H2 ids, so the table of contents links resolve. */
export const sections = {
  where: 'kur-atrodas-srilanka',
  when: 'kad-doties',
  flights: 'ka-noklut-no-rigas',
  visa: 'viza',
  cost: 'cik-maksa',
  regions: 'regioni',
  highlights: 'ko-redzet',
  activities: 'ko-darit',
  route: 'marsruts',
  stay: 'kur-palikt',
  transport: 'transports',
  safety: 'drosiba',
  food: 'ediens',
  practical: 'praktiska-informacija',
  souvenirs: 'ko-atvest',
  reviews: 'atsauksmes',
  faq: 'biezak-uzdotie-jautajumi',
  trip: 'celo-kopa-ar-mums',
} as const;

export const tocItems: GuideTocItem[] = [
  { id: sections.where, title: 'Kur atrodas Šrilanka un kas tā ir' },
  { id: sections.when, title: 'Kad doties uz Šrilanku' },
  { id: sections.flights, title: 'Kā nokļūt no Rīgas uz Šrilanku' },
  { id: sections.visa, title: 'Šrilankas vīza Latvijas pilsoņiem' },
  { id: sections.cost, title: 'Cik maksā ceļojums uz Šrilanku' },
  { id: sections.regions, title: 'Šrilankas reģioni vienā tabulā' },
  { id: sections.highlights, title: 'Ko redzēt Šrilankā: galvenās vietas' },
  { id: sections.activities, title: 'Ko darīt Šrilankā: aktivitātes' },
  { id: sections.route, title: 'Maršruts 10 līdz 14 dienām' },
  { id: sections.stay, title: 'Dienvidu piekraste: kur palikt' },
  { id: sections.transport, title: 'Transports Šrilankā' },
  { id: sections.safety, title: 'Drošība un ceļošana vienatnē' },
  { id: sections.food, title: 'Ēdiens Šrilankā' },
  { id: sections.practical, title: 'Praktiskā informācija' },
  { id: sections.souvenirs, title: 'Ko atvest no Šrilankas' },
  { id: sections.reviews, title: 'Ko saka citi ceļotāji' },
  { id: sections.faq, title: 'Biežāk uzdotie jautājumi' },
  { id: sections.trip, title: 'Ceļo kopā ar mums' },
];

/**
 * Every answer must stand alone when lifted out of the page: full sentences,
 * no "see above", no pronouns pointing elsewhere. They are emitted verbatim as
 * FAQPage schema.
 */
export const faqs: GuideFaqItem[] = [
  {
    question: 'Cik ilgs ir lidojums no Rīgas uz Šrilanku?',
    answer:
      'Lidojums no Rīgas uz Kolombo ar vienu pārsēšanos aizņem no 15 līdz 18 stundām. Ātrākais variants ir Turkish Airlines caur Stambulu, aptuveni 14 stundas 45 minūtes. Tieša reisa no Rīgas uz Šrilanku nav.',
  },
  {
    question: 'Kāda ir laika starpība starp Latviju un Šrilanku?',
    answer:
      'Šrilanka ir 3,5 stundas priekšā Latvijai ziemas laikā un 2,5 stundas vasaras laikā. Šrilankā pulksteņus nepārceļ.',
  },
  {
    question: 'Vai Latvijas pilsoņiem uz Šrilanku vajag vīzu?',
    answer:
      'Jā, Latvijas pilsoņiem ceļojumam uz Šrilanku ir nepieciešama tūristu vīza ETA, ko noformē tiešsaistē oficiālajā lapā eta.gov.lk pirms lidojuma. Latvija nav to valstu sarakstā, kurām Šrilanka 2026. gadā vīzu izsniedz bez maksas.',
  },
  {
    question: 'Cik ilgi ar tūristu vīzu drīkst palikt Šrilankā un vai to var pagarināt?',
    answer:
      'Tūristu ETA ļauj palikt Šrilankā 30 dienas. To var pagarināt uz vietas Kolombo imigrācijas birojā vai tiešsaistē, kopumā līdz sešiem vai deviņiem mēnešiem, par papildu maksu.',
  },
  {
    question: 'Kādi dokumenti vajadzīgi ieceļošanai Šrilankā?',
    answer:
      'Ieceļošanai Šrilankā vajadzīga pase, kas derīga vismaz sešus mēnešus pēc ielidošanas, apstiprināta ETA vīza, atpakaļceļa vai tālākā lidojuma biļete un pirmās naktsmītnes rezervācija. Retos gadījumos imigrācijā var pajautāt par līdzekļiem ceļojuma izmaksu segšanai.',
  },
  {
    question: 'Kad ir labākais laiks ceļot uz Šrilanku?',
    answer:
      'Labākais laiks ceļojumam uz Šrilanku ir atkarīgs no reģiona, jo salā ir divi musonu periodi. Dienvidrietumu piekrastei, kur ir Mirisa, Galle un Kolombo, vislabākais laiks ir no novembra līdz aprīlim. Austrumu piekrastei, piemēram, Arugam Bay, no maija līdz septembrim.',
  },
  {
    question: 'Vai ir vērts braukt uz Šrilanku musonu sezonā?',
    answer:
      'Jā, braukt uz Šrilanku musonu sezonā ir vērts, ja izvēlas pareizo krastu. Kad Šrilankas dienvidos līst, austrumos ir sauss, un otrādi. Arī dienvidos lietus sezonā no jūnija līdz augustam ir karsti, lietus līst īsu brīdi, un naktsmītnes ir lētākas. Ekskursijas un safari notiek visu gadu.',
  },
  {
    question: 'Cik maksā ceļojums uz Šrilanku no Latvijas?',
    answer:
      'Divu nedēļu ceļojums uz Šrilanku, ko plāno patstāvīgi, maksā no aptuveni 1 550 eiro budžeta variantā līdz 2 250 eiro ar komfortu, ieskaitot lidojumu un vīzu. Aģentūru pakešu cenas Latvijā 2026. gada rudenī ir no 1 500 līdz 2 650 eiro par 10 līdz 13 naktīm.',
  },
  {
    question: 'Cik maksā naktsmājas Šrilankā?',
    answer:
      'Naktsmājas Šrilankā vidēji maksā no 20 līdz 60 eiro naktī. Budžeta hosteļi un homestay maksā 8 līdz 15 eiro. Villa ar privātu baseinu var maksāt līdz 400 eiro naktī.',
  },
  {
    question: 'Kāda valūta ir Šrilankā un vai var maksāt ar karti?',
    answer:
      'Valūta Šrilankā ir Šrilankas rūpija (LKR). Ar karti var maksāt lielākajās viesnīcās, restorānos un veikalos, bet mazākās vietās, tirgos un tuk-tukos vajag skaidru naudu. Bankomāti ir droši, un tos ieteicams izmantot pie bankām.',
  },
  {
    question: 'Kādā valodā runā Šrilankā?',
    answer:
      'Oficiālās valodas Šrilankā ir singāļu un tamilu. Angļu valodu tūrisma zonās saprot, un saziņai bieži pietiek ar vienkāršu angļu valodu, žestiem un Google Translate.',
  },
  {
    question: 'Vai uz Šrilanku vajag vakcīnas?',
    answer:
      'Obligātu vakcīnu ceļojumam uz Šrilanku nav. Ārsti mēdz ieteikt A un B hepatīta, vēdertīfa un stingumkrampju vakcīnas. Malārija Šrilankā nav aktuāla problēma, bet odi var pārnēsāt dengue drudzi, tāpēc pretodu līdzeklis ir jāņem līdzi.',
  },
  {
    question: 'Vai Šrilanka ir droša, ceļojot vienatnē?',
    answer:
      'Jā, Šrilanka kopumā ir droša valsts arī tiem, kas ceļo vienatnē. Bailes par krāpšanu vai bīstamību parasti izrādās pārspīlētas, jo vietējie lielākoties ir draudzīgi un izpalīdzīgi. Galvenie riski ir satiksme, karstums un pārmaksāšana tūristu vietās.',
  },
  {
    question: 'Vai visu Šrilanku var apceļot vienā ceļojumā?',
    answer:
      'Visu Šrilanku vienā ceļojumā apceļot var, bet praksē tas ir intensīvi. Attālumi Šrilankā nav lieli, bet pārvietošanās ir lēnāka, nekā šķiet kartē. Divās nedēļās var apvienot kultūras trīsstūri, kalnus, safari un dienvidu pludmales. Vienā nedēļā labāk palikt tikai dienvidos.',
  },
  {
    question: 'Kāds ir klimats Šrilankā?',
    answer:
      'Klimats Šrilankā ir tropisks: silts visu gadu, ap 29 līdz 30 grādiem dienā, ar lielu mitrumu. Dienvidu piekrastē sausā sezona ir no novembra līdz aprīlim, bet lietus sezona no maija līdz augustam. Pirmajās dienās ķermenim jāpierod pie mitruma.',
  },
  {
    question: 'Vai ir vērts ceļot uz Šrilanku?',
    answer:
      'Jā, ceļojums uz Šrilanku ir tā vērts. Šrilanka apvieno tropu dabu, draudzīgus cilvēkus, kultūru un piedzīvojuma sajūtu vienā salā, kas ir Latvijas izmērā. Tā nav perfekta valsts pēc Eiropas standartiem, un tieši tas to padara īpašu. Daudzi pēc pirmā brauciena atgriežas.',
  },
];

/** Images referenced on the page, for the ImageObject nodes in the structured data. */
export const images = [
  { src: '/images/guide/hero.svg', width: 3456, height: 2234 },
  { src: '/images/guide/map.svg', width: 1920, height: 1080 },
  { src: '/images/guide/route.svg', width: 1920, height: 1080 },
  { src: '/images/guide/beach-madiha.svg', width: 1920, height: 1080 },
  { src: '/images/guide/beach-mirissa.svg', width: 1920, height: 1080 },
  { src: '/images/guide/beach-weligama.svg', width: 1920, height: 1080 },
  { src: '/images/guide/food.svg', width: 1920, height: 1080 },
  { src: '/images/guide/spices.svg', width: 1920, height: 1080 },
  { src: '/images/guide/group.svg', width: 1920, height: 1080 },
  { src: '/images/guide/infographic-season.svg', width: 1920, height: 1080 },
  { src: '/images/guide/infographic-cost.svg', width: 1920, height: 1080 },
];
