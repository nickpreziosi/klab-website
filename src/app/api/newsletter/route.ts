/**
 * Newsletter Subscription API Route
 *
 * Handles POST requests to subscribe users to the KEO newsletter via HubSpot.
 * Validates email, checks for existing contacts, and adds to newsletter list.
 *
 * @route /api/newsletter
 * @method POST
 */

import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Server-side validation schema for newsletter subscription.
 */
const newsletterSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

/**
 * POST handler for newsletter subscription.
 *
 * Process flow:
 * 1. Parse and validate email from request body
 * 2. Create or update contact in HubSpot
 * 3. Return success/error response
 *
 * @param request - Incoming request with email
 * @returns JSON response with success status or error details
 */
export async function POST(request: Request) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    // Server-side validation
    const validationResult = newsletterSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // Get HubSpot API key from environment
    const hubspotApiKey = process.env.HUBSPOT_API_KEY;
    if (!hubspotApiKey || hubspotApiKey === "your_hubspot_api_key_here") {
      console.error("HUBSPOT_API_KEY not configured or still set to placeholder value");
      return NextResponse.json({ error: "Newsletter service not configured" }, { status: 500 });
    }

    // Create or update contact in HubSpot
    // Using the HubSpot Contacts API v3
    const hubspotResponse = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${hubspotApiKey}`,
      },
      body: JSON.stringify({
        properties: {
          email: email,
          hs_lead_status: "NEW",
          lifecyclestage: "subscriber",
        },
      }),
    });

    // Handle HubSpot response
    if (hubspotResponse.ok) {
      return NextResponse.json(
        { success: true, message: "Successfully subscribed to newsletter!" },
        { status: 200 }
      );
    }

    // Check if contact already exists (409 Conflict)
    if (hubspotResponse.status === 409) {
      // Contact exists, try to update instead
      const errorData = await hubspotResponse.json();
      const existingContactId = errorData?.message?.match(/ID: (\d+)/)?.[1];

      if (existingContactId) {
        // Update existing contact to ensure they're subscribed
        const updateResponse = await fetch(
          `https://api.hubapi.com/crm/v3/objects/contacts/${existingContactId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${hubspotApiKey}`,
            },
            body: JSON.stringify({
              properties: {
                lifecyclestage: "subscriber",
              },
            }),
          }
        );

        if (updateResponse.ok) {
          return NextResponse.json(
            { success: true, message: "You're already subscribed!" },
            { status: 200 }
          );
        }
      }

      // Even if update fails, the contact exists so they're subscribed
      return NextResponse.json(
        { success: true, message: "You're already subscribed!" },
        { status: 200 }
      );
    }

    // Log error for debugging
    const errorText = await hubspotResponse.text();
    console.error("HubSpot API error:", hubspotResponse.status, errorText);

    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      {
        error: "Failed to subscribe",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
