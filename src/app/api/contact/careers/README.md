# Careers Contact Form API

This API endpoint handles careers/job application form submissions with file attachments.

## Features

- ✅ Server-side validation using Zod
- ✅ reCAPTCHA verification
- ✅ File upload support (resume, cover letter)
- ✅ Email sending with attachments via Nodemailer
- ✅ Security validations (file type, size limits)

## Setup

### 1. Environment Variables

Add the following to your `.env` file:

```env
# Google reCAPTCHA v2
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here

# Optional: Override recipient email
CAREERS_RECIPIENT_EMAIL=careers@yourdomain.com
```

### 2. Get reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Register your site (use reCAPTCHA v2 "I'm not a robot" checkbox)
3. Add your domain and localhost for testing
4. Copy the Site Key (public) and Secret Key (private)

### 3. Gmail App Password (if using Gmail)

1. Enable 2-Factor Authentication on your Google account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this password in `EMAIL_PASSWORD` (not your regular password)

### 4. Other Email Providers

If not using Gmail, modify the transporter configuration in `route.ts`:

```typescript
return nodemailer.createTransport({
  host: "smtp.yourprovider.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});
```

## API Endpoint

**POST** `/api/contact/careers`

### Request

Content-Type: `multipart/form-data`

**Form Fields:**

- `firstName` (string, required) - Min 2 characters
- `lastName` (string, required) - Min 2 characters
- `email` (string, required) - Valid email format
- `phone` (string, required) - Min 2 characters
- `company` (string, optional)
- `title` (string, optional)
- `position` (string, optional)
- `department` (string, required)
- `message` (string, required) - Min 10 characters
- `recaptcha` (string, required) - reCAPTCHA token
- `files` (File[], optional) - Max 3 files

**File Constraints:**

- Maximum 3 files
- Max 10MB per file
- Allowed types: `.pdf`, `.doc`, `.docx`, `.txt`

### Response

**Success (200)**

```json
{
  "success": true,
  "message": "Application submitted successfully"
}
```

**Validation Error (400)**

```json
{
  "error": "Validation failed",
  "details": [
    {
      "path": ["email"],
      "message": "Please enter a valid email address"
    }
  ]
}
```

**Server Error (500)**

```json
{
  "error": "Failed to submit application",
  "details": "Error message"
}
```

## Security Features

1. **Server-side validation** - All inputs validated with Zod schema
2. **reCAPTCHA verification** - Prevents bot submissions
3. **File type validation** - Only allowed document types
4. **File size limits** - 10MB max per file, 3 files max
5. **Rate limiting** - Consider adding rate limiting middleware for production

## Testing Locally

1. Start the dev server: `npm run dev`
2. Fill out the form at `/careers` (or wherever the form is mounted)
3. Check the terminal for any errors
4. Check the recipient email inbox

## Production Deployment

Before deploying:

1. ✅ Add all environment variables to your hosting provider
2. ✅ Use real reCAPTCHA keys (not test keys)
3. ✅ Use a dedicated email account for sending
4. ✅ Consider using a professional email service (SendGrid, AWS SES, etc.) for better deliverability
5. ✅ Add rate limiting middleware
6. ✅ Set up email monitoring/logging

## Alternative Email Services

For production, consider:

- **SendGrid** - 100 emails/day free, better deliverability
- **AWS SES** - Pay-per-email, highly reliable
- **Mailgun** - Developer-friendly API
- **Postmark** - Transactional email specialist

Update the transporter in `route.ts` accordingly.
