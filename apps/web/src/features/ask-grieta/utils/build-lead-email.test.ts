import { describe, expect, it } from 'bun:test';

import type { AskGrietaLeadModel } from '../models/ask-grieta-lead-model';
import { LEAD_SUBJECT_PREFIX, buildLeadEmail, buildReplyWhatsAppUrl } from './build-lead-email';

const lead: AskGrietaLeadModel = {
  product: 'girls-trip',
  name: 'Anna Bērziņa',
  whatsapp: '+37126123456',
  country: 'LV',
  email: 'anna@example.com',
  message: 'Vai var braukt ar draudzeni?\nUn kad jāmaksā?',
  page: '/produkti/meitenu-celojums-uz-srilanku',
  entry: 'inline',
  placement: 'trip-hero',
  context: 'instagram-app',
};

// 2 Oct 2026 09:30 UTC is 12:30 in Riga (summer time, UTC+3).
const now = new Date('2026-10-02T09:30:00Z');

describe('buildLeadEmail', () => {
  it('has a subject a phone notification rule can match', () => {
    const email = buildLeadEmail(lead, { to: 'sveiki@srilanka.lv', now });

    expect(email.subject).toBe(`${LEAD_SUBJECT_PREFIX} Meiteņu ceļojums – Anna Bērziņa`);
    expect(email.subject.startsWith('🔔 Jauns pieteikums:')).toBe(true);
    expect(email.to).toBe('sveiki@srilanka.lv');
  });

  it('lets Grieta reply by email to the visitor, and only when there is an address', () => {
    expect(buildLeadEmail(lead, { to: 'g@x.lv', now }).replyTo).toBe('anna@example.com');
    expect(buildLeadEmail({ ...lead, email: null }, { to: 'g@x.lv', now }).replyTo).toBeUndefined();
  });

  it('carries every detail, in text and in HTML', () => {
    const email = buildLeadEmail(lead, { to: 'g@x.lv', now, siteUrl: 'https://srilanka.lv' });
    const replyUrl = buildReplyWhatsAppUrl(lead);

    for (const body of [email.text, email.html]) {
      expect(body).toContain('Meiteņu ceļojums');
      expect(body).toContain('Anna Bērziņa');
      expect(body).toContain('+37126123456');
      expect(body).toContain('anna@example.com');
      expect(body).toContain('Vai var braukt ar draudzeni?');
      expect(body).toContain('/produkti/meitenu-celojums-uz-srilanku');
      expect(body).toContain('Instagram lietotnē · inline · trip-hero');
      expect(body).toContain('12:30');
    }
    expect(email.text).toContain(`Atbildēt WhatsApp: ${replyUrl}`);
    expect(email.html).toContain(`href="${replyUrl}"`);
    expect(email.html).toContain('Atbildēt WhatsApp');
    expect(email.html).toContain(
      'href="https://srilanka.lv/produkti/meitenu-celojums-uz-srilanku"',
    );
  });

  it('builds a one-tap wa.me reply with a greeting', () => {
    expect(buildReplyWhatsAppUrl(lead)).toBe(
      `https://wa.me/37126123456?text=${encodeURIComponent('Čau, Anna! Te Grieta no srilanka.lv.')}`,
    );
  });

  it('works without product, email or message', () => {
    const email = buildLeadEmail(
      { ...lead, product: null, email: null, message: null },
      { to: 'g@x.lv', now },
    );

    expect(email.subject).toBe(`${LEAD_SUBJECT_PREFIX} Jautājums – Anna Bērziņa`);
    expect(email.text).toContain('Produkts: Nav izvēlēts');
    expect(email.text).toContain('E-pasts: Nav norādīts');
    expect(email.text).toContain('(nav ziņas)');
    expect(email.html).not.toContain('mailto:');
  });

  it('escapes everything the visitor typed and keeps the subject on one line', () => {
    const email = buildLeadEmail(
      {
        ...lead,
        name: 'Anna <script>alert(1)</script>\r\nBcc: x@y.lv',
        message: '<img src=x onerror=alert(1)> & "quotes"',
      },
      { to: 'g@x.lv', now },
    );

    expect(email.html).not.toContain('<script>');
    expect(email.html).not.toContain('<img src=x');
    expect(email.html).toContain('&lt;img src=x onerror=alert(1)&gt; &amp; &quot;quotes&quot;');
    expect(email.subject).not.toMatch(/[\r\n]/);
    expect(email.subject.length).toBeLessThanOrEqual(LEAD_SUBJECT_PREFIX.length + 80);
  });
});
