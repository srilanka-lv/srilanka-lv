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
- `mailpit`: every email goes to Mailpit at `http://localhost:8025` and Resend is never called. When `NODE_ENV=production` the site refuses this setting with an error, so a production build can't quietly send email to Mailpit.
- Any other value is an error. The site doesn't fall back to Resend.

Adding a reader to the Resend audience only exists on Resend. In Mailpit mode that step is skipped and logged as `[mailpit] addContact skipped …`. As a result, the footer newsletter signup sends no email at all; it only adds the contact. The guide PDF request still sends its email, and that email shows up in Mailpit.

## Ask Grieta contact drawer

The "Jautā Grietai" drawer (`apps/web/src/features/ask-grieta`) sends each lead through the `submitAskGrieta` server action:

1. Grieta gets an email at `LEAD_NOTIFICATION_EMAIL` (default `sveiki@srilanka.lv`) from the site's usual sender. The subject starts with `🔔 Jauns pieteikums:`, so an iPhone Mail VIP or notification rule can push it. The email has a one-tap "Atbildēt WhatsApp" link, and when the visitor left an email address, replying to the email reaches them. A failed send is retried once; only an accepted email shows the visitor the success screen.
2. When the visitor left an email address, they are saved as a contact in the Resend segment `RESEND_LEADS_SEGMENT_ID`, with their name and, once the properties exist, `whatsapp` and `product`. Resend keys contacts by email address, so a lead without one is only in Grieta's inbox and Resend's email log. This step never fails the submission.

Leads are not stored anywhere else.

### Try it locally

1. `bun mailpit:start`
2. Set `EMAIL_TRANSPORT=mailpit` in `apps/web/.env.local`
3. `bun web:dev`, open any page and press "Jautā Grietai" (or add `?ask=trip` to the URL)
4. Send the form and read the lead email at http://localhost:8025

In Mailpit mode the Resend contact step is skipped and logged.

### One-time Resend setup for production

1. In Resend, create a segment for leads, for example "Ask Grieta leads". Don't use the newsletter one: these people asked a question, they didn't sign up for the newsletter.
2. Optional: under contact properties, create `whatsapp` and `product`, both of type string. Without them contacts are saved with name and email only.
3. Set the segment id as the GitHub variable `RESEND_LEADS_SEGMENT_ID` (repository or per environment), and redeploy. Until it is set, leads are emailed but not saved as contacts.
4. Optional: set `LEAD_NOTIFICATION_EMAIL` to send lead emails somewhere other than `sveiki@srilanka.lv`.
