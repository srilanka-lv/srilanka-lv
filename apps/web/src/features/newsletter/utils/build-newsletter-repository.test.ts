import { afterEach, beforeEach, describe, expect, it } from 'bun:test';

import { DefaultResendProvider } from '../providers/default-resend-provider';
import { MailpitProvider } from '../providers/mailpit-provider';
import { buildNewsletterProvider } from './build-newsletter-repository';

describe('buildNewsletterProvider', () => {
  const saved = { ...process.env };

  beforeEach(() => {
    process.env.RESEND_API_KEY = 're_test';
    process.env.RESEND_AUDIENCE_ID = 'audience_test';
  });

  afterEach(() => {
    process.env = { ...saved };
  });

  it('defaults to Resend when EMAIL_TRANSPORT is unset', () => {
    expect(buildNewsletterProvider({ NODE_ENV: 'development' })).toBeInstanceOf(
      DefaultResendProvider,
    );
    expect(buildNewsletterProvider({ NODE_ENV: 'production' })).toBeInstanceOf(
      DefaultResendProvider,
    );
  });

  it('uses Resend when EMAIL_TRANSPORT is resend or blank', () => {
    expect(buildNewsletterProvider({ EMAIL_TRANSPORT: 'resend' })).toBeInstanceOf(
      DefaultResendProvider,
    );
    expect(buildNewsletterProvider({ EMAIL_TRANSPORT: ' ' })).toBeInstanceOf(DefaultResendProvider);
  });

  it('uses Mailpit when EMAIL_TRANSPORT is mailpit outside production', () => {
    expect(
      buildNewsletterProvider({ EMAIL_TRANSPORT: 'mailpit', NODE_ENV: 'development' }),
    ).toBeInstanceOf(MailpitProvider);
  });

  it('does not need Resend credentials in Mailpit mode', () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_AUDIENCE_ID;

    expect(
      buildNewsletterProvider({ EMAIL_TRANSPORT: 'mailpit', NODE_ENV: 'development' }),
    ).toBeInstanceOf(MailpitProvider);
  });

  it('refuses Mailpit in production', () => {
    expect(() =>
      buildNewsletterProvider({ EMAIL_TRANSPORT: 'mailpit', NODE_ENV: 'production' }),
    ).toThrow('EMAIL_TRANSPORT=mailpit is not allowed in production');
  });

  it('throws on an unknown transport instead of falling back', () => {
    expect(() => buildNewsletterProvider({ EMAIL_TRANSPORT: 'mailpti' })).toThrow(
      'Unknown EMAIL_TRANSPORT "mailpti"',
    );
  });
});
