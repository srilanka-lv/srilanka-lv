import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test';

import { DefaultResendProvider, type ResendClient } from './default-resend-provider';

type Reply = { data: { id: string } | null; error: { message: string; name?: string } | null };

const ok = (id: string): Reply => ({ data: { id }, error: null });
const fail = (message: string, name = 'validation_error'): Reply => ({
  data: null,
  error: { message, name },
});
const notFound = fail('Contact not found', 'not_found');

const fakeClient = (replies: {
  get?: Reply[];
  create?: Reply[];
  add?: Reply[];
  update?: Reply[];
  send?: Reply[];
}) => {
  const next = (list: Reply[] | undefined) => async () => list?.shift() ?? ok('default');
  const client = {
    contacts: {
      get: mock(async () => replies.get?.shift() ?? notFound),
      create: mock(next(replies.create)),
      update: mock(next(replies.update)),
      segments: { add: mock(next(replies.add)) },
    },
    emails: { send: mock(next(replies.send)) },
  };

  return { client, provider: new DefaultResendProvider(client as unknown as ResendClient) };
};

const lead = {
  email: 'anna@example.com',
  firstName: 'Anna',
  lastName: 'Bērziņa',
  segmentId: 'seg_leads',
  properties: { whatsapp: '+37126123456', product: 'girls-trip' },
};

describe('DefaultResendProvider.saveContact', () => {
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  beforeEach(() => {
    process.env.RESEND_AUDIENCE_ID = 'aud_newsletter';
  });

  afterEach(() => {
    process.env.RESEND_AUDIENCE_ID = audienceId;
  });

  it('creates the contact in the leads segment with name and properties, never unsubscribing', async () => {
    const { client, provider } = fakeClient({ create: [ok('c_1')] });

    expect(await provider.saveContact(lead)).toEqual({ id: 'c_1', existing: false });
    expect(client.contacts.get).toHaveBeenCalledWith({ email: 'anna@example.com' });
    expect(client.contacts.create).toHaveBeenCalledTimes(1);
    expect(client.contacts.create).toHaveBeenCalledWith({
      email: 'anna@example.com',
      firstName: 'Anna',
      lastName: 'Bērziņa',
      properties: { whatsapp: '+37126123456', product: 'girls-trip' },
      segments: [{ id: 'seg_leads' }],
    });
    // The newsletter audience is never touched.
    expect(JSON.stringify(client.contacts.create.mock.calls)).not.toContain('aud_newsletter');
    expect(JSON.stringify(client.contacts.create.mock.calls)).not.toContain('unsubscribed');
  });

  it('retries without properties when Resend rejects them', async () => {
    const { client, provider } = fakeClient({
      create: [fail('Property "whatsapp" does not exist'), ok('c_2')],
    });

    expect(await provider.saveContact(lead)).toEqual({ id: 'c_2', existing: false });
    expect(client.contacts.create).toHaveBeenCalledTimes(2);
    expect(client.contacts.create.mock.calls[1]).toEqual([
      {
        email: 'anna@example.com',
        firstName: 'Anna',
        lastName: 'Bērziņa',
        segments: [{ id: 'seg_leads' }],
      },
    ]);
  });

  it('leaves an existing contact untouched', async () => {
    const { client, provider } = fakeClient({ get: [ok('c_existing')] });

    expect(await provider.saveContact(lead)).toEqual({ id: 'c_existing', existing: true });
    expect(client.contacts.create).not.toHaveBeenCalled();
    expect(client.contacts.update).not.toHaveBeenCalled();
    expect(client.contacts.segments.add).not.toHaveBeenCalled();
  });

  it('creates nothing when the lookup fails for another reason', async () => {
    const { client, provider } = fakeClient({
      get: [fail('Too many requests', 'rate_limit_exceeded')],
    });

    await expect(provider.saveContact(lead)).rejects.toThrow('Too many requests');
    expect(client.contacts.create).not.toHaveBeenCalled();
    expect(client.contacts.update).not.toHaveBeenCalled();
    expect(client.contacts.segments.add).not.toHaveBeenCalled();
  });

  it('throws when the new contact cannot be created', async () => {
    const { client, provider } = fakeClient({ create: [fail('nope'), fail('nope')] });

    await expect(provider.saveContact(lead)).rejects.toThrow('nope');
    expect(client.contacts.update).not.toHaveBeenCalled();
    expect(client.contacts.segments.add).not.toHaveBeenCalled();
  });
});

describe('DefaultResendProvider.sendEmail', () => {
  beforeEach(() => {
    process.env.RESEND_AUDIENCE_ID ??= 'aud_newsletter';
  });

  it('sends with the visitor as reply-to and the idempotency key', async () => {
    const { client, provider } = fakeClient({ send: [ok('e_1')] });

    expect(
      await provider.sendEmail({
        to: 'sveiki@srilanka.lv',
        subject: 'Tēma',
        html: '<p>Sveiki</p>',
        text: 'Sveiki',
        replyTo: 'anna@example.com',
        idempotencyKey: 'ask-grieta-lead/abc',
      }),
    ).toEqual({ id: 'e_1' });
    expect(client.emails.send).toHaveBeenCalledWith(
      {
        from: 'Grieta | Šrilanka.lv <sveiki@srilanka.lv>',
        replyTo: 'anna@example.com',
        to: 'sveiki@srilanka.lv',
        subject: 'Tēma',
        html: '<p>Sveiki</p>',
        text: 'Sveiki',
      },
      { idempotencyKey: 'ask-grieta-lead/abc' },
    );
  });

  it('falls back to the site inbox as reply-to and throws on a Resend error', async () => {
    const { client, provider } = fakeClient({ send: [fail('rate limited')] });

    await expect(
      provider.sendEmail({ to: 'x@example.com', subject: 's', html: 'h', text: 't' }),
    ).rejects.toThrow('rate limited');
    expect(client.emails.send.mock.calls[0]).toEqual([
      expect.objectContaining({ replyTo: 'sveiki@srilanka.lv' }),
      undefined,
    ]);
  });
});
