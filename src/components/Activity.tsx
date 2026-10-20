import { useEffect, useState } from "react";
import "./activity.css";

// Loose local shape for the Lanyard fields used here, so this file doesn't depend
// on what src/lib/lanyard.ts already types. Matches Lanyard's REST/WebSocket payload.
type Spotify = {
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  track_id: string;
  timestamps: { start: number; end: number };
};

type Act = {
  type: number;
  name: string;
  details?: string;
  state?: string;
  application_id?: string;
  timestamps?: { start?: number; end?: number };
  assets?: { large_image?: string; large_text?: string };
};

type Props = {
  // pass the same `data` object App already gets from useLanyard
  data: { spotify?: Spotify | null; activities: Act[] } | null;
};

function fmt(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function elapsed(ms: number): string {
  const m = Math.max(0, Math.floor(ms / 60000));
  if (m < 60) return `${m}m`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

// Discord activity images: "mp:external/..." proxies, or raw app asset ids.
function activityImage(a: Act): string | null {
  const img = a.assets?.large_image;
  if (!img) return null;
  if (img.startsWith("mp:external/")) {
    return "https://media.discordapp.net/external/" + img.slice("mp:external/".length);
  }
  if (img.startsWith("mp:")) return `https://media.discordapp.net/${img.slice(3)}`;
  if (a.application_id) {
    return `https://cdn.discordapp.com/app-assets/${a.application_id}/${img}.png`;
  }
  return null;
}

export function Activity({ data }: Props) {
  // tick once a second so the Spotify bar and "playing for" timers move
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const spotify = data?.spotify ?? null;
  // type 0 = Playing; skip Spotify (type 2) since it gets its own card, and custom status (4)
  const playing = (data?.activities ?? []).filter((a) => a.type === 0);

  const total = spotify ? spotify.timestamps.end - spotify.timestamps.start : 0;
  const pos = spotify ? Math.min(Math.max(now - spotify.timestamps.start, 0), total) : 0;
  const pct = total > 0 ? (pos / total) * 100 : 0;

  return (
    <section className="activity" id="activity">
      <h2 className="activity-title">right now</h2>

      {!spotify && playing.length === 0 && (
        <p className="activity-empty">Nothing going on at the moment.</p>
      )}

      <div className="activity-grid">
        {spotify && (
          <a
            className="card spotify"
            href={`https://open.spotify.com/track/${spotify.track_id}`}
            target="_blank"
            rel="noreferrer"
          >
            <img className="art" src={spotify.album_art_url} alt="" />
            <div className="meta">
              <span className="tag">Listening to Spotify</span>
              <strong className="song">{spotify.song}</strong>
              <span className="sub">by {spotify.artist.split(";").join(", ")}</span>
              <span className="sub">on {spotify.album}</span>
              <div className="bar" aria-hidden="true">
                <i style={{ width: `${pct}%` }} />
              </div>
              <div className="times">
                <span>{fmt(pos)}</span>
                <span>{fmt(total)}</span>
              </div>
            </div>
          </a>
        )}

        {playing.map((a) => {
          const img = activityImage(a);
          const start = a.timestamps?.start;
          return (
            <div className="card game" key={a.name + (a.application_id ?? "")}>
              {img ? <img className="art" src={img} alt="" /> : <div className="art ph" />}
              <div className="meta">
                <span className="tag">Playing</span>
                <strong className="song">{a.name}</strong>
                {a.details && <span className="sub">{a.details}</span>}
                {a.state && <span className="sub">{a.state}</span>}
                {start ? <span className="sub dim">for {elapsed(now - start)}</span> : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
