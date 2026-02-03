/**
 * Kena Unlock API Route
 *
 * Handles password verification for password-protected sections of the Kena AI page.
 * This API route verifies the supplied password against the KENA_PASSWORD environment variable.
 * The password check is done server-side to keep the secret out of client code.
 *
 * @route /api/kena-unlock
 * @method POST
 *
 * @example
 * POST /api/kena-unlock
 * Body: { "password": "secret-password" }
 * Response: { "ok": true } or { "message": "Invalid password..." }
 */

import { NextResponse } from "next/server";

/**
 * POST handler for password verification.
 * Compares supplied password with KENA_PASSWORD environment variable.
 *
 * @param request - Incoming request with password in JSON body
 * @returns JSON response with success status or error message
 */
export async function POST(request: Request) {
  try {
    // Parse request body, defaulting to empty object if JSON parsing fails
    const body = await request.json().catch(() => ({}));
    const supplied = typeof body?.password === "string" ? body.password : "";

    // Get secret password from environment variable
    // Must be set in .env.local for local dev or environment variables for production
    const secret = process.env.KENA_PASSWORD || "";

    // Return error if password is not configured
    if (!secret) {
      return NextResponse.json({ message: "Server not configured" }, { status: 500 });
    }

    // Server-side password verification - secret is never exposed to client
    if (supplied === secret) {
      return NextResponse.json({ ok: true });
    }

    // Password mismatch - return unauthorized error
    return NextResponse.json({ message: "Invalid password. Please try again." }, { status: 401 });
  } catch (e) {
    // Handle any unexpected errors
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
