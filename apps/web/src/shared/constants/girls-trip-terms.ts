import {
  GIRLS_TRIP_BOOKING_LAST_DAY_DISPLAY,
  GIRLS_TRIP_CANCELLATION_FEE_EUR,
  GIRLS_TRIP_GUESTS,
  GIRLS_TRIP_NO_REFUND_DAYS_BEFORE_DEPARTURE,
  GIRLS_TRIP_NO_REFUND_FROM_DISPLAY,
  GIRLS_TRIP_RESERVATION_EUR,
  formatEur,
} from './girls-trip-booking';

/**
 * Cancellation and refund copy for the girls trip, shared by the FAQ (and its
 * FAQPage schema) and the payment section so both always say the same thing.
 * The rules are Ceļo ar Mariku's; the amounts and dates come from the booking
 * config.
 */

/** What happens when a guest cancels, including late bookings that start inside the no-refund window. */
export const GIRLS_TRIP_GUEST_CANCELS_TEXT = `Ja Tev jāatceļ brauciens, no ${formatEur(GIRLS_TRIP_RESERVATION_EUR)} rezervācijas maksas tiek paturēta ${formatEur(GIRLS_TRIP_CANCELLATION_FEE_EUR)} administratīvā maksa, un pārējos ${formatEur(GIRLS_TRIP_RESERVATION_EUR - GIRLS_TRIP_CANCELLATION_FEE_EUR)} Tu saņemsi atpakaļ. Sākot no ${GIRLS_TRIP_NO_REFUND_FROM_DISPLAY} (${GIRLS_TRIP_NO_REFUND_DAYS_BEFORE_DEPARTURE} dienas pirms izbraukšanas), rezervācijas maksa vairs netiek atmaksāta. Tas nozīmē, ka, piesakoties laikā no ${GIRLS_TRIP_NO_REFUND_FROM_DISPLAY} līdz ${GIRLS_TRIP_BOOKING_LAST_DAY_DISPLAY}, rezervācijas maksa netiek atmaksāta jau no paša sākuma.`;

/**
 * Go/no-go: the trip runs only with a full group. If it is not full by the
 * booking deadline, every reservation is refunded in full, as soon as the trip
 * is cancelled; the same applies if the organisers cancel for any other
 * reason. Flights are the guest's own and not part of the refund.
 */
export const GIRLS_TRIP_GO_NO_GO_TEXT = `Ceļojums notiek tikai tad, kad grupa ir pilna, tas ir, kad visas ${GIRLS_TRIP_GUESTS} vietas ir rezervētas. Ja līdz ${GIRLS_TRIP_BOOKING_LAST_DAY_DISPLAY} grupa nebūs pilna, ceļojums tiek atcelts, un Tu uzreiz saņemsi atpakaļ visu rezervācijas maksu, 100\u00a0% jeb ${formatEur(GIRLS_TRIP_RESERVATION_EUR)}. Tāpat visus ${formatEur(GIRLS_TRIP_RESERVATION_EUR)} Tu saņemsi atpakaļ, ja ceļojums kāda cita iemesla dēļ tiek atcelts no mūsu puses. Lidojuma biļetes Tu rezervē pati, un uz tām šī atmaksa neattiecas, tāpēc iesaku biļetes pirkt, kad grupa ir pilna un ceļojums apstiprināts, vai izvēlēties biļetes, kuras var mainīt.`;

/** The go/no-go promise in one line, for next to the booking buttons. */
export const GIRLS_TRIP_FULL_REFUND_PROMISE = `Ceļojums notiek tikai ar pilnu grupu. Ja līdz ${GIRLS_TRIP_BOOKING_LAST_DAY_DISPLAY} visas ${GIRLS_TRIP_GUESTS} vietas nebūs rezervētas, saņemsi atpakaļ visus ${formatEur(GIRLS_TRIP_RESERVATION_EUR)}.`;
