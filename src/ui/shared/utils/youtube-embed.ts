const YOUTUBE_EMBED_HOST = /youtube\.com|youtube-nocookie\.com/i;

export function isYouTubeEmbedUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return YOUTUBE_EMBED_HOST.test(u.hostname) && u.pathname.includes("/embed/");
  } catch {
    return false;
  }
}

/**
 * Normalizes youtu.be, /watch?v=, or embed URLs to a standard youtube.com/embed/… URL
 * (preserves existing query string on embed URLs).
 */
export function youTubeUrlToEmbedUrl(url: string): string {
  const trimmed = url.trim();
  try {
    const u = new URL(trimmed);
    if (YOUTUBE_EMBED_HOST.test(u.hostname) && u.pathname.includes("/embed/")) {
      return trimmed;
    }
    if (
      (u.hostname === "www.youtube.com" || u.hostname === "youtube.com" || u.hostname === "m.youtube.com") &&
      (u.pathname === "/watch" || u.pathname === "/watch/")
    ) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    /* ignore */
  }
  return trimmed;
}

/**
 * For YouTube embeds, merge params after the user clicks play (autoplay, playsinline).
 * Also applies modestbranding / rel / iv_load_policy when not set.
 */
export function prepareEmbedSrc(url: string): string {
  const embedUrl = youTubeUrlToEmbedUrl(url);
  if (!isYouTubeEmbedUrl(embedUrl)) return embedUrl;
  try {
    const u = new URL(embedUrl);
    u.searchParams.set("autoplay", "1");
    u.searchParams.set("playsinline", "1");
    if (!u.searchParams.has("modestbranding")) u.searchParams.set("modestbranding", "1");
    if (!u.searchParams.has("rel")) u.searchParams.set("rel", "0");
    if (!u.searchParams.has("iv_load_policy")) u.searchParams.set("iv_load_policy", "3");
    return u.toString();
  } catch {
    return embedUrl;
  }
}
