# Form Validation & Testing Summary

## Environment Variables

All three forms now use distinct environment variables:

### Sales Form
- `SALES_EMAIL_USER` - Email account for sending sales inquiries
- `SALES_EMAIL_PASSWORD` - Password for sales email account
- `SALES_RECIPIENT_EMAIL` - Recipient email for sales inquiries

### Careers Form
- `CAREERS_EMAIL_USER` - Email account for sending career applications
- `CAREERS_EMAIL_PASSWORD` - Password for careers email account
- `CAREERS_RECIPIENT_EMAIL` - Recipient email for career applications

### Support Form
- `SUPPORT_EMAIL_USER` - Email account for sending support requests
- `SUPPORT_EMAIL_PASSWORD` - Password for support email account
- `SUPPORT_RECIPIENT_EMAIL` - Recipient email for support requests

### Shared
- `RECAPTCHA_SECRET_KEY` - Shared reCAPTCHA secret key
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Shared reCAPTCHA site key (client-side)

## Validation Schema Alignment

### ✅ Sales Form
**Client-side validation:**
- firstName: min 2 characters
- lastName: min 2 characters
- email: valid email format
- phone: min 2 characters
- company: min 1 character (required)
- position: min 1 character (required)
- companyWebsite: valid URL (required)
- companyType: must be one of valid company types (required)
- product: must be one of valid products (required)
- country: must be one of valid countries (required)
- message: min 2 characters (required)
- recaptcha: required

**Server-side validation:**
- ✅ All fields match client-side validation
- ✅ Basic string validation (detailed enum checks handled client-side)

### ✅ Careers Form
**Client-side validation:**
- firstName: min 2 characters
- lastName: min 2 characters
- email: valid email format
- phone: min 2 characters
- company: optional
- title: optional
- position: optional
- department: must be one of valid departments (required)
- message: min 10 characters (required)
- files: max 3 files, optional
- recaptcha: required

**Server-side validation:**
- ✅ All fields match client-side validation
- ✅ File validation: max 3 files, max 10MB per file
- ✅ Allowed file types: .pdf, .doc, .docx, .txt

### ✅ Support Form
**Client-side validation:**
- firstName: min 2 characters
- lastName: min 2 characters
- email: valid email format
- phone: min 2 characters
- issueType: must be one of valid issue types (required)
- product: must be one of valid products (required)
- message: min 10 characters (required)
- files: max 5 files, optional
- recaptcha: required

**Server-side validation:**
- ✅ All fields match client-side validation
- ✅ File validation: max 5 files, max 10MB per file
- ✅ Allowed file types: .jpg, .jpeg, .png, .mp4, .mov, .pdf

## Testing Checklist

### Client-Side Validation Tests

#### Sales Form (`/contact/sales`)
- [ ] Empty form submission - should show validation errors for all required fields
- [ ] First name < 2 characters - should show "First name must be at least 2 characters"
- [ ] Last name < 2 characters - should show "Last name must be at least 2 characters"
- [ ] Invalid email format - should show "Please enter a valid email address"
- [ ] Empty phone - should show "Phone number is required"
- [ ] Empty company - should show "Company name is required"
- [ ] Empty position - should show "Position is required"
- [ ] Invalid URL for company website - should show "Please enter a valid URL"
- [ ] Invalid company type - should be prevented by combobox selection
- [ ] Invalid product - should be prevented by combobox selection
- [ ] Invalid country - should be prevented by combobox selection
- [ ] Message < 2 characters - should show "Message is required"
- [ ] Valid form submission - should submit successfully

#### Careers Form (`/contact/careers`)
- [ ] Empty form submission - should show validation errors for required fields
- [ ] First name < 2 characters - should show validation error
- [ ] Last name < 2 characters - should show validation error
- [ ] Invalid email format - should show validation error
- [ ] Empty phone - should show validation error
- [ ] Empty department - should show "Please select a department"
- [ ] Message < 10 characters - should show "Message must be at least 10 characters"
- [ ] Upload > 3 files - should show "Maximum 3 files allowed"
- [ ] Upload invalid file type - should be prevented by FileUpload component
- [ ] Company, title, position are optional - should allow submission without them
- [ ] Valid form submission with files - should submit successfully
- [ ] Valid form submission without files - should submit successfully

#### Support Form (`/contact/support`)
- [ ] Empty form submission - should show validation errors for required fields
- [ ] First name < 2 characters - should show validation error
- [ ] Last name < 2 characters - should show validation error
- [ ] Invalid email format - should show validation error
- [ ] Empty phone - should show validation error
- [ ] Empty issue type - should show "Please select an issue type"
- [ ] Empty product - should show "Please select a product"
- [ ] Message < 10 characters - should show "Message must be at least 10 characters"
- [ ] Upload > 5 files - should show "Maximum 5 files allowed"
- [ ] Upload invalid file type - should be prevented by FileUpload component
- [ ] Valid form submission with files - should submit successfully
- [ ] Valid form submission without files - should submit successfully

### Server-Side Validation Tests

#### Sales Form API (`/api/contact/sales`)
- [ ] Missing firstName - should return 400 with validation error
- [ ] firstName < 2 characters - should return 400 with validation error
- [ ] Missing lastName - should return 400 with validation error
- [ ] Invalid email format - should return 400 with validation error
- [ ] Missing phone - should return 400 with validation error
- [ ] Missing company - should return 400 with validation error
- [ ] Missing position - should return 400 with validation error
- [ ] Invalid URL for companyWebsite - should return 400 with validation error
- [ ] Missing companyType - should return 400 with validation error
- [ ] Missing product - should return 400 with validation error
- [ ] Missing country - should return 400 with validation error
- [ ] Missing message - should return 400 with validation error
- [ ] Missing recaptcha token - should return 400 with "reCAPTCHA verification failed"
- [ ] Invalid recaptcha token - should return 400 with "reCAPTCHA verification failed"
- [ ] Valid submission - should return 200 with success message and send email

#### Careers Form API (`/api/contact/careers`)
- [ ] Missing firstName - should return 400 with validation error
- [ ] Missing department - should return 400 with validation error
- [ ] Message < 10 characters - should return 400 with validation error
- [ ] Upload > 3 files - should return 400 with "Maximum 3 files allowed"
- [ ] File > 10MB - should return 400 with file size error
- [ ] Invalid file type - should return 400 with file type error
- [ ] Missing recaptcha token - should return 400 with "reCAPTCHA verification failed"
- [ ] Valid submission with files - should return 200 and send email with attachments
- [ ] Valid submission without files - should return 200 and send email

#### Support Form API (`/api/contact/support`)
- [ ] Missing firstName - should return 400 with validation error
- [ ] Missing issueType - should return 400 with validation error
- [ ] Missing product - should return 400 with validation error
- [ ] Message < 10 characters - should return 400 with validation error
- [ ] Upload > 5 files - should return 400 with "Maximum 5 files allowed"
- [ ] File > 10MB - should return 400 with file size error
- [ ] Invalid file type - should return 400 with file type error
- [ ] Missing recaptcha token - should return 400 with "reCAPTCHA verification failed"
- [ ] Valid submission with files - should return 200 and send email with attachments
- [ ] Valid submission without files - should return 200 and send email

### Email Configuration Tests

#### Sales Form
- [ ] Verify `SALES_EMAIL_USER` is set
- [ ] Verify `SALES_EMAIL_PASSWORD` is set
- [ ] Verify `SALES_RECIPIENT_EMAIL` is set
- [ ] Submit valid form and verify email is received at `SALES_RECIPIENT_EMAIL`
- [ ] Verify email is sent from `SALES_EMAIL_USER`
- [ ] Verify reply-to is set to form submitter's email

#### Careers Form
- [ ] Verify `CAREERS_EMAIL_USER` is set
- [ ] Verify `CAREERS_EMAIL_PASSWORD` is set
- [ ] Verify `CAREERS_RECIPIENT_EMAIL` is set
- [ ] Submit valid form and verify email is received at `CAREERS_RECIPIENT_EMAIL`
- [ ] Verify email is sent from `CAREERS_EMAIL_USER`
- [ ] Verify reply-to is set to form submitter's email
- [ ] Verify attachments are included in email

#### Support Form
- [ ] Verify `SUPPORT_EMAIL_USER` is set
- [ ] Verify `SUPPORT_EMAIL_PASSWORD` is set
- [ ] Verify `SUPPORT_RECIPIENT_EMAIL` is set
- [ ] Submit valid form and verify email is received at `SUPPORT_RECIPIENT_EMAIL`
- [ ] Verify email is sent from `SUPPORT_EMAIL_USER`
- [ ] Verify reply-to is set to form submitter's email
- [ ] Verify attachments are included in email

### Error Handling Tests

- [ ] Missing environment variables - should show appropriate error message
- [ ] Network error - should display error message to user
- [ ] Server error (500) - should display user-friendly error message
- [ ] reCAPTCHA failure - should reset reCAPTCHA and allow retry
- [ ] Form submission error - should not clear form data (allow retry)

### Success Flow Tests

- [ ] Successful submission shows success message
- [ ] Form resets after successful submission
- [ ] reCAPTCHA resets after successful submission
- [ ] Page scrolls to top after successful submission
- [ ] Success message allows submitting another form

## How to Test

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to each form page:**
   - Sales: `http://localhost:3000/contact/sales`
   - Careers: `http://localhost:3000/contact/careers`
   - Support: `http://localhost:3000/contact/support`

3. **Test client-side validation:**
   - Try submitting empty forms
   - Try invalid inputs for each field
   - Verify error messages appear correctly

4. **Test server-side validation:**
   - Use browser DevTools Network tab to inspect API responses
   - Try bypassing client-side validation by directly calling API routes
   - Verify proper error responses

5. **Test email sending:**
   - Submit valid forms with real email addresses
   - Check recipient inboxes for emails
   - Verify email content and formatting

6. **Check console logs:**
   - Monitor server console for any errors
   - Check browser console for client-side errors

## Known Issues Fixed

- ✅ Sales API route was missing - now created
- ✅ Support form client-side file validation (max 3) didn't match server (max 5) - fixed to max 5
- ✅ All routes now use distinct environment variables for email credentials

## Notes

- Client-side validation provides immediate feedback
- Server-side validation ensures security and data integrity
- reCAPTCHA verification happens server-side only
- File uploads are validated both client-side (prevent invalid files) and server-side (security)
