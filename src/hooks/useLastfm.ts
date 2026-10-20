import { useEffect, useState } from "react";
import { lastfm } from "../lastfmConfig";

export type Item = {
  name: string;
  artist: string;
  url: string;
  image: string | null;
  plays: number | null;
};

export type TopArtist = { name: string; url: string; plays: number };

export type Stats = {
  scrobbles: number;
  artists: number;
  albums: number;
  tracks: number;
  since: number | null; // unix seconds
  topArtists: TopArtist[];
};

export type MusicData = {
  albums: Item[];
  tracks: Item[];
  loved: Item[];
  stats: Stats;
};

// Last.fm returns one of these star images when it has no real cover.
const PLACEHOLDERS = [
  "2a96cbd8b46e442fc41c2b86b9fce40e", // old star
  "c6f59c1e5e7240a4c0d427abd71f3dbb", // current star
];

async function call(method: string, extra: Record<string, string> = {}) {
  const params = new URLSearchParams({
    method,
    user: lastfm.user,
    api_key: lastfm.apiKey,
    format: "json",
    ...extra,
  });
  const res = await fetch(`https://ws.audioscrobbler.com/2.0/?${params.toString()}`);
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(json.message ?? `Last.fm error ${res.status}`);
  return json;
}

function pickImage(images: Array<{ "#text"?: string }> | undefined): string | null {
  if (!images || images.length === 0) return null;
  const src = images[images.length - 1]?.["#text"];
  if (!src || PLACEHOLDERS.some((h) => src.includes(h))) return null;
  return src;
}

function toItem(x: any): Item {
  const n = x.playcount !== undefined ? Number(x.playcount) : NaN;
  return {
    name: String(x.name ?? ""),
    artist: String(x.artist?.name ?? x.artist?.["#text"] ?? ""),
    url: String(x.url ?? ""),
    image: pickImage(x.image),
    plays: Number.isFinite(n) ? n : null,
  };
}

export function useLastfm() {
  const [data, setData] = useState<MusicData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lastfm.apiKey.startsWith("YOUR_") || lastfm.user.startsWith("YOUR_")) {
      setError("Add your Last.fm username and API key in src/lastfmConfig.ts.");
      return;
    }

    let cancelled = false;
    const period = lastfm.period;

    Promise.all([
      call("user.gettopalbums", { period, limit: String(lastfm.albumCount) }),
      call("user.gettoptracks", { period, limit: String(lastfm.trackCount) }),
      call("user.getlovedtracks", { limit: String(lastfm.trackCount) }),
      call("user.gettopartists", { period, limit: "5" }),
      call("user.getinfo"),
    ])
      .then(([albums, tracks, loved, artists, info]) => {
        if (cancelled) return;
        const u = info.user ?? {};
        const since = Number(u.registered?.unixtime);
        setData({
          albums: (albums.topalbums?.album ?? []).map(toItem),
          tracks: (tracks.toptracks?.track ?? []).map(toItem),
          loved: (loved.lovedtracks?.track ?? []).map(toItem),
          stats: {
            scrobbles: Number(u.playcount ?? 0),
            artists: Number(u.artist_count ?? 0),
            albums: Number(u.album_count ?? 0),
            tracks: Number(u.track_count ?? 0),
            since: Number.isFinite(since) ? since : null,
            topArtists: (artists.topartists?.artist ?? []).map((a: any) => ({
              name: String(a.name ?? ""),
              url: String(a.url ?? ""),
              plays: Number(a.playcount ?? 0),
            })),
          },
        });
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Couldn't reach Last.fm.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, error };
}
