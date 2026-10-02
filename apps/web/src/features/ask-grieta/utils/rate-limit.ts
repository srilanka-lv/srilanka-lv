type RateLimiterOptions = {
  /** Attempts allowed per key within the window. */
  limit: number;
  windowMs: number;
  /** Keys tracked at most; the oldest are dropped beyond it. */
  maxKeys?: number;
};

/**
 * In-memory sliding window. The site runs as one container, so memory is
 * enough to slow a script hammering the form; it resets on deploy, which is
 * fine for an abuse guard.
 */
export const createRateLimiter = ({ limit, windowMs, maxKeys = 10_000 }: RateLimiterOptions) => {
  const hits = new Map<string, number[]>();

  return {
    /** Records an attempt; false when the key is over its limit. */
    take(key: string, now: number = Date.now()): boolean {
      const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

      if (recent.length >= limit) {
        hits.set(key, recent);
        return false;
      }

      recent.push(now);
      hits.delete(key);
      hits.set(key, recent);

      if (hits.size > maxKeys) {
        const oldest = hits.keys().next().value;
        if (oldest !== undefined) {
          hits.delete(oldest);
        }
      }

      return true;
    },
  };
};
