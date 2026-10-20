// Cover art and artist photos from Deezer's public search API (no key needed).
// Deezer doesn't send CORS headers, so requests go through JSONP (a script tag).

let counter = 0;

function jsonp<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const name = `__dz_${Date.now()}_${counter++}`;
    const w = window as unknown as Record<string, unknown>;
    const script = document.createElement("script");
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error("timeout"));
    }, 8000);
    function cleanup() {
      window.clearTimeout(timer);
      delete w[name];
      script.remove();
    }
    w[name] = (data: T) => {
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error("failed"));
    };
    script.src = `${url}&output=jsonp&callback=${name}`;
    document.head.appendChild(script);
  });
}

type TrackHit = { data?: Array<{ album?: { cover_big?: string; cover_medium?: string } }> };
type ArtistHit = { data?: Array<{ picture_big?: string; picture_medium?: string }> };

const cache = new Map<string, Promise<string | null>>();

function memo(key: string, make: () => Promise<string | null>): Promise<string | null> {
  const hit = cache.get(key);
  if (hit) return hit;
  const p = make().catch(() => null);
  cache.set(key, p);
  return p;
}

async function searchTrack(q: string): Promise<string | null> {
  const r = await jsonp<TrackHit>(
    `https://api.deezer.com/search/track?q=${encodeURIComponent(q)}&limit=1`,
  );
  const album = r.data?.[0]?.album;
  return album?.cover_big ?? album?.cover_medium ?? null;
}

export function trackCover(artist: string, track: string): Promise<string | null> {
  return memo(`t|${artist}|${track}`, async () => {
    const exact = await searchTrack(`artist:"${artist}" track:"${track}"`);
    return exact ?? searchTrack(`${artist} ${track}`);
  });
}

export function artistImage(artist: string): Promise<string | null> {
  return memo(`a|${artist}`, async () => {
    const r = await jsonp<ArtistHit>(
      `https://api.deezer.com/search/artist?q=${encodeURIComponent(artist)}&limit=1`,
    );
    const hit = r.data?.[0];
    const url = hit?.picture_big ?? hit?.picture_medium ?? null;
    // Deezer's "no photo" placeholder has an empty hash in the path
    if (!url || url.includes("/artist//")) return null;
    return url;
  });
}
