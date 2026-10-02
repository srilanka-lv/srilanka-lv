import { type CountryCode, getCountries, getCountryCallingCode } from 'libphonenumber-js/mobile';

export type Country = {
  code: CountryCode;
  dial: string;
  flag: string;
  /** Latvian name, shown in the list. */
  name: string;
  /** Lower-case, accent-free text the filter matches against. */
  search: string;
};

export const DEFAULT_COUNTRY: CountryCode = 'LV';

// Pinned to the top of the list, in this order: where most visitors live.
const PINNED: CountryCode[] = ['LV', 'LT', 'EE'];

// Where Latvian travellers and the diaspora mostly live: these win ties when
// filtering, so "nor" finds Norway before Norfolk Island.
const POPULAR = new Set<CountryCode>([
  'GB',
  'IE',
  'DE',
  'NO',
  'SE',
  'FI',
  'DK',
  'NL',
  'BE',
  'FR',
  'ES',
  'IT',
  'AT',
  'CH',
  'PL',
  'US',
  'CA',
  'AU',
  'LK',
]);

// Several countries share one dial code; this is the one a "+CC" paste means.
export const MAIN_COUNTRY_FOR_DIAL: Record<string, CountryCode> = {
  '1': 'US',
  '7': 'RU',
  '44': 'GB',
  '47': 'NO',
  '61': 'AU',
  '212': 'MA',
  '262': 'RE',
  '290': 'SH',
  '358': 'FI',
  '590': 'GP',
  '599': 'CW',
};

// Everyday Latvian and English names Intl.DisplayNames doesn't give.
const ALIASES: Partial<Record<CountryCode, string>> = {
  GB: 'Lielbritānija Anglija Skotija UK Britain England',
  US: 'ASV Amerika USA America',
  NL: 'Holande Holland',
  AE: 'AAE UAE Dubaija Dubai',
  CZ: 'Čehija Czech',
  KR: 'Koreja Korea',
  RU: 'Krievija',
};

/** Accent-free lower case, so "vac" finds "Vācija" and "ostr" finds "Österreich". */
export const normalizeSearch = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

const toFlag = (code: string): string =>
  String.fromCodePoint(...[...code].map((char) => 0x1f1e6 + char.charCodeAt(0) - 65));

// Country names come from the browser (Intl.DisplayNames), so no name data
// ships with the page; libphonenumber-js supplies the codes and dial codes.
const buildCountries = (): Country[] => {
  const latvian = new Intl.DisplayNames(['lv'], { type: 'region' });
  const english = new Intl.DisplayNames(['en'], { type: 'region' });

  const countries = getCountries().map((code) => {
    const name = latvian.of(code) ?? code;
    const dial = getCountryCallingCode(code);

    return {
      code,
      dial,
      flag: toFlag(code),
      name,
      search: normalizeSearch(`${name} ${english.of(code) ?? ''} ${ALIASES[code] ?? ''} ${code}`),
    };
  });

  const pinned = PINNED.flatMap((code) => countries.filter((country) => country.code === code));
  const rest = countries
    .filter((country) => !PINNED.includes(country.code))
    .sort((a, b) => a.name.localeCompare(b.name, 'lv'));

  return [...pinned, ...rest];
};

export const COUNTRIES: Country[] = buildCountries();

export const PINNED_COUNT = PINNED.length;

export const findCountry = (code: string): Country =>
  COUNTRIES.find((country) => country.code === code) ??
  (COUNTRIES.find((country) => country.code === DEFAULT_COUNTRY) as Country);

/**
 * How well a country matches what was typed, or null for no match. Matches the
 * Latvian or English name, everyday aliases, the ISO code and the dial code,
 * so "Vāc", "germ", "DE", "49" and "+49" all find Germany, best match first.
 */
export const rankCountry = (country: Country, query: string): number | null => {
  // The input shows the chosen country as "🇱🇻 +371"; ignore the flag part.
  const cleaned = normalizeSearch(query.replace(/\p{Regional_Indicator}/gu, '')).trim();

  if (!cleaned) {
    return 0;
  }

  const digits = cleaned.replace(/^(\+|00)/, '').replace(/\s/g, '');

  if (/^\d+$/.test(digits)) {
    if (country.dial === digits) {
      return 0;
    }
    return country.dial.startsWith(digits) ? 1 : null;
  }

  const words = country.search.split(' ');

  if (country.code.toLowerCase() === cleaned) {
    return 0;
  }
  if (words.includes(cleaned) || normalizeSearch(country.name).startsWith(cleaned)) {
    return 1;
  }
  if (words.some((word) => word.startsWith(cleaned))) {
    return 2;
  }
  if (country.search.includes(cleaned)) {
    return 3;
  }

  return null;
};

const priority = (code: CountryCode): number =>
  PINNED.includes(code) ? 2 : POPULAR.has(code) ? 1 : 0;

/** Countries matching the query, best first; pinned and popular ones win ties. */
export const filterCountries = (query: string): Country[] =>
  COUNTRIES.map((country, index) => ({ country, index, rank: rankCountry(country, query) }))
    .filter(
      (entry): entry is { country: Country; index: number; rank: number } => entry.rank !== null,
    )
    .sort(
      (a, b) =>
        a.rank - b.rank || priority(b.country.code) - priority(a.country.code) || a.index - b.index,
    )
    .map((entry) => entry.country);
