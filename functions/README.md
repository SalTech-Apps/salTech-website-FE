# Newsletter Email Cloud Functions

Sends newsletter emails via Nodemailer from Firebase Cloud Functions.

## Setup

1. **Set SMTP secrets** (required):

   ```bash
   firebase functions:secrets:set SMTP_USER
   firebase functions:secrets:set SMTP_PASS
   ```

   Enter your SMTP username and password when prompted.

2. **Optional: Custom SMTP provider**

   Defaults to Gmail (`smtp.gmail.com:465`). For other providers, set these in Firebase config or as environment variables in Google Cloud Console:

   - `SMTP_HOST` – e.g. `smtp.sendgrid.net`
   - `SMTP_PORT` – e.g. `587`
   - `SMTP_SECURE` – `true` (default) or `false`
   - `SMTP_FROM` – From address (defaults to SMTP_USER)

   Example providers:
   - **Gmail**: Use an [App Password](https://support.google.com/accounts/answer/185833)
   - **SendGrid**: `smtp.sendgrid.net:587`
   - **Mailgun**: `smtp.mailgun.org:587`
   - **Resend**: `smtp.resend.com:465`

## Deploy

```bash
firebase deploy --only functions
```

## Callable functions

- **`sendNewsletterEmail`** – Accepts `{ to: string | string[], subject: string, text?: string, html?: string }`
- **`sendContactFormNotification`** – Sends an email to the admin when a contact form is submitted. Reads admin email from `meta/siteConfig` (falls back to SMTP_USER). Accepts `{ fullName, email, phone, subject, message }`.
- **`sendSurveySubmissionEmail`** – Sends a confirmation email to a survey participant after a successful submission. Accepts `{ email }`.
- **`sendIntelligenceReport`** – Sends the investment intelligence report to the user's email. Called from the public Intelligence page. Accepts `{ email, propertyType, location, bedrooms, sizeSqm, purchasePrice, investmentHorizon, investmentGoal, offPlan }`.

### Optional: Named Firestore database

If your project uses a named Firestore database (e.g. `Jesfem-db`), set the `DATABASE_ID` environment variable in Google Cloud Console so the contact form notification can read `meta/siteConfig`.
