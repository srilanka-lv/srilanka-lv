const MONTHS_LOCATIVE = [
  'janvārī',
  'februārī',
  'martā',
  'aprīlī',
  'maijā',
  'jūnijā',
  'jūlijā',
  'augustā',
  'septembrī',
  'oktobrī',
  'novembrī',
  'decembrī',
];

export function formatLatvianMonthYear(isoDate: string): string {
  const date = new Date(isoDate);
  return `${date.getUTCFullYear()}. gada ${MONTHS_LOCATIVE[date.getUTCMonth()]}`;
}
