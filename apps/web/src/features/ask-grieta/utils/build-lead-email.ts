import type { NewsletterSendEmailInputModel } from '@/features/newsletter/models/newsletter-send-email-input-model';

import { findAskGrietaProduct } from '../constants/ask-grieta-products';
import type { LeadMeta } from '../constants/lead-meta-schema';
import type { AskGrietaLeadModel } from '../models/ask-grieta-lead-model';
import { formatCampaign } from './campaign';

/**
 * Every lead email starts with this, so an iPhone Mail VIP or notification
 * rule on the subject (or on the sender) can push it straight to Grieta.
 */
export const LEAD_SUBJECT_PREFIX = '🔔 Jauns pieteikums:';

const SITE_URL = 'https://srilanka.lv';

const CONTEXT_LABEL: Record<LeadMeta['context'], string> = {
  'instagram-app': 'Instagram lietotnē',
  'facebook-app': 'Facebook lietotnē',
  mobile: 'telefonā',
  desktop: 'datorā',
  unknown: 'nezināmā ierīcē',
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// A subject is one line: no control characters, collapsed whitespace, capped.
const toSubjectText = (value: string): string =>
  value
    .replace(/[\p{Cc}\p{Cf}]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60);

export const firstNameOf = (name: string): string => name.trim().split(/\s+/)[0] ?? '';

/** One tap from the email opens a chat with the visitor, greeting prefilled. */
export const buildReplyWhatsAppUrl = (lead: Pick<AskGrietaLeadModel, 'whatsapp' | 'name'>) => {
  const greeting = `Čau, ${firstNameOf(lead.name)}! Te Grieta no srilanka.lv.`;

  return `https://wa.me/${lead.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(greeting)}`;
};

export const formatRigaTime = (date: Date): string =>
  new Intl.DateTimeFormat('lv-LV', {
    timeZone: 'Europe/Riga',
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date);

type BuildLeadEmailOptions = {
  to: string;
  now: Date;
  /** Base for the page link; the live site when unset. */
  siteUrl?: string;
};

/**
 * The email Grieta gets for every Ask Grieta lead: who, what about, and a
 * one-tap WhatsApp reply. Everything the visitor typed is escaped. Replying to
 * the email reaches the visitor when they left an address.
 */
export function buildLeadEmail(
  lead: AskGrietaLeadModel,
  { to, now, siteUrl = SITE_URL }: BuildLeadEmailOptions,
): NewsletterSendEmailInputModel {
  const productLabel = findAskGrietaProduct(lead.product)?.label ?? 'Jautājums';
  const subject = `${LEAD_SUBJECT_PREFIX} ${productLabel} – ${toSubjectText(lead.name)}`;
  const replyUrl = buildReplyWhatsAppUrl(lead);
  const pageUrl = `${siteUrl.replace(/\/$/, '')}${lead.page}`;
  let pageLabel = lead.page;
  try {
    pageLabel = decodeURI(lead.page);
  } catch {
    // Malformed escapes: show the path as sent.
  }
  const source = [
    CONTEXT_LABEL[lead.context],
    lead.entry,
    lead.placement,
    ...(lead.campaign ? [formatCampaign(lead.campaign)] : []),
  ].join(' · ');
  const time = formatRigaTime(now);

  const rows: [string, string][] = [
    ['Produkts', findAskGrietaProduct(lead.product)?.label ?? 'Nav izvēlēts'],
    ['Vārds', lead.name],
    ['WhatsApp', lead.whatsapp],
    ['E-pasts', lead.email ?? 'Nav norādīts'],
    ['Lapa', pageLabel],
    ['Avots', source],
    ['Laiks (Rīga)', time],
  ];

  const text = [
    `Jauns pieteikums no srilanka.lv: ${productLabel}`,
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Ziņa:',
    lead.message ?? '(nav ziņas)',
    '',
    `Atbildēt WhatsApp: ${replyUrl}`,
    lead.email ? `Atbilde uz šo e-pastu aizies uz ${lead.email}.` : '',
  ]
    .join('\n')
    .trimEnd();

  const cell = 'padding:6px 12px 6px 0;vertical-align:top';
  const htmlValue = (label: string, value: string): string => {
    if (label === 'WhatsApp') {
      return `<a href="${escapeHtml(replyUrl)}" style="color:#2b2523">${escapeHtml(value)}</a>`;
    }
    if (label === 'E-pasts' && lead.email) {
      return `<a href="mailto:${escapeHtml(lead.email)}" style="color:#2b2523">${escapeHtml(value)}</a>`;
    }
    if (label === 'Lapa') {
      return `<a href="${escapeHtml(pageUrl)}" style="color:#2b2523">${escapeHtml(value)}</a>`;
    }

    return escapeHtml(value);
  };

  const html = `<!doctype html>
<html lang="lv">
  <body style="margin:0;padding:24px;background:#fbf8f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#2b2523;font-size:16px;line-height:1.5">
    <p style="margin:0 0 4px;font-size:14px;color:#6b605c">Jauns pieteikums no srilanka.lv</p>
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3">${escapeHtml(productLabel)}: ${escapeHtml(lead.name)}</h1>
    <p style="margin:0 0 20px"><a href="${escapeHtml(replyUrl)}" style="display:inline-block;padding:12px 20px;background:#25d366;color:#0b3d1f;text-decoration:none;border-radius:8px;font-weight:600">Atbildēt WhatsApp</a></p>
    <table role="presentation" style="border-collapse:collapse;margin:0 0 20px">
${rows.map(([label, value]) => `      <tr><th align="left" style="${cell};font-weight:600;white-space:nowrap">${label}</th><td style="${cell}">${htmlValue(label, value)}</td></tr>`).join('\n')}
    </table>
    <p style="margin:0 0 4px;font-weight:600">Ziņa</p>
    <p style="margin:0 0 20px;white-space:pre-wrap">${lead.message ? escapeHtml(lead.message) : '<span style="color:#6b605c">(nav ziņas)</span>'}</p>
    ${lead.email ? `<p style="margin:0;font-size:14px;color:#6b605c">Atbilde uz šo e-pastu aizies uz ${escapeHtml(lead.email)}.</p>` : ''}
  </body>
</html>`;

  return {
    to,
    subject,
    html,
    text,
    replyTo: lead.email ?? undefined,
  };
}
