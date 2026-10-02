import type { GuideFaqItem } from '@/shared/components/guide-faq';
import {
  GIRLS_TRIP_EARLY_BIRD_LAST_DAY_DISPLAY,
  GIRLS_TRIP_EARLY_BIRD_PRICE_EUR,
  GIRLS_TRIP_FLIGHTS_FROM_EUR,
  GIRLS_TRIP_GUESTS,
  GIRLS_TRIP_PRICE_EUR,
  GIRLS_TRIP_RESERVATION_EUR,
  formatEur,
} from '@/shared/constants/girls-trip-booking';
import { todoGrieta } from '@/shared/constants/todo-grieta';

/**
 * The trip page FAQ. Every answer must stand alone when lifted out of the
 * page (it is also emitted as FAQPage schema), and none depends on the date:
 * both prices are named, so the text is right before and after the
 * early-bird cut-off.
 */
export const tripPageFaqs: GuideFaqItem[] = [
  {
    question: 'Vai varu braukt viena?',
    answer: `Jā, droši. Ceļojums ir veidots tā, lai Tu vari pieteikties viena. Grupā būs ${GIRLS_TRIP_GUESTS} meitenes un es kā Tava latviešu gide. Pirms ceļojuma pievienošu Tevi mūsu WhatsApp grupiņai, kur varēsi iepazīties ar pārējām meitenēm, un lidostā Tevi sagaidīšu es.`,
  },
  {
    question: 'Ar ko dzīvošu istabā? Vai var dzīvot vienai?',
    answer: `Naktsmājās dzīvosim pa divām vienā istabā. ${todoGrieta('Vai var vienvietīgu istabu, un par kādu piemaksu?')}`,
  },
  {
    question: 'Kāds ir dalībnieču vecums?',
    answer: todoGrieta('Kādam vecumam ceļojums ir domāts (vecuma robežas vai aptuvenais vecums)?'),
  },
  {
    question: 'Cik aktīvs ir ceļojums?',
    answer:
      'Ceļojums ir aktīvs, bet tam nav vajadzīga īpaša sagatavotība. Garākais pārgājiens ir uz Little Adam’s Peak: taka ir skaidra, ar pakāpieniem, un kāpums aizņem aptuveni 30–45 minūtes vienā virzienā. Starp aktīvajām dienām ir arī mierīgas dienas pludmalē, piemēram, Mirisā.',
  },
  {
    question: 'Vai Šrilanka ir droša sievietei?',
    answer:
      'Jā, Šrilanka kopumā ir droša valsts arī sievietēm un tām, kas ceļo vienatnē. Bažas parasti izrādās lielākas nekā pati realitāte, jo vietējie lielākoties ir draudzīgi un izpalīdzīgi. Šajā ceļojumā Tu nebūsi viena: pa Šrilanku pārvietosimies kopā ar cenā iekļauto transportu, es būšu kopā ar grupu visas 10 dienas, un atbalsts ir pieejams 24/7.',
  },
  {
    question: 'Kas ar ēšanu?',
    answer:
      'Brokastis ir iekļautas ceļojuma cenā. Pusdienas un vakariņas cenā nav iekļautas, tās katra apmaksā pati.',
  },
  {
    question: 'Kas jāsakārto pašai: lidojumi, vīza, apdrošināšana?',
    answer: `Vīza ir iekļauta cenā, un to neilgi pirms ceļojuma pilnībā sakārtošu es. Lidojuma biļetes nav iekļautas: janvārī lētākās biļetes no Rīgas uz Kolombo un atpakaļ maksā no aptuveni ${formatEur(GIRLS_TRIP_FLIGHTS_FROM_EUR)}, un es palīdzēšu atrast izdevīgākos un labākos lidojuma variantus. Ceļojuma apdrošināšana nav iekļauta, to noformē pati.`,
  },
  {
    question: 'Kā un kad jāmaksā?',
    answer: `Lai rezervētu vietu, ${formatEur(GIRLS_TRIP_RESERVATION_EUR)} samaksā tiešsaistē, caur Ceļo ar Mariku. Atlikušo summu samaksā man uz vietas Šrilankā, skaidrā naudā. Piesakoties līdz ${GIRLS_TRIP_EARLY_BIRD_LAST_DAY_DISPLAY}, ceļojums maksā ${formatEur(GIRLS_TRIP_EARLY_BIRD_PRICE_EUR)} un atlikums ir ${formatEur(GIRLS_TRIP_EARLY_BIRD_PRICE_EUR - GIRLS_TRIP_RESERVATION_EUR)}. Vēlāk ceļojums maksā ${formatEur(GIRLS_TRIP_PRICE_EUR)} un atlikums ir ${formatEur(GIRLS_TRIP_PRICE_EUR - GIRLS_TRIP_RESERVATION_EUR)}.`,
  },
  {
    question: 'Kas notiek, ja man jāatceļ brauciens?',
    answer: todoGrieta(
      'Atteikšanās noteikumi (jāsaskaņo ar Mariku): kas notiek ar rezervācijas maksu un atlikumu, ja dalībniece atceļ braucienu?',
    ),
  },
  {
    question: 'Kas notiek, ja grupa nenokomplektējas?',
    answer: todoGrieta(
      'Minimālais dalībnieču skaits, līdz kuram datumam apstiprina, ka ceļojums notiek, un vai rezervācijas maksu tad atmaksā vai pārceļ (jāsaskaņo ar Mariku)?',
    ),
  },
];
