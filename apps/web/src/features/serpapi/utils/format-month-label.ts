const shortFormatter = new Intl.DateTimeFormat('lv-LV', { month: 'short', timeZone: 'UTC' });
const longFormatter = new Intl.DateTimeFormat('lv-LV', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export const formatMonthLabel = (monthKey: string, variant: 'short' | 'long'): string => {
  const date = new Date(`${monthKey}-01T00:00:00Z`);

  if (variant === 'short') {
    return shortFormatter.format(date);
  }

  return longFormatter.format(date);
};
