import { describe, expect, it } from 'bun:test';

import { GUIDE_PDF_URL, buildGuidePdfEmail } from './guide-pdf-email';

describe('buildGuidePdfEmail', () => {
  it('addresses the reader and carries the Drive link in both bodies', () => {
    const email = buildGuidePdfEmail('lasitaja@example.com');

    expect(email.to).toBe('lasitaja@example.com');
    expect(email.subject).toBe('Tavs ceļvedis Šrilankas dienvidiem');
    expect(email.html).toContain(`href="${GUIDE_PDF_URL}"`);
    expect(email.text).toContain(GUIDE_PDF_URL);
  });

  it('points at a real Drive file, not the placeholder', () => {
    expect(GUIDE_PDF_URL).toMatch(
      /^https:\/\/drive\.google\.com\/file\/d\/[A-Za-z0-9_-]{20,}\/view$/,
    );
  });
});
