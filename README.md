# srilanka.lv

## Local email with Mailpit

In production the site sends email through Resend. Locally you can catch every email in [Mailpit](https://mailpit.axllent.org) instead, so you can check its layout and content without anything leaving your machine.

1. Start Mailpit (needs Docker): `bun mailpit:start`
2. Set `EMAIL_TRANSPORT=mailpit` in `apps/web/.env.local`
3. Run the site with `bun web:dev` and submit a form
4. Read the inbox at http://localhost:8025
5. Stop Mailpit when you're done: `bun mailpit:stop`

How `EMAIL_TRANSPORT` behaves:

- Unset or `resend`: real email goes out through Resend. This is the default, and production uses it.
- `mailpit`: every email goes to Mailpit (`MAILPIT_URL`, default `http://localhost:8025`) and Resend is never called. When `NODE_ENV=production` the site refuses this setting with an error, so a production build can't quietly send email to Mailpit.
- Any other value is an error. The site doesn't fall back to Resend.

Adding a reader to the Resend audience only exists on Resend. In Mailpit mode that step is skipped and logged as `[mailpit] addContact skipped …`. As a result, the footer newsletter signup sends no email at all; it only adds the contact. The guide PDF request still sends its email, and that email shows up in Mailpit.
