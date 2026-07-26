const formatter = new Intl.DateTimeFormat('lv-LV', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
});

export const formatDateLabel = (isoDate: string): string => {
  return formatter.format(new Date(`${isoDate}T00:00:00Z`));
};
