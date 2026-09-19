import type { NewsletterSendEmailInputModel } from '@/features/newsletter/models/newsletter-send-email-input-model';

/**
 * The south coast guide lives on Google Drive, shared as "anyone with the
 * link, viewer". The `/view` form opens Drive's viewer instead of forcing a
 * 5 MB download onto a phone.
 */
export const GUIDE_PDF_URL =
  'https://drive.google.com/file/d/1F-8a2avnAZZ5n-B0FIlSGJnYRsiXRaSj/view';

/**
 * Builds the one transactional email the guide sends. Copy approved
 * 2026-09-19.
 */
export function buildGuidePdfEmail(to: string): NewsletterSendEmailInputModel {
  const subject = 'Tavs ceļvedis Šrilankas dienvidiem';

  const text = [
    'Sveika!',
    '',
    'Paldies, ka atstāji e-pastu. Šeit ir mans ceļvedis Šrilankas dienvidiem: 60 lappuses par sezonu, vīzu, transportu, naktsmītnēm, pludmalēm, kafejnīcām, aktivitātēm un budžetu, plus 20+ vietas Google Maps.',
    '',
    `Atvērt ceļvedi: ${GUIDE_PDF_URL}`,
    '',
    'Ja rodas jautājumi, atbildi uz šo e-pastu. Reizi mēnesī atsūtīšu arī jaunumus par lidojumu cenām un salu, atteikties var ar vienu klikšķi.',
    '',
    'Grieta',
    'srilanka.lv',
  ].join('\n');

  const html = `<!doctype html>
<html lang="lv">
  <body style="margin:0;padding:24px;background:#fbf8f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#2b2523;font-size:16px;line-height:1.5">
    <p>Sveika!</p>
    <p>Paldies, ka atstāji e-pastu. Šeit ir mans ceļvedis Šrilankas dienvidiem: 60 lappuses par sezonu, vīzu, transportu, naktsmītnēm, pludmalēm, kafejnīcām, aktivitātēm un budžetu, plus 20+ vietas Google Maps.</p>
    <p><a href="${GUIDE_PDF_URL}" style="display:inline-block;padding:12px 20px;background:#e0553f;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600">Atvērt ceļvedi</a></p>
    <p>Ja poga neatveras, šī ir saite: <a href="${GUIDE_PDF_URL}">${GUIDE_PDF_URL}</a></p>
    <p>Ja rodas jautājumi, atbildi uz šo e-pastu. Reizi mēnesī atsūtīšu arī jaunumus par lidojumu cenām un salu, atteikties var ar vienu klikšķi.</p>
    <p>Grieta<br /><a href="https://srilanka.lv" style="color:#2b2523">srilanka.lv</a></p>
  </body>
</html>`;

  return { to, subject, html, text };
}
