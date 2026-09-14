const APPLE_PODCAST_HOSTS = new Set([
  "podcasts.apple.com",
  "embed.podcasts.apple.com",
  "itunes.apple.com",
  "geo.itunes.apple.com",
]);

/** Official Apple episode player height (compact bar). */
export const APPLE_PODCAST_EPISODE_HEIGHT = 175;
/** Official Apple large show player height (artwork + episode list). */
export const APPLE_PODCAST_SHOW_HEIGHT = 450;

function hostnameIsApplePodcast(hostname: string): boolean {
  return APPLE_PODCAST_HOSTS.has(hostname.replace(/^www\./, "").toLowerCase());
}

/** Accept a share URL or Apple's full iframe embed markup. */
function extractPossibleUrl(input: string): string {
  const trimmed = input.trim();
  if (trimmed.startsWith("<")) {
    const match =
      trimmed.match(/\ssrc\s*=\s*["']([^"']+)["']/i) ||
      trimmed.match(/\ssrc\s*=\s*([^\s>]+)/i);
    if (match?.[1]) return match[1];
  }
  return trimmed;
}

export function isApplePodcastUrl(input?: string | null): boolean {
  if (!input) return false;
  const url = extractPossibleUrl(input);
  try {
    const parsed = new URL(url);
    if (!hostnameIsApplePodcast(parsed.hostname)) return false;
    return parsed.pathname.includes("/podcast") || parsed.hostname.includes("podcasts.apple.com");
  } catch {
    return /(?:embed\.)?podcasts\.apple\.com/i.test(url);
  }
}

export function isApplePodcastEpisode(input?: string | null): boolean {
  if (!input) return false;
  const url = extractPossibleUrl(input);
  try {
    return new URL(url).searchParams.has("i");
  } catch {
    return /[?&]i=\d+/.test(url);
  }
}

/** Show ID from `/id1234567890` in Apple Podcasts URLs. */
export function extractApplePodcastShowId(input?: string | null): string | undefined {
  if (!input) return undefined;
  const match = extractPossibleUrl(input).match(/\/id(\d+)/);
  return match?.[1];
}

/**
 * Converts Apple Podcasts share URLs (and copied iframe markup) to
 * `https://embed.podcasts.apple.com/...` for use as an iframe src.
 */
export function applePodcastUrlToEmbedUrl(input: string): string | null {
  if (!isApplePodcastUrl(input)) return null;
  const url = extractPossibleUrl(input);
  try {
    const parsed = new URL(url);
    parsed.protocol = "https:";
    parsed.hostname = "embed.podcasts.apple.com";
    return parsed.toString();
  } catch {
    return null;
  }
}

/** Large show player: artwork + episode list (strips episode `i=` so Apple uses the show layout). */
export function applePodcastUrlToLargeEmbedUrl(input: string): string | null {
  const embedUrl = applePodcastUrlToEmbedUrl(input);
  if (!embedUrl) return null;
  try {
    const parsed = new URL(embedUrl);
    parsed.searchParams.delete("i");
    return parsed.toString();
  } catch {
    return embedUrl;
  }
}

export function applePodcastEmbedHeight(input?: string | null): number {
  return isApplePodcastEpisode(input) ? APPLE_PODCAST_EPISODE_HEIGHT : APPLE_PODCAST_SHOW_HEIGHT;
}
