import { NextResponse } from "next/server";

/**
 * Server API route: verify the supplied password against an env var.
 * Set the secret in your environment as KENA_PASSWORD (for local dev, use .env.local).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const supplied = typeof body?.password === "string" ? body.password : "";

    const secret = process.env.KENA_PASSWORD || "";

    if (!secret) {
      return NextResponse.json(
        { message: "Server not configured" },
        { status: 500 }
      );
    }

    // Basic equality check. This API runs server-side so the secret isn't in client code.
    if (supplied === secret) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { message: "Invalid password. Please try again." },
      { status: 401 }
    );
  } catch (e) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
