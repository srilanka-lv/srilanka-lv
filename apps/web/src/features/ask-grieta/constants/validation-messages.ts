// Every validation message with the rule code analytics reports for it, so
// `ask-submit` can say which field broke which rule without sending anything
// the visitor typed.
export const VALIDATION = {
  nameRequired: { rule: 'required', message: 'Uzraksti, kā Tevi uzrunāt' },
  nameTooShort: { rule: 'too-short', message: 'Vārdam vajag vismaz 2 burtus' },
  nameTooLong: { rule: 'too-long', message: 'Lūdzu, ne vairāk kā 80 rakstzīmju' },
  countryUnknown: { rule: 'unknown', message: 'Izvēlies valsti no saraksta' },
  phoneRequired: {
    rule: 'required',
    message: 'Ieraksti savu WhatsApp numuru, lai varu Tev uzrakstīt',
  },
  phoneTooShort: { rule: 'too-short', message: 'Šim numuram trūkst ciparu' },
  phoneTooLong: { rule: 'too-long', message: 'Šim numuram ir par daudz ciparu' },
  phoneBadLength: {
    rule: 'invalid-length',
    message: 'Pārbaudi numuru: izvēlētajā valstī tāda garuma numuru nav',
  },
  phoneNotMobile: {
    rule: 'not-mobile',
    message: 'Tas neizskatās pēc mobilā numura izvēlētajā valstī',
  },
  emailFormat: { rule: 'format', message: 'Šī e-pasta adrese neizskatās pareiza' },
  messageTooLong: { rule: 'too-long', message: 'Lūdzu, ne vairāk kā 1000 rakstzīmju' },
} as const;

const RULE_BY_MESSAGE: Record<string, string> = Object.fromEntries(
  Object.values(VALIDATION).map(({ rule, message }) => [message, rule]),
);

export const ruleFor = (message: string | undefined): string =>
  (message && RULE_BY_MESSAGE[message]) || 'invalid';
