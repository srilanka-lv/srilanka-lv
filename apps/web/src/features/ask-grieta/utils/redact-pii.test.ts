import { describe, expect, it } from 'bun:test';

import { errorMessageOf, redactPii } from './redact-pii';

describe('redactPii', () => {
  it('removes email addresses and phone numbers', () => {
    expect(redactPii('Contact anna.b+lv@example.com already exists')).toBe(
      'Contact [email] already exists',
    );
    expect(redactPii('Invalid number +371 26 123 456 given')).toBe('Invalid number [number] given');
  });

  it('keeps short codes and plain text', () => {
    expect(redactPii('HTTP 429: rate limited, retry in 2s')).toBe(
      'HTTP 429: rate limited, retry in 2s',
    );
    expect(errorMessageOf(new Error('to: x@y.lv'))).toBe('to: [email]');
  });
});
