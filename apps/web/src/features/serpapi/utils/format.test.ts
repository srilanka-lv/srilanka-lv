import { describe, expect, it } from 'bun:test';

import { formatDateLabel } from './format-date-label';
import { formatDuration } from './format-duration';
import { formatMonthLabel } from './format-month-label';
import { formatPrice } from './format-price';
import { formatShortDate } from './format-short-date';

describe('formatDuration', () => {
  it('formats hours and minutes', () => {
    expect(formatDuration(1340)).toBe('22 st. 20 min');
  });

  it('omits minutes when zero', () => {
    expect(formatDuration(120)).toBe('2 st.');
  });

  it('omits hours when under one hour', () => {
    expect(formatDuration(45)).toBe('45 min');
  });
});

// Golden lv-LV strings below depend on Bun's ICU. If one fails, log the actual
// output, confirm it is valid lv-LV, and update the golden value (keep lv-LV).
describe('formatMonthLabel', () => {
  it('formats a short month label', () => {
    expect(formatMonthLabel('2026-10', 'short')).toBe('okt.');
  });

  it('formats a long month label with year', () => {
    expect(formatMonthLabel('2027-01', 'long')).toBe('2027. g. janvāris');
  });
});

describe('formatDateLabel', () => {
  it('formats weekday, day and month', () => {
    expect(formatDateLabel('2026-10-05')).toBe('pirmdiena, 5. oktobris');
  });
});

describe('formatShortDate', () => {
  it('formats a dotted short date', () => {
    expect(formatShortDate('2026-05-23')).toBe('23.05.2026');
  });
});

describe('formatPrice', () => {
  it('formats whole euros with trailing sign', () => {
    expect(formatPrice(382)).toBe('382 €');
  });
});
