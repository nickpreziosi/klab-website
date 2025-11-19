import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Server-side validation schema
const careersFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(2, "Phone number is required"),
  company: z.string().optional(),
  title: z.string().optional(),
  position: z.string().optional(),
  department: z.string().min(1, "Please select a department"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  recaptcha: z.string().min(1, "Please complete the reCAPTCHA verification"),
});

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY not configured");
    return false;
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

// Create email transporter
function createTransporter() {
  // Using Gmail as an example. Configure based on your email provider
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

  if (!emailUser || !emailPassword) {
    throw new Error("Email credentials not configured");
  }

  return nodemailer.createTransport({
    service: "gmail", // or use host/port for other providers
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });
}

export async function POST(request: Request) {
  try {
    // Parse multipart form data
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
        company: (formData.get("company") as string) || undefined,
        title: (formData.get("title") as string) || undefined,
        position: (formData.get("position") as string) || undefined,
        department: formData.get("department") as string,
        message: formData.get("message") as string,
        recaptcha: formData.get("recaptcha") as string,
      };
    } catch (err) {
      console.error("Error extracting form fields:", err);
      throw err;
    }

    // Server-side validation
    const validationResult = careersFormSchema.safeParse(data);
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
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
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

    // Validate file count and size
    if (files.length > 3) {
      console.error("Too many files uploaded:", files.length);
      return NextResponse.json(
        { error: "Maximum 3 files allowed" },
        { status: 400 }
      );
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

      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      if (!allowedTypes.includes(file.type)) {
        console.error(`File type ${file.type} not allowed`);
        return NextResponse.json(
          { error: `File type ${file.type} not allowed` },
          { status: 400 }
        );
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
      emailHtml = `
        <h2>New Careers Form Submission</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        ${
          data.company
            ? `<p><strong>Current Company:</strong> ${data.company}</p>`
            : ""
        }
        ${
          data.title
            ? `<p><strong>Current Title:</strong> ${data.title}</p>`
            : ""
        }
        ${
          data.position
            ? `<p><strong>Position of Interest:</strong> ${data.position}</p>`
            : ""
        }
        <p><strong>Department:</strong> ${data.department}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
        ${
          attachments.length > 0
            ? `<p><strong>Attachments:</strong> ${attachments.length} file(s)</p>`
            : ""
        }
      `;
    } catch (err) {
      console.error("Error preparing email HTML:", err);
      throw err;
    }

    // Send email
    const recipientEmail =
      process.env.CAREERS_RECIPIENT_EMAIL || process.env.EMAIL_USER;
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: `New Career Application - ${data.firstName} ${data.lastName}`,
        html: emailHtml,
        replyTo: data.email,
        attachments: attachments,
      });
    } catch (err) {
      console.error("Error sending email:", err);
      throw err;
    }

    return NextResponse.json(
      { success: true, message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Careers form submission error:", error);
    return NextResponse.json(
      {
        error: "Failed to submit application",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
