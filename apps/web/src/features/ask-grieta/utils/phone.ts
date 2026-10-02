import {
  AsYouType,
  type CountryCode,
  getExampleNumber,
  isSupportedCountry,
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
} from 'libphonenumber-js/mobile';
import examples from 'libphonenumber-js/mobile/examples';

import { MAIN_COUNTRY_FOR_DIAL } from '../constants/countries';
import { VALIDATION } from '../constants/validation-messages';

// libphonenumber-js with its "mobile" metadata (≈24 KB gzipped, only in the
// lazily loaded drawer chunk): WhatsApp needs a mobile number, and this
// metadata knows each country's mobile ranges, not just its lengths.

export const digitsOnly = (value: string): string => value.replace(/\D/g, '');

/**
 * Phone autofill (autocomplete="tel") usually pastes the full international
 * number, e.g. "+371 26 123 456", and some people type "+44…" by hand. As soon
 * as the dial code is known, split it into the picker's country and the
 * national part. Works for every country libphonenumber knows.
 */
export const splitInternationalNumber = (
  value: string,
): { country: CountryCode; national: string } | null => {
  const trimmed = value.trim();

  if (!trimmed.startsWith('+') && !trimmed.startsWith('00')) {
    return null;
  }

  const digits = digitsOnly(trimmed.startsWith('00') ? trimmed.slice(2) : trimmed);
  const typer = new AsYouType();
  typer.input(`+${digits}`);
  const callingCode = typer.getCallingCode();

  if (!callingCode) {
    return null;
  }

  const country = typer.getCountry() ?? MAIN_COUNTRY_FOR_DIAL[callingCode];

  if (!country) {
    return null;
  }

  return { country, national: digits.slice(callingCode.length) };
};

export const validateNationalNumber = (country: string, national: string): string | null => {
  if (!isSupportedCountry(country)) {
    return VALIDATION.countryUnknown.message;
  }

  const digits = digitsOnly(national);

  if (digits.length === 0) {
    return VALIDATION.phoneRequired.message;
  }

  const lengthProblem = validatePhoneNumberLength(digits, country as CountryCode);

  if (lengthProblem === 'TOO_SHORT') {
    return VALIDATION.phoneTooShort.message;
  }

  if (lengthProblem === 'TOO_LONG') {
    return VALIDATION.phoneTooLong.message;
  }

  if (lengthProblem) {
    return VALIDATION.phoneBadLength.message;
  }

  if (!parsePhoneNumberFromString(digits, country as CountryCode)?.isValid()) {
    return VALIDATION.phoneNotMobile.message;
  }

  return null;
};

export const toE164 = (country: string, national: string): string =>
  parsePhoneNumberFromString(digitsOnly(national), country as CountryCode)?.number ??
  `+${digitsOnly(national)}`;

/**
 * A real mobile number of the country, without dial code or trunk prefix, as
 * the placeholder: "21 234 567" for Latvia, "7400 123456" for the UK.
 */
export const examplePlaceholder = (country: string): string => {
  const example = getExampleNumber(country as CountryCode, examples);

  return example
    ? example.formatInternational().replace(`+${example.countryCallingCode}`, '').trim()
    : '';
};
