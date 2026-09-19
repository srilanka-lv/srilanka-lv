import { describe, expect, it } from 'bun:test';

import { INSTAGRAM_DM_URL } from '@/shared/constants/instagram';
import { WHATSAPP_URL } from '@/shared/constants/whatsapp';

import { isInAppBrowser, resolveContactLink } from './contact-link';

const INSTAGRAM_IOS =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 340.0.0.22.92';
const FACEBOOK_ANDROID =
  'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/470.0.0.0;]';
const SAFARI_IOS =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const CHROME_MAC =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';

describe('isInAppBrowser', () => {
  it('detects the Instagram and Facebook in-app browsers', () => {
    expect(isInAppBrowser(INSTAGRAM_IOS)).toBe(true);
    expect(isInAppBrowser(FACEBOOK_ANDROID)).toBe(true);
  });

  it('is false for regular browsers', () => {
    expect(isInAppBrowser(SAFARI_IOS)).toBe(false);
    expect(isInAppBrowser(CHROME_MAC)).toBe(false);
  });
});

describe('resolveContactLink', () => {
  it('sends in-app browser visitors to an Instagram DM in the same tab', () => {
    const link = resolveContactLink(INSTAGRAM_IOS);
    expect(link.href).toBe(INSTAGRAM_DM_URL);
    expect(link.channel).toBe('instagram');
    expect(link.target).toBeUndefined();
  });

  it('keeps WhatsApp for mobile browsers but opens it in the same tab', () => {
    const link = resolveContactLink(SAFARI_IOS);
    expect(link.href.startsWith(WHATSAPP_URL)).toBe(true);
    expect(link.channel).toBe('whatsapp');
    expect(link.target).toBeUndefined();
  });

  it('keeps WhatsApp in a new tab on desktop', () => {
    const link = resolveContactLink(CHROME_MAC);
    expect(link.channel).toBe('whatsapp');
    expect(link.target).toBe('_blank');
  });
});
