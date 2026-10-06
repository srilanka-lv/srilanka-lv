import { type AnalyticsEventName, type UmamiEventData, trackEvent } from '@/shared/utils/analytics';

export type AskGrietaEventName = Extract<AnalyticsEventName, `ask-${string}`>;

export type AskGrietaEventData = UmamiEventData;

/**
 * One call per user action, one event per call, and never anything the visitor
 * typed (no names, numbers, emails or message text): only codes, yes/no flags
 * and counts. Every event also carries the page it happened on.
 *
 * Umami only: no Zaraz tool needs these events, and each zaraz.track call
 * would re-run the trigger that injects Umami. The lead itself is counted by
 * `ask-submit result=sent`, which fires only after the server accepted the
 * lead email.
 */
export const trackAskGrieta = (event: AskGrietaEventName, data: AskGrietaEventData): void => {
  if (typeof window === 'undefined') {
    return;
  }

  // Tracking must never break the interaction that triggered it.
  trackEvent(event, { page: window.location.pathname, ...data }, { zaraz: false }).catch(
    () => undefined,
  );
};

/**
 * A lead the server accepted: `ask-submit result=sent` as before, plus
 * `ask-lead`, which only real leads get, so Umami Goals and Attribution
 * (which match an event name, not a property) count leads, not attempts.
 * One call per accepted lead, one of each event.
 */
export const trackLeadSent = (
  lead: AskGrietaEventData,
  campaign: string | undefined,
  track: typeof trackAskGrieta = trackAskGrieta,
): void => {
  track('ask-submit', { result: 'sent', ...lead });
  track('ask-lead', { ...lead, ...(campaign ? { campaign } : {}) });
};

export const productProp = (product: string | null | undefined): string => product ?? 'none';

/**
 * `ask-field-start` bookkeeping for one form: reports the first input into
 * each field once, with the order in which fields were started.
 */
export const createFieldStartTracker = (
  report: (field: string, order: number) => void,
): ((field: string) => void) => {
  const started = new Set<string>();

  return (field) => {
    if (started.has(field)) {
      return;
    }

    started.add(field);
    report(field, started.size);
  };
};
