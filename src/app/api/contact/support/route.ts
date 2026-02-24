/**
 * Support Contact Form API Route
 *
 * Handles POST requests from the support request form at /contact/support.
 * Validates form data, verifies reCAPTCHA, processes file attachments (screenshots, videos, etc.),
 * and sends formatted email notifications with attachments to the support team.
 *
 * @route /api/contact/support
 * @method POST
 */

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { EMAIL_HEADER_BANNER_URL } from "../email-config";
import {
  firstNameSchema,
  lastNameSchema,
  emailSchema,
  phoneSchema,
  messageSchema,
  recaptchaSchema,
} from "@/ui/shared/validation/contact";

/**
 * Server-side validation schema for support form submission.
 */
const supportFormSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  message: messageSchema,
  recaptcha: recaptchaSchema,
});

/**
 * Verifies reCAPTCHA token with Google's API.
 * Prevents spam and bot submissions.
 *
 * @param token - reCAPTCHA token from client-side form submission
 * @returns true if token is valid, false otherwise
 */
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY not configured");
    return false;
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

/**
 * Creates and configures Nodemailer transporter for sending emails.
 * Uses Microsoft 365 (Outlook) SMTP with credentials from environment variables.
 *
 * @returns Configured Nodemailer transporter
 * @throws Error if email credentials are not configured
 */
function createTransporter() {
  const emailUser = process.env.SUPPORT_EMAIL_USER;
  const emailPassword = process.env.SUPPORT_EMAIL_PASSWORD;

  if (!emailUser || !emailPassword) {
    throw new Error("Email credentials not configured");
  }

  return nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });
}

/**
 * POST handler for support contact form submissions.
 *
 * Process flow:
 * 1. Parse multipart form data (includes file uploads)
 * 2. Extract and validate form fields
 * 3. Verify reCAPTCHA token
 * 4. Process file attachments (screenshots, videos, examples)
 * 5. Validate file types, sizes, and count (max 5 files)
 * 6. Generate HTML email template with attachment info
 * 7. Send email with attachments to support team
 * 8. Return success/error response
 *
 * @param request - Incoming request with form data and file uploads
 * @returns JSON response with success status or error details
 */
export async function POST(request: Request) {
  try {
    // Parse multipart form data from request (includes file uploads)
    let formData;
    try {
      formData = await request.formData();
    } catch (err) {
      console.error("Error parsing form data:", err);
      throw err;
    }

    // Extract form fields
    let data;
    try {
      data = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        message: formData.get("message") as string,
        recaptcha: formData.get("recaptcha") as string,
      };
    } catch (err) {
      console.error("Error extracting form fields:", err);
      throw err;
    }

    // Server-side validation
    const validationResult = supportFormSchema.safeParse(data);
    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error.issues);
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    let isRecaptchaValid;
    try {
      isRecaptchaValid = await verifyRecaptcha(data.recaptcha);
    } catch (err) {
      console.error("Error verifying reCAPTCHA:", err);
      throw err;
    }
    if (!isRecaptchaValid) {
      console.error("reCAPTCHA verification failed for token:", data.recaptcha);
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
    }

    // Extract files
    let files, attachments;
    try {
      files = formData.getAll("files") as File[];
      attachments = [];
    } catch (err) {
      console.error("Error extracting files:", err);
      throw err;
    }

    // Validate file count (max 5 files allowed for support form)
    if (files.length > 5) {
      console.error("Too many files uploaded:", files.length);
      return NextResponse.json({ error: "Maximum 5 files allowed" }, { status: 400 });
    }

    // Process files (convert to buffer for nodemailer)
    for (const file of files) {
      if (file.size === 0) continue; // Skip empty files

      // Validate file size (10MB max per file)
      if (file.size > 10 * 1024 * 1024) {
        console.error(`File ${file.name} exceeds 10MB limit`);
        return NextResponse.json(
          { error: `File ${file.name} exceeds 10MB limit` },
          { status: 400 }
        );
      }

      // Validate file type - allow images, videos, and PDFs for support requests
      // Accepted: JPG, PNG, MP4, MOV, PDF
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "video/mp4",
        "video/quicktime",
        "application/pdf",
      ];

      if (!allowedTypes.includes(file.type)) {
        console.error(`File type ${file.type} not allowed`);
        return NextResponse.json({ error: `File type ${file.type} not allowed` }, { status: 400 });
      }

      let buffer;
      try {
        buffer = Buffer.from(await file.arrayBuffer());
      } catch (err) {
        console.error(`Error converting file ${file.name} to buffer:`, err);
        throw err;
      }
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // Create email transporter
    let transporter;
    try {
      transporter = createTransporter();
    } catch (err) {
      console.error("Error creating email transporter:", err);
      throw err;
    }

    // Prepare email content
    let emailHtml;
    try {
      // Escape HTML to prevent XSS
      const escapeHtml = (text: string) => {
        return text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      };

      const formatMessage = (text: string) => {
        return escapeHtml(text).replace(/\n/g, "<br>");
      };

      emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Support Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; line-height: 1.6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px 0;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-collapse: collapse; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <!-- Header banner -->
          <tr>
            <td style="width: 100%; height: auto; aspect-ratio: 16/9;">
              <img src="${EMAIL_HEADER_BANNER_URL}" alt="K-Lab" style="width: 100%; height: auto; margin: 0 auto; border: 0; aspect-ratio: 16/9;" />
            </td>
          </tr>

          <!-- Title Section -->
          <tr>
            <td style="padding: 30px 30px 20px 30px; text-align: center; border-bottom: 2px solid #f0f0f0;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 600; color: #0a0a0a; letter-spacing: -0.02em;">New Support Request</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; color: #666666; font-weight: 300;">A customer needs assistance</p>
            </td>
          </tr>

          <!-- Content Section -->
          <tr>
            <td style="padding: 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                ${
                  (data.firstName?.trim() || data.lastName?.trim())
                    ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <strong style="color: #0a0a0a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 5px;">Full Name</strong>
                    <span style="color: #333333; font-size: 16px;">${escapeHtml(
                      data.firstName ?? ""
                    )} ${escapeHtml(data.lastName ?? "")}</span>
                  </td>
                </tr>
                `
                    : ""
                }
                ${
                  data.email?.trim()
                    ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <strong style="color: #0a0a0a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 5px;">Email</strong>
                    <a href="mailto:${escapeHtml(
                      data.email
                    )}" style="color: #f37120; font-size: 16px; text-decoration: none;">${escapeHtml(
                      data.email
                    )}</a>
                  </td>
                </tr>
                `
                    : ""
                }
                ${
                  data.phone?.trim()
                    ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <strong style="color: #0a0a0a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 5px;">Phone</strong>
                    <a href="tel:${escapeHtml(
                      data.phone
                    )}" style="color: #333333; font-size: 16px; text-decoration: none;">${escapeHtml(
                      data.phone
                    )}</a>
                  </td>
                </tr>
                `
                    : ""
                }
              </table>

              ${
                data.message?.trim()
                  ? `
              <div style="background-color: #fafafa; border-left: 4px solid #f37120; padding: 20px; margin: 25px 0; border-radius: 4px;">
                <strong style="color: #0a0a0a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 12px;">Message</strong>
                <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${formatMessage(
                    data.message
                  )}</p>
              </div>
              `
                  : ""
              }

              ${
                attachments.length > 0
                  ? `<div style="background-color: #fafafa; padding: 15px 20px; border-radius: 4px; margin-top: 20px;">
                      <strong style="color: #0a0a0a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">Attachments</strong>
                      <p style="margin: 0; color: #666666; font-size: 14px;">${attachments.length} file(s) attached to this email</p>
                    </div>`
                  : ""
              }
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 20px 30px; text-align: center; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0; font-size: 12px; color: #999999; line-height: 1.5;">
                This email was automatically generated from the KLab Support contact form.<br>
                Please reply directly to this email to assist the customer.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;
    } catch (err) {
      console.error("Error preparing email HTML:", err);
      throw err;
    }

    // Send email
    const recipientEmail = process.env.SUPPORT_RECIPIENT_EMAIL;
    try {
      await transporter.sendMail({
        from: process.env.SUPPORT_EMAIL_USER,
        to: recipientEmail,
        subject: "New Support Request",
        html: emailHtml,
        replyTo: data.email,
        attachments: attachments,
      });
    } catch (err) {
      console.error("Error sending email:", err);
      throw err;
    }

    return NextResponse.json(
      { success: true, message: "Support request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Support form submission error:", error);
    return NextResponse.json(
      {
        error: "Failed to submit support request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
