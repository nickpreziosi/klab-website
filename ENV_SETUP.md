# Environment Variables Setup

This project uses a single `.env.local` file for all environment variables.

## Quick Start

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your values in `.env.local`

## Required Variables

### Sanity CMS

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (usually `production`) |
| `SANITY_API_TOKEN` | API token for server-side operations |

**To get your Sanity API token:**
1. Go to https://sanity.io/manage
2. Select your project
3. Navigate to **API** → **Tokens**
4. Click **Add API token**
5. Set permissions to **Editor**
6. Copy the token

### Google reCAPTCHA v2

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Public site key |
| `RECAPTCHA_SECRET_KEY` | Server-side secret key |

Get your keys from: https://www.google.com/recaptcha/admin

### Contact Form Email Configuration

Each contact form (Careers, Sales, Support) has its own email credentials to allow different sender addresses and recipients per department.

**For Gmail:** Enable 2FA and generate an App Password at https://myaccount.google.com/apppasswords

#### Careers Form

| Variable | Description |
|----------|-------------|
| `CAREERS_EMAIL_USER` | Gmail address for sending career form emails |
| `CAREERS_EMAIL_PASSWORD` | App password for the careers email |
| `CAREERS_RECIPIENT_EMAIL` | Where career applications are sent |

#### Sales Form

| Variable | Description |
|----------|-------------|
| `SALES_EMAIL_USER` | Gmail address for sending sales form emails |
| `SALES_EMAIL_PASSWORD` | App password for the sales email |
| `SALES_RECIPIENT_EMAIL` | Where sales inquiries are sent |

#### Support Form

| Variable | Description |
|----------|-------------|
| `SUPPORT_EMAIL_USER` | Gmail address for sending support form emails |
| `SUPPORT_EMAIL_PASSWORD` | App password for the support email |
| `SUPPORT_RECIPIENT_EMAIL` | Where support requests are sent |

## Security Notes

- `.env.local` is in `.gitignore` and will not be committed
- Never commit API tokens or secrets to version control
- Use `.env.local.example` as a template (it contains placeholder values only)
