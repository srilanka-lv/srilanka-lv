import { describe, expect, it } from 'bun:test';

import { isExternalHref } from './is-external-href';

describe('isExternalHref', () => {
  it('is true for https and http urls', () => {
    expect(isExternalHref('https://www.booking.com/hotel')).toBe(true);
    expect(isExternalHref('http://example.com')).toBe(true);
  });

  it('is false for relative paths', () => {
    expect(isExternalHref('/blogs/kolombo')).toBe(false);
    expect(isExternalHref('#section')).toBe(false);
  });

  it('is false for mailto and other schemes', () => {
    expect(isExternalHref('mailto:sveiki@srilanka.lv')).toBe(false);
    expect(isExternalHref('https-fake')).toBe(false);
  });
});
