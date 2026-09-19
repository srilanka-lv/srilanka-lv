export const INSTAGRAM_HANDLE = 'dzivetropos';

export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;

// ig.me deep link: opens a direct message thread with the account. Inside
// Instagram's own in-app browser this is the only contact route that reliably
// hands off, where wa.me links tend to strand the visitor on a WhatsApp Web page.
export const INSTAGRAM_DM_URL = `https://ig.me/m/${INSTAGRAM_HANDLE}`;
