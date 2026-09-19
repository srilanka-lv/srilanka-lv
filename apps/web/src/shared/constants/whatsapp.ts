export const WHATSAPP_NUMBER = '642902323786';

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// Opening line prefilled in the WhatsApp chat so the visitor never lands on an
// empty composer. Written in the visitor's voice, same register as the Instagram
// ad greeting; an empty string sends no text.
export const WHATSAPP_PREFILL_TEXT =
  'Sveiki, Grieta! Atradu Tevi srilanka.lv un gribu uzzināt vairāk par ceļojumu uz Šrilanku.';

export const buildWhatsAppUrl = (text: string = WHATSAPP_PREFILL_TEXT): string => {
  if (!text) {
    return WHATSAPP_URL;
  }

  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
};
