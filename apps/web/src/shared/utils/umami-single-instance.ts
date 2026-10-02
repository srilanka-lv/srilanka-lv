export const UMAMI_SCRIPT_URL = 'https://cloud.umami.is/script.js';

export type UmamiSingleInstanceConfig = {
  scriptUrl: string;
};

/**
 * Lets only the first Umami tracker on a page start. Zaraz re-runs the
 * `Umami Analytics` Custom HTML tool whenever its trigger matches, and a
 * hostname-only trigger matches every zaraz.track call too, so each tracked
 * event injected another copy of the tracker. Every copy sent its own
 * pageview, wrapped history.pushState again and added its own click listener,
 * so later pageviews and data-umami-event clicks were counted once per copy.
 *
 * The tracker bails out when `document.currentScript` is null, so the guard
 * hides every later tracker script from it. A tracker that started before the
 * guard (window.umami already set) keeps its claim the same way.
 *
 * Runs as an inline <head> script via `.toString()`, so it must stay
 * self-contained: no imports and nothing from module scope.
 */
export function umamiSingleInstance(config: UmamiSingleInstanceConfig): void {
  let prototype: object | null = Object.getPrototypeOf(document);
  let nativeCurrentScript: (() => unknown) | undefined;

  while (prototype && !nativeCurrentScript) {
    nativeCurrentScript = Object.getOwnPropertyDescriptor(prototype, 'currentScript')?.get;
    prototype = Object.getPrototypeOf(prototype);
  }

  if (!nativeCurrentScript) {
    return;
  }

  const getCurrentScript = nativeCurrentScript;
  let tracker: unknown = null;

  Object.defineProperty(document, 'currentScript', {
    configurable: true,
    get() {
      const script = getCurrentScript.call(document) as HTMLScriptElement | null;
      const src = script && typeof script.src === 'string' ? script.src.split(/[?#]/)[0] : '';

      if (src !== config.scriptUrl) {
        return script;
      }

      if (tracker === null && !window.umami) {
        tracker = script;
      }

      return script === tracker ? script : null;
    },
  });
}
