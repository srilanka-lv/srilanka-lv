import { afterEach, describe, expect, it, mock, spyOn } from 'bun:test';

import { MailpitProvider, toMailpitAddress } from './mailpit-provider';

describe('toMailpitAddress', () => {
  it('splits a display name from the address', () => {
    expect(toMailpitAddress('Grieta | Šrilanka.lv <sveiki@srilanka.lv>')).toEqual({
      Name: 'Grieta | Šrilanka.lv',
      Email: 'sveiki@srilanka.lv',
    });
  });

  it('passes a bare address through', () => {
    expect(toMailpitAddress('lasitaja@example.com')).toEqual({ Email: 'lasitaja@example.com' });
  });
});

describe('MailpitProvider', () => {
  const realFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = realFetch;
  });

  it('posts the email to the Mailpit send API with the real sender', async () => {
    const fetchMock = mock(async () => Response.json({ ID: 'abc123' }));
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const result = await new MailpitProvider().sendEmail({
      to: 'lasitaja@example.com',
      subject: 'Tēma',
      html: '<p>Sveiki</p>',
      text: 'Sveiki',
    });

    expect(result).toEqual({ id: 'abc123' });

    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('http://localhost:8025/api/v1/send');
    expect(JSON.parse(init.body as string)).toEqual({
      From: { Name: 'Grieta | Šrilanka.lv', Email: 'sveiki@srilanka.lv' },
      ReplyTo: [{ Email: 'sveiki@srilanka.lv' }],
      To: [{ Email: 'lasitaja@example.com' }],
      Subject: 'Tēma',
      HTML: '<p>Sveiki</p>',
      Text: 'Sveiki',
    });
  });

  it('skips addContact without calling Mailpit', async () => {
    const fetchMock = mock(async () => Response.json({}));
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    expect(await new MailpitProvider().addContact('lasitaja@example.com')).toEqual({
      id: 'mailpit-noop',
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('uses the reply-to address the email asks for', async () => {
    const fetchMock = mock(async () => Response.json({ ID: 'abc123' }));
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await new MailpitProvider().sendEmail({
      to: 'sveiki@srilanka.lv',
      subject: 'Tēma',
      html: '<p>Sveiki</p>',
      text: 'Sveiki',
      replyTo: 'anna@example.com',
    });

    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(init.body as string).ReplyTo).toEqual([{ Email: 'anna@example.com' }]);
  });

  it('skips saveContact without calling Mailpit or logging the address', async () => {
    const fetchMock = mock(async () => Response.json({}));
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    const info = spyOn(console, 'info').mockImplementation(() => undefined);

    expect(
      await new MailpitProvider().saveContact({ email: 'anna@example.com', segmentId: 'seg_1' }),
    ).toEqual({ id: 'mailpit-noop', existing: false });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(JSON.stringify(info.mock.calls)).not.toContain('anna@example.com');
    info.mockRestore();
  });
});
