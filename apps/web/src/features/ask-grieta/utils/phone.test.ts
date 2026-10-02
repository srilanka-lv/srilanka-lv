import { describe, expect, it } from 'bun:test';

import { VALIDATION } from '../constants/validation-messages';
import { splitInternationalNumber, toE164, validateNationalNumber } from './phone';

describe('toE164', () => {
  it('normalises a national number with spaces and punctuation', () => {
    expect(toE164('LV', '26 123 456')).toBe('+37126123456');
    expect(toE164('GB', '07400 123-456')).toBe('+447400123456');
    expect(toE164('LK', '(071) 234 5678')).toBe('+94712345678');
  });
});

describe('splitInternationalNumber', () => {
  it('moves a pasted dial code into the country', () => {
    expect(splitInternationalNumber('+371 26 123 456')).toEqual({
      country: 'LV',
      national: '26123456',
    });
    expect(splitInternationalNumber('0049 1512 3456789')).toEqual({
      country: 'DE',
      national: '15123456789',
    });
  });

  it('leaves national numbers alone', () => {
    expect(splitInternationalNumber('26 123 456')).toBeNull();
  });
});

describe('validateNationalNumber', () => {
  it('accepts a real mobile number', () => {
    expect(validateNationalNumber('LV', '26123456')).toBeNull();
  });

  it('names what is wrong', () => {
    expect(validateNationalNumber('LV', '')).toBe(VALIDATION.phoneRequired.message);
    expect(validateNationalNumber('LV', '2612')).toBe(VALIDATION.phoneTooShort.message);
    expect(validateNationalNumber('LV', '2612345678901')).toBe(VALIDATION.phoneTooLong.message);
    // A Latvian landline: right length, not a mobile range.
    expect(validateNationalNumber('LV', '67123456')).toBe(VALIDATION.phoneNotMobile.message);
  });

  it('rejects a country libphonenumber does not know instead of throwing', () => {
    expect(validateNationalNumber('XX', '26123456')).toBe(VALIDATION.countryUnknown.message);
  });
});
