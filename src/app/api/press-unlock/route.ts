/**
 * Press Unlock API Route
 *
 * Verifies the supplied password against PRESS_PASSWORD (fallback: 1010).
 * The check is done server-side so the secret stays out of client code.
 *
 * @route /api/press-unlock
 * @method POST
 */

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const supplied = typeof body?.password === "string" ? body.password : "";
    const secret = process.env.PRESS_PASSWORD || "1010";

    if (!secret) {
      return NextResponse.json({ message: "Server not configured" }, { status: 500 });
    }

    if (supplied === secret) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ message: "Invalid password. Please try again." }, { status: 401 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
