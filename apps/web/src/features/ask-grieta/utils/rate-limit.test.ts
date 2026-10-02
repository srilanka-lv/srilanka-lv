import { describe, expect, it } from 'bun:test';

import { allowVisitor, createRateLimiter } from './rate-limit';

describe('createRateLimiter', () => {
  it('allows up to the limit within the window, per key', () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000 });

    expect(limiter.take('a', 0)).toBe(true);
    expect(limiter.take('a', 10)).toBe(true);
    expect(limiter.take('a', 20)).toBe(false);
    expect(limiter.take('b', 20)).toBe(true);
  });

  it('frees the key once the window has passed', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });

    expect(limiter.take('a', 0)).toBe(true);
    expect(limiter.take('a', 999)).toBe(false);
    expect(limiter.take('a', 1000)).toBe(true);
  });

  it('forgets the oldest key beyond maxKeys', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000, maxKeys: 2 });

    limiter.take('a', 0);
    limiter.take('b', 0);
    limiter.take('c', 0);

    expect(limiter.take('a', 1)).toBe(true);
    expect(limiter.take('c', 1)).toBe(false);
  });
});

describe('allowVisitor', () => {
  const request = (entries: Record<string, string>) => new Headers(entries);

  it('limits each visitor by their Cloudflare address', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000 });

    expect(allowVisitor(limiter, request({ 'cf-connecting-ip': '203.0.113.1' }))).toBe(true);
    expect(allowVisitor(limiter, request({ 'cf-connecting-ip': '203.0.113.1' }))).toBe(false);
    expect(allowVisitor(limiter, request({ 'cf-connecting-ip': '203.0.113.2' }))).toBe(true);
  });

  it('ignores x-forwarded-for, so a spoofed one cannot dodge the limit', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000 });

    expect(
      allowVisitor(
        limiter,
        request({ 'cf-connecting-ip': '203.0.113.1', 'x-forwarded-for': '198.51.100.1' }),
      ),
    ).toBe(true);
    expect(
      allowVisitor(
        limiter,
        request({ 'cf-connecting-ip': '203.0.113.1', 'x-forwarded-for': '198.51.100.2' }),
      ),
    ).toBe(false);
  });

  it('never refuses a request without a Cloudflare address', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000 });

    for (let i = 0; i < 3; i += 1) {
      expect(allowVisitor(limiter, request({ 'x-forwarded-for': '198.51.100.1' }))).toBe(true);
    }
  });
});
