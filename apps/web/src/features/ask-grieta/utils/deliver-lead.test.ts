import { afterEach, beforeEach, describe, expect, it, mock, spyOn } from 'bun:test';

import type { AskGrietaLeadModel } from '../models/ask-grieta-lead-model';
import { deliverLead } from './deliver-lead';

const lead: AskGrietaLeadModel = {
  product: 'consultation',
  name: 'Anna Marija Bērziņa',
  whatsapp: '+37126123456',
  country: 'LV',
  email: 'anna@example.com',
  message: null,
  page: '/',
  entry: 'floating',
  placement: 'floating-button',
  context: 'mobile',
};

const repositoryWith = ({ send = [] as ('ok' | 'fail')[], save = 'ok' as 'ok' | 'fail' } = {}) => ({
  sendEmail: mock(async () => {
    if (send.shift() === 'fail') {
      throw new Error('Resend 500 for anna@example.com');
    }
    return { id: 'email_1' };
  }),
  saveContact: mock(async () => {
    if (save === 'fail') {
      throw new Error('Segment seg_leads not found');
    }
    return { id: 'contact_1' };
  }),
});

const options = { recipient: 'sveiki@srilanka.lv', leadId: 'lead-1', retryDelayMs: 0 };

describe('deliverLead', () => {
  let logs: ReturnType<typeof spyOn>[];

  beforeEach(() => {
    logs = [
      spyOn(console, 'error').mockImplementation(() => undefined),
      spyOn(console, 'warn').mockImplementation(() => undefined),
      spyOn(console, 'info').mockImplementation(() => undefined),
    ];
  });

  afterEach(() => {
    for (const log of logs) {
      log.mockRestore();
    }
  });

  const loggedText = () => JSON.stringify(logs.map((log) => log.mock.calls));

  it('emails Grieta, then saves the visitor in the leads segment', async () => {
    const repository = repositoryWith();

    expect(await deliverLead(lead, { ...options, repository, segmentId: 'seg_leads' })).toEqual({
      status: 'sent',
      contact: 'saved',
    });
    expect(repository.sendEmail).toHaveBeenCalledTimes(1);
    expect(repository.sendEmail.mock.calls[0]).toEqual([
      expect.objectContaining({
        to: 'sveiki@srilanka.lv',
        replyTo: 'anna@example.com',
        idempotencyKey: 'ask-grieta-lead/lead-1',
      }),
    ]);
    expect(repository.saveContact).toHaveBeenCalledWith({
      email: 'anna@example.com',
      firstName: 'Anna',
      lastName: 'Marija Bērziņa',
      segmentId: 'seg_leads',
      properties: { whatsapp: '+37126123456', product: 'consultation' },
    });
  });

  it('retries a failed email once with the same idempotency key', async () => {
    const repository = repositoryWith({ send: ['fail', 'ok'] });

    expect(await deliverLead(lead, { ...options, repository, segmentId: 'seg_leads' })).toEqual({
      status: 'sent',
      contact: 'saved',
    });
    expect(repository.sendEmail).toHaveBeenCalledTimes(2);
    const keys = repository.sendEmail.mock.calls.map(
      (call) => (call as unknown as [{ idempotencyKey: string }])[0].idempotencyKey,
    );
    expect(new Set(keys).size).toBe(1);
  });

  it('fails without saving anything when the email fails twice, and logs no personal data', async () => {
    const repository = repositoryWith({ send: ['fail', 'fail'] });

    expect(await deliverLead(lead, { ...options, repository, segmentId: 'seg_leads' })).toEqual({
      status: 'failed',
      reason: 'email',
    });
    expect(repository.sendEmail).toHaveBeenCalledTimes(2);
    expect(repository.saveContact).not.toHaveBeenCalled();
    expect(loggedText()).toContain('email attempt 2 failed');
    expect(loggedText()).not.toContain('anna@example.com');
    expect(loggedText()).not.toContain('26123456');
  });

  it('still succeeds when saving the contact fails', async () => {
    const repository = repositoryWith({ save: 'fail' });

    expect(await deliverLead(lead, { ...options, repository, segmentId: 'seg_leads' })).toEqual({
      status: 'sent',
      contact: 'failed',
    });
  });

  it('skips the contact without an email address or without a segment', async () => {
    const withoutEmail = repositoryWith();
    expect(
      await deliverLead(
        { ...lead, email: null },
        { ...options, repository: withoutEmail, segmentId: 'seg_leads' },
      ),
    ).toEqual({ status: 'sent', contact: 'skipped-no-email' });
    expect(withoutEmail.saveContact).not.toHaveBeenCalled();

    const withoutSegment = repositoryWith();
    expect(await deliverLead(lead, { ...options, repository: withoutSegment })).toEqual({
      status: 'sent',
      contact: 'skipped-no-segment',
    });
    expect(withoutSegment.saveContact).not.toHaveBeenCalled();
  });

  it('sends no product property when none was chosen, and no last name for one word', async () => {
    const repository = repositoryWith();

    await deliverLead(
      { ...lead, product: null, name: 'Anna' },
      { ...options, repository, segmentId: 'seg_leads' },
    );

    expect(repository.saveContact).toHaveBeenCalledWith({
      email: 'anna@example.com',
      firstName: 'Anna',
      lastName: undefined,
      segmentId: 'seg_leads',
      properties: { whatsapp: '+37126123456' },
    });
  });
});
