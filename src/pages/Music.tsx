import { useState } from "react";
import { Thumb } from "../components/Thumb";
import { useLastfm, type Item } from "../hooks/useLastfm";
import "../components/music.css";

type Tab = "albums" | "tracks" | "favourite" | "stats";
const TABS: { id: Tab; label: string }[] = [
  { id: "albums", label: "Albums" },
  { id: "tracks", label: "Tracks" },
  { id: "favourite", label: "Favourite" },
  { id: "stats", label: "Stats" },
];

const nf = new Intl.NumberFormat("en");

function TrackList({ items, showPlays }: { items: Item[]; showPlays: boolean }) {
  if (items.length === 0) return <p className="music-empty">Nothing here yet.</p>;
  return (
    <ol className="rows">
      {items.map((t, i) => (
        <li key={t.url || t.name + i}>
          <a href={t.url} target="_blank" rel="noreferrer">
            <span className="rank">{i + 1}</span>
            <Thumb artist={t.artist} track={t.name} />
            <span className="txt">
              <b>{t.name}</b>
              <i>{t.artist}</i>
            </span>
            {showPlays && t.plays !== null && <span className="plays">{nf.format(t.plays)} plays</span>}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function Music() {
  const { data, error } = useLastfm();
  const [tab, setTab] = useState<Tab>("albums");

  return (
    <div className="page-scroll">
      <section className="music" id="music">
        <div className="music-inner">
          <p className="eyebrow">my taste</p>
          <h2 className="music-title">music</h2>
          <p className="music-sub">what's been on repeat for the past month</p>

          <div className="tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                className={tab === t.id ? "on" : ""}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {error && <p className="music-empty">{error}</p>}

          {!error && tab === "albums" && (
            <div className="covers">
              {data
                ? data.albums.map((a, i) => (
                    <a
                      className="cover"
                      key={a.url || a.name + i}
                      href={a.url}
                      target="_blank"
                      rel="noreferrer"
                      title={`${a.name} - ${a.artist}`}
                    >
                      {a.image ? (
                        <img src={a.image} alt={a.name} loading="lazy" />
                      ) : (
                        <span className="noart">{a.name}</span>
                      )}
                      <span className="cap">
                        <b>{a.name}</b>
                        <i>{a.artist}</i>
                      </span>
                    </a>
                  ))
                : Array.from({ length: 12 }, (_, i) => <div className="cover skel" key={i} />)}
            </div>
          )}

          {!error && tab === "tracks" && data && <TrackList items={data.tracks} showPlays />}
          {!error && tab === "favourite" && data && <TrackList items={data.loved} showPlays={false} />}

          {!error && tab === "stats" && data && (
            <>
              <div className="stat-grid">
                <div className="stat">
                  <b>{nf.format(data.stats.scrobbles)}</b>
                  <i>scrobbles</i>
                </div>
                <div className="stat">
                  <b>{nf.format(data.stats.artists)}</b>
                  <i>artists</i>
                </div>
                <div className="stat">
                  <b>{nf.format(data.stats.albums)}</b>
                  <i>albums</i>
                </div>
                <div className="stat">
                  <b>{nf.format(data.stats.tracks)}</b>
                  <i>tracks</i>
                </div>
              </div>
              {data.stats.since && (
                <p className="music-sub since">
                  scrobbling since {new Date(data.stats.since * 1000).getFullYear()}
                </p>
              )}
              <h3 className="mini">top artists this month</h3>
              <ol className="rows">
                {data.stats.topArtists.map((a, i) => (
                  <li key={a.url || a.name}>
                    <a href={a.url} target="_blank" rel="noreferrer">
                      <span className="rank">{i + 1}</span>
                      <Thumb artist={a.name} round />
                      <span className="txt">
                        <b>{a.name}</b>
                      </span>
                      <span className="plays">{nf.format(a.plays)} plays</span>
                    </a>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
