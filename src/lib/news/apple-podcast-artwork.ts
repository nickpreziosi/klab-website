import {
  extractApplePodcastShowId,
  isApplePodcastUrl,
} from "@/ui/shared/utils/apple-podcast-embed";

type ItunesLookupResponse = {
  results?: Array<{
    artworkUrl600?: string;
    artworkUrl100?: string;
  }>;
};

function toHttps(url: string): string {
  return url.replace(/^http:\/\//i, "https://");
}

function sizedItunesArtwork(url: string, size: number): string {
  return url.replace(/\/\d+x\d+bb(\.[a-z]+)$/i, `/${size}x${size}bb$1`);
}

/**
 * Resolves Apple Podcasts cover art via the iTunes lookup API.
 * Cached for a day so listing pages don't re-fetch on every request.
 */
export async function getApplePodcastArtworkUrl(
  embedLink?: string | null,
  size: 600 | 1200 = 600
): Promise<string | undefined> {
  if (!embedLink || !isApplePodcastUrl(embedLink)) return undefined;
  const showId = extractApplePodcastShowId(embedLink);
  if (!showId) return undefined;

  try {
    const res = await fetch(`https://itunes.apple.com/lookup?id=${showId}`, {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return undefined;
    const data = (await res.json()) as ItunesLookupResponse;
    const artwork = data.results?.[0]?.artworkUrl600 || data.results?.[0]?.artworkUrl100;
    if (!artwork) return undefined;
    return sizedItunesArtwork(toHttps(artwork), size);
  } catch {
    return undefined;
  }
}
