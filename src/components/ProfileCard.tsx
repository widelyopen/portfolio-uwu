import { config } from "../config";
import type { ConnectionState } from "../hooks/useLanyard";
import {
  STATUS_LABEL,
  avatarUrl,
  emojiUrl,
  type Activity,
  type LanyardData,
} from "../lib/lanyard";
import { ActivityRow, SpotifyCard } from "./Activities";

function platformLabel(d: LanyardData): string {
  const where = [
    d.active_on_discord_desktop && "desktop",
    d.active_on_discord_mobile && "mobile",
    d.active_on_discord_web && "web",
  ].filter(Boolean);
  return where.length ? ` on ${where.join(" and ")}` : "";
}

function CustomStatus({ activity }: { activity: Activity }) {
  const e = activity.emoji;
  const url = e ? emojiUrl(e) : null;
  return (
    <p className="custom-status">
      {e && (url ? <img src={url} alt={e.name} /> : <span aria-hidden="true">{e.name}</span>)}
      {activity.state}
    </p>
  );
}

export function ProfileCard({
  data,
  state,
}: {
  data: LanyardData | null;
  state: ConnectionState;
}) {
  const status = data?.discord_status ?? "offline";
  const custom = data?.activities.find((a) => a.type === 4);
  const others =
    data?.activities.filter((a) => a.type !== 4 && !(a.type === 2 && a.name === "Spotify")) ?? [];
  const showSpotify = data?.listening_to_spotify && data.spotify;
  const hasActivity = others.length > 0 || showSpotify;

  const name = data?.discord_user.global_name ?? config.name;
  const username = data?.discord_user.username;

  return (
    <article className="card" aria-label="Live Discord status">
      <div
        className="card-banner"
        style={config.banner ? { backgroundImage: `url(${config.banner})` } : undefined}
      />

      <div className="card-head">
        <div className="avatar">
          {data ? (
            <img src={avatarUrl(data.discord_user)} alt="" />
          ) : (
            <div className="avatar-empty" />
          )}
          <span className="status-dot" data-status={status} />
        </div>
        <div className="identity">
          <h1>{name}</h1>
          {username && <p className="handle">{username}</p>}
        </div>
      </div>

      <p className="tagline">{config.tagline}</p>

      <div className="card-body">
        {state === "missing" && !data && (
          <p className="notice">
            Lanyard can't see this account yet. Join discord.gg/lanyard with it, check the ID in
            src/config.ts, then reload.
          </p>
        )}
        {state === "connecting" && !data && <p className="notice">Connecting to Discord.</p>}

        {data && (
          <>
            <p className="presence">
              <span className="status-dot inline" data-status={status} />
              {STATUS_LABEL[status]}
              {status !== "offline" && platformLabel(data)}
            </p>
            {custom && <CustomStatus activity={custom} />}
            {showSpotify && data.spotify && <SpotifyCard spotify={data.spotify} />}
            {others.map((a) => (
              <ActivityRow key={a.id} activity={a} />
            ))}
            {!hasActivity && !custom && status !== "offline" && (
              <p className="notice">Not doing anything on Discord right now.</p>
            )}
          </>
        )}
      </div>
    </article>
  );
}
