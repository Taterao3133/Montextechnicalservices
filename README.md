# Montex Website

## Contact Form Email

The contact form sends email through the Resend API. Add these variables to `.env` locally and to your hosting provider environment variables:

```env
RESEND_API_KEY=re_your_resend_api_key
CONTACT_FROM_EMAIL=Montex Technical Services <onboarding@resend.dev>
CONTACT_TO_EMAIL=montextechnicals9@gmail.com
```

Use `onboarding@resend.dev` for testing. For production, verify your own domain in Resend and set `CONTACT_FROM_EMAIL` to an address on that domain. After changing `.env`, restart the dev or production server so Next.js loads the new values.
