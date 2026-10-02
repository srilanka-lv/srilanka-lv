import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test';

import { DefaultResendProvider, type ResendClient } from './default-resend-provider';

type Reply = { data: { id: string } | null; error: { message: string } | null };

const ok = (id: string): Reply => ({ data: { id }, error: null });
const fail = (message: string): Reply => ({ data: null, error: { message } });

const fakeClient = (replies: {
  create?: Reply[];
  add?: Reply[];
  update?: Reply[];
  send?: Reply[];
}) => {
  const next = (list: Reply[] | undefined) => async () => list?.shift() ?? ok('default');
  const client = {
    contacts: {
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

    expect(await provider.saveContact(lead)).toEqual({ id: 'c_1' });
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

    expect(await provider.saveContact(lead)).toEqual({ id: 'c_2' });
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

  it('leaves an existing contact untouched and throws', async () => {
    const { client, provider } = fakeClient({
      create: [fail('Contact already exists'), fail('Contact already exists')],
    });

    await expect(provider.saveContact(lead)).rejects.toThrow('Contact already exists');
    expect(client.contacts.segments.add).not.toHaveBeenCalled();
    expect(client.contacts.update).not.toHaveBeenCalled();
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
