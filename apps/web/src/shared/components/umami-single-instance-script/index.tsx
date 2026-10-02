import {
  UMAMI_SCRIPT_URL,
  type UmamiSingleInstanceConfig,
  umamiSingleInstance,
} from '@/shared/utils/umami-single-instance';

const config: UmamiSingleInstanceConfig = { scriptUrl: UMAMI_SCRIPT_URL };

const script = `(${umamiSingleInstance.toString()})(${JSON.stringify(config)});`;

// First in <head>, so it is in place before Zaraz injects the Umami tracker.
export function UmamiSingleInstanceScript() {
  // biome-ignore lint/security/noDangerouslySetInnerHtml: Inline so the guard runs before any Umami tracker; the content is our own code and constants.
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
