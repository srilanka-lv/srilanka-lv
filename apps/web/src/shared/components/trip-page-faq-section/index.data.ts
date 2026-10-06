import type { GuideFaqItem } from '@/shared/components/guide-faq';
import {
  GIRLS_TRIP_EARLY_BIRD_LAST_DAY_DISPLAY,
  GIRLS_TRIP_EARLY_BIRD_PRICE_EUR,
  GIRLS_TRIP_FLIGHTS_FROM_EUR,
  GIRLS_TRIP_GUESTS,
  GIRLS_TRIP_MEALS_PER_DAY_EUR,
  GIRLS_TRIP_PRICE_EUR,
  GIRLS_TRIP_RESERVATION_EUR,
  formatEur,
} from '@/shared/constants/girls-trip-booking';
import {
  GIRLS_TRIP_GO_NO_GO_TEXT,
  GIRLS_TRIP_GUEST_CANCELS_TEXT,
} from '@/shared/constants/girls-trip-terms';

export type TripPageFaqItem = GuideFaqItem & {
  /** Stable slug reported when the question is opened; never the question text. */
  id: string;
};

/**
 * The trip page FAQ. Every answer must stand alone when lifted out of the
 * page (it is also emitted as FAQPage schema), and none depends on the date:
 * both prices are named, so the text is right before and after the
 * early-bird cut-off.
 */
export const tripPageFaqs: TripPageFaqItem[] = [
  {
    id: 'come-alone',
    question: 'Vai varu braukt viena?',
    answer: `Jā, droši. Ceļojums ir veidots tā, lai Tu vari pieteikties viena. Grupā būs ${GIRLS_TRIP_GUESTS} meitenes un es kā Tava latviešu gide. Pirms ceļojuma pievienošu Tevi mūsu WhatsApp grupiņai, kur varēsi iepazīties ar pārējām meitenēm, un lidostā Tevi sagaidīšu es.`,
  },
  {
    id: 'room-sharing',
    question: 'Ar ko dzīvošu istabā? Vai var dzīvot vienai?',
    answer:
      'Naktsmājās dzīvosim pa divām vienā istabā, vienvietīgu istabu šajā ceļojumā nav. Viesnīcas ir vidējas līdz augstākas klases.',
  },
  {
    id: 'age-range',
    question: 'Kāds ir dalībnieču vecums?',
    answer: 'Vecuma ierobežojumu nav. Ceļojums ir domāts jebkurai latvietei.',
  },
  {
    id: 'how-active',
    question: 'Cik aktīvs ir ceļojums?',
    answer:
      'Ceļojums ir aktīvs, bet tam nav vajadzīga īpaša sagatavotība. Garākais pārgājiens ir uz Little Adam’s Peak: taka ir skaidra, ar pakāpieniem, un kāpums aizņem aptuveni 30–45 minūtes vienā virzienā. Starp aktīvajām dienām ir arī mierīgas dienas pludmalē, piemēram, Mirisā.',
  },
  {
    id: 'safety',
    question: 'Vai Šrilanka ir droša sievietei?',
    answer:
      'Jā, Šrilanka kopumā ir droša valsts arī sievietēm un tām, kas ceļo vienatnē. Bažas parasti izrādās lielākas nekā pati realitāte, jo vietējie lielākoties ir draudzīgi un izpalīdzīgi. Šajā ceļojumā Tu nebūsi viena: pa Šrilanku pārvietosimies kopā ar cenā iekļauto transportu, es būšu kopā ar grupu visas 10 dienas, un atbalsts ir pieejams 24/7.',
  },
  {
    id: 'food',
    question: 'Kas ar ēšanu?',
    answer: `Brokastis ir iekļautas ceļojuma cenā. Pusdienas un vakariņas cenā nav iekļautas, tās katra apmaksā pati: rēķinies ar aptuveni ${formatEur(GIRLS_TRIP_MEALS_PER_DAY_EUR)} dienā.`,
  },
  {
    id: 'flights-visa-insurance',
    question: 'Kas jāsakārto pašai: lidojumi, vīza, apdrošināšana?',
    answer: `Vīza ir iekļauta cenā, un to neilgi pirms ceļojuma pilnībā sakārtošu es. Lidojuma biļetes nav iekļautas: janvārī lētākās biļetes no Rīgas uz Kolombo un atpakaļ maksā no aptuveni ${formatEur(GIRLS_TRIP_FLIGHTS_FROM_EUR)}, un es palīdzēšu atrast izdevīgākos un labākos lidojuma variantus. Ceļojuma apdrošināšana nav iekļauta, to noformē pati.`,
  },
  {
    id: 'how-to-pay',
    question: 'Kā un kad jāmaksā?',
    answer: `Lai rezervētu vietu, ${formatEur(GIRLS_TRIP_RESERVATION_EUR)} samaksā tiešsaistē, caur Ceļo ar Mariku. Atlikušo summu samaksā man skaidrā naudā uz vietas Šrilankā, eiro vai Šrilankas rūpijās. Piesakoties līdz ${GIRLS_TRIP_EARLY_BIRD_LAST_DAY_DISPLAY}, ceļojums maksā ${formatEur(GIRLS_TRIP_EARLY_BIRD_PRICE_EUR)} un atlikums ir ${formatEur(GIRLS_TRIP_EARLY_BIRD_PRICE_EUR - GIRLS_TRIP_RESERVATION_EUR)}. Vēlāk ceļojums maksā ${formatEur(GIRLS_TRIP_PRICE_EUR)} un atlikums ir ${formatEur(GIRLS_TRIP_PRICE_EUR - GIRLS_TRIP_RESERVATION_EUR)}.`,
  },
  {
    id: 'cancelling',
    question: 'Kas notiek, ja man jāatceļ brauciens?',
    answer: GIRLS_TRIP_GUEST_CANCELS_TEXT,
  },
  {
    id: 'group-not-full',
    question: 'Kas notiek, ja grupa nenokomplektējas?',
    answer: GIRLS_TRIP_GO_NO_GO_TEXT,
  },
];
