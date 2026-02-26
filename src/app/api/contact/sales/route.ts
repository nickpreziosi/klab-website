/**
 * Sales Contact Form API Route
 *
 * Handles POST requests from the sales contact form at /contact/sales.
 * Validates form data, verifies reCAPTCHA, and sends formatted email notifications.
 *
 * @route /api/contact/sales
 * @method POST
 */

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { EMAIL_HEADER_BANNER_URL, SALES_FROM } from "../email-config";
import {
  firstNameSchema,
  lastNameSchema,
  emailSchema,
  phoneSchema,
  messageSchema,
  recaptchaSchema,
} from "@/ui/shared/validation/contact";

/**
 * Server-side validation schema for sales form submission.
 */
const salesFormSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  company: z.string().optional(),
  position: z.string().optional(),
  companyWebsite: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        const domainOrUrlPattern =
          /^((https?:\/\/)?(www\.)?)?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+([\/?#].*)?$/;
        return domainOrUrlPattern.test(val);
      },
      {
        message: "Please enter a valid domain (example.com) or URL (https://example.com)",
      }
    ),
  companyType: z.string().optional(),
  product: z.string().optional(),
  country: z.string().min(1, "Country is required"),
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
  const emailUser = process.env.NEXT_PUBLIC_EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

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
 * POST handler for sales contact form submissions.
 *
 * Process flow:
 * 1. Parse multipart form data
 * 2. Extract and validate form fields
 * 3. Verify reCAPTCHA token
 * 4. Generate HTML email template
 * 5. Send email to sales team
 * 6. Return success/error response
 *
 * @param request - Incoming request with form data
 * @returns JSON response with success status or error details
 */
export async function POST(request: Request) {
  try {
    // Parse multipart form data from request
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
        firstName: (formData.get("firstName") as string) ?? "",
        lastName: (formData.get("lastName") as string) ?? "",
        email: (formData.get("email") as string) ?? "",
        phone: (formData.get("phone") as string) ?? "",
        company: (formData.get("company") as string) ?? "",
        position: (formData.get("position") as string) ?? "",
        companyWebsite: (formData.get("companyWebsite") as string) ?? "",
        companyType: (formData.get("companyType") as string) ?? "",
        product: (formData.get("product") as string) ?? "",
        country: (formData.get("country") as string) ?? "",
        message: (formData.get("message") as string) ?? "",
        recaptcha: (formData.get("recaptcha") as string) ?? "",
      };
    } catch (err) {
      console.error("Error extracting form fields:", err);
      throw err;
    }

    // Server-side validation
    const validationResult = salesFormSchema.safeParse(data);
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
      /**
       * Escapes HTML special characters to prevent XSS attacks.
       * Used when injecting user input into email HTML templates.
       */
      const escapeHtml = (text: string) => {
        return text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      };

      /**
       * Formats message text for HTML display.
       * Escapes HTML and converts newlines to <br> tags.
       */
      const formatMessage = (text: string) => {
        return escapeHtml(text).replace(/\n/g, "<br>");
      };

      /**
       * Formats company type by replacing hyphens with spaces and capitalizing words.
       * Example: "technology-electronics" -> "Technology Electronics"
       */
      const formatCompanyType = (type: string) => {
        return type.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      };

      /**
       * Ensures URL has a protocol prefix for proper link functionality.
       * Adds https:// if protocol is missing (e.g., "example.com" -> "https://example.com").
       */
      const ensureUrlProtocol = (url: string) => {
        if (!/^https?:\/\//i.test(url)) {
          return `https://${url}`;
        }
        return url;
      };

      emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Sales Inquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; line-height: 1.6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px 0;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-collapse: collapse; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <!-- Header banner (URL from SITE_URL via email-config) -->
          <tr>
            <td style="width: 100%; height: auto; aspect-ratio: 16/9;">
              <img src="${EMAIL_HEADER_BANNER_URL}" alt="K-Lab" style="width: 100%; height: auto; margin: 0 auto; border: 0; aspect-ratio: 16/9;" />
            </td>
          </tr>

          <!-- Title Section -->
          <tr>
            <td style="padding: 30px 30px 20px 30px; text-align: center; border-bottom: 2px solid #f0f0f0;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 600; color: #0a0a0a; letter-spacing: -0.02em;">New Sales Inquiry</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; color: #666666; font-weight: 300;">A potential customer is interested in our products</p>
            </td>
          </tr>

          <!-- Content Section -->
          <tr>
            <td style="padding: 30px;">
              <!-- Contact Information (each row only if value present) -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                ${
                  data.firstName?.trim() || data.lastName?.trim()
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
                ${
                  data.position?.trim()
                    ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <strong style="color: #0a0a0a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 5px;">Position</strong>
                    <span style="color: #333333; font-size: 16px;">${escapeHtml(
                      data.position
                    )}</span>
                  </td>
                </tr>
                `
                    : ""
                }
                ${
                  data.company?.trim()
                    ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <strong style="color: #0a0a0a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 5px;">Company</strong>
                    <span style="color: #333333; font-size: 16px;">${escapeHtml(
                      data.company
                    )}</span>
                  </td>
                </tr>
                `
                    : ""
                }
                ${
                  data.companyWebsite?.trim()
                    ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <strong style="color: #0a0a0a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 5px;">Company Website</strong>
                    <a href="${escapeHtml(
                      ensureUrlProtocol(data.companyWebsite)
                    )}" target="_blank" rel="noopener noreferrer" style="color: #f37120; font-size: 16px; text-decoration: none;">${escapeHtml(
                      data.companyWebsite
                    )}</a>
                  </td>
                </tr>
                `
                    : ""
                }
                ${
                  data.companyType?.trim()
                    ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <strong style="color: #0a0a0a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 5px;">Company Type</strong>
                    <span style="color: #333333; font-size: 16px;">${escapeHtml(
                      formatCompanyType(data.companyType)
                    )}</span>
                  </td>
                </tr>
                `
                    : ""
                }
                ${
                  data.product?.trim()
                    ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <strong style="color: #0a0a0a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 5px;">Product of Interest</strong>
                    <span style="color: #333333; font-size: 16px;">${escapeHtml(
                      data.product === "krails"
                        ? "K Rails"
                        : data.product === "kena"
                          ? "Kena"
                          : data.product
                    )}</span>
                  </td>
                </tr>
                `
                    : ""
                }
                ${
                  data.country?.trim()
                    ? `
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #0a0a0a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 5px;">Country</strong>
                    <span style="color: #333333; font-size: 16px;">${escapeHtml(
                      data.country
                    )}</span>
                  </td>
                </tr>
                `
                    : ""
                }
              </table>

              <!-- Message (only if present) -->
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
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 20px 30px; text-align: center; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0; font-size: 12px; color: #999999; line-height: 1.5;">
                This email was automatically generated from the KLab Sales contact form.<br>
                Please reply directly to this email to follow up with the customer.
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

    // Send email to sales team
    const recipientEmail = process.env.NEXT_PUBLIC_SALES_RECIPIENT_EMAIL;
    if (!recipientEmail) {
      console.error("No sales recipient: NEXT_PUBLIC_SALES_RECIPIENT_EMAIL is unset");
      return NextResponse.json({ error: "Email delivery not configured" }, { status: 503 });
    }
    try {
      await transporter.sendMail({
        from: SALES_FROM,
        to: recipientEmail,
        subject: `New Sales Inquiry - ${data.company?.trim() || data.email || "Inquiry"}`,
        html: emailHtml,
        replyTo: data.email,
      });
    } catch (err) {
      console.error("Error sending email:", err);
      throw err;
    }

    return NextResponse.json(
      { success: true, message: "Inquiry submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Sales form submission error:", message, error);
    return NextResponse.json(
      {
        error: "Failed to submit inquiry",
        details: process.env.NODE_ENV === "development" ? message : undefined,
      },
      { status: 500 }
    );
  }
}
