import { afterEach, beforeEach, describe, expect, it, mock, spyOn } from 'bun:test';

import { VALIDATION } from '../constants/validation-messages';
import type { AskGrietaLeadModel } from '../models/ask-grieta-lead-model';
import type { DeliverLeadResult } from './deliver-lead';
import { handleLeadSubmission } from './handle-lead-submission';

const input = {
  lead: {
    product: 'travel-plan',
    name: '  Anna  ',
    country: 'GB',
    phone: '07400 123456',
    email: ' anna@example.com ',
    message: '  Janvārī, ar draudzeni  ',
  },
  meta: {
    page: '/blogi',
    entry: 'deep-link',
    placement: 'url',
    context: 'instagram-app',
  },
  website: '',
};

const deps = (
  result: DeliverLeadResult = { status: 'sent', contact: 'saved' },
  allowed = true,
) => ({
  allow: mock(() => allowed),
  deliver: mock(async (_lead: AskGrietaLeadModel) => result),
});

describe('handleLeadSubmission', () => {
  let logs: ReturnType<typeof spyOn>[];

  beforeEach(() => {
    logs = [
      spyOn(console, 'info').mockImplementation(() => undefined),
      spyOn(console, 'warn').mockImplementation(() => undefined),
    ];
  });

  afterEach(() => {
    for (const log of logs) {
      log.mockRestore();
    }
  });

  it('normalises a valid lead and delivers it', async () => {
    const d = deps();

    expect(await handleLeadSubmission(input, d)).toEqual({ status: 'sent' });
    expect(d.deliver).toHaveBeenCalledWith({
      product: 'travel-plan',
      name: 'Anna',
      whatsapp: '+447400123456',
      country: 'GB',
      email: 'anna@example.com',
      message: 'Janvārī, ar draudzeni',
      page: '/blogi',
      entry: 'deep-link',
      placement: 'url',
      context: 'instagram-app',
    });
  });

  it('turns empty optional fields into null', async () => {
    const d = deps();

    await handleLeadSubmission({ ...input, lead: { ...input.lead, email: '', message: ' ' } }, d);

    expect(d.deliver.mock.calls[0]?.[0]).toMatchObject({ email: null, message: null });
  });

  it('pretends success for a filled honeypot and sends nothing', async () => {
    const d = deps();

    expect(await handleLeadSubmission({ ...input, website: 'https://spam.example' }, d)).toEqual({
      status: 'sent',
    });
    expect(d.deliver).not.toHaveBeenCalled();
    expect(d.allow).not.toHaveBeenCalled();
  });

  it('returns field errors with the drawer messages, without touching the rate limit', async () => {
    const d = deps();

    expect(
      await handleLeadSubmission({ ...input, lead: { ...input.lead, phone: '0740', name: '' } }, d),
    ).toEqual({
      status: 'invalid',
      errors: {
        name: VALIDATION.nameRequired.message,
        phone: VALIDATION.phoneTooShort.message,
      },
    });
    expect(d.allow).not.toHaveBeenCalled();
    expect(d.deliver).not.toHaveBeenCalled();
  });

  it('treats a missing or malformed body as invalid', async () => {
    expect(await handleLeadSubmission(null, deps())).toMatchObject({ status: 'invalid' });
    expect(await handleLeadSubmission({ lead: 'x' }, deps())).toMatchObject({ status: 'invalid' });
  });

  it('refuses when over the rate limit', async () => {
    const d = deps(undefined, false);

    expect(await handleLeadSubmission(input, d)).toEqual({
      status: 'failed',
      reason: 'rate-limited',
    });
    expect(d.deliver).not.toHaveBeenCalled();
  });

  it('never refuses a lead over bad metadata', async () => {
    const d = deps();

    expect(
      await handleLeadSubmission({ ...input, meta: { page: 'evil', placement: 'A B' } }, d),
    ).toEqual({ status: 'sent' });
    expect(d.deliver.mock.calls[0]?.[0]).toMatchObject({
      page: '/',
      entry: 'unknown',
      placement: 'unknown',
      context: 'unknown',
    });
  });

  it('passes a delivery failure through', async () => {
    expect(await handleLeadSubmission(input, deps({ status: 'failed', reason: 'email' }))).toEqual({
      status: 'failed',
      reason: 'email',
    });
  });
});
