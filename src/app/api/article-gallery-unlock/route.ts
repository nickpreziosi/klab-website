import { NextResponse } from "next/server";
import { getInternationalArticleGalleryPassword } from "@/sanity/queries/articles";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const supplied = typeof body?.password === "string" ? body.password : "";
    const slug = typeof body?.slug === "string" ? body.slug : "";

    if (!slug) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const article = await getInternationalArticleGalleryPassword(slug);

    if (!article?.galleryPassword) {
      return NextResponse.json({ message: "Gallery is not password protected" }, { status: 400 });
    }

    if (supplied === article.galleryPassword) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ message: "Invalid password. Please try again." }, { status: 401 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
