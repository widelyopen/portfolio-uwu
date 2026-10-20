import { config } from "../config";
import type { ConnectionState } from "../hooks/useLanyard";
import type { Badge } from "../lib/badges";
import { STATUS_LABEL, avatarUrl, emojiUrl, type LanyardData } from "../lib/lanyard";

function where(d: LanyardData): string {
  const list = [
    d.active_on_discord_desktop && "desktop",
    d.active_on_discord_mobile && "mobile",
    d.active_on_discord_web && "web",
  ].filter(Boolean);
  return list.length ? ` on ${list.join(" and ")}` : "";
}

export function Profile({
  data,
  state,
  badges,
}: {
  data: LanyardData | null;
  state: ConnectionState;
  badges: Badge[];
}) {
  const status = data?.discord_status ?? "offline";
  const custom = data?.activities.find((a) => a.type === 4);
  const emojiSrc = custom?.emoji ? emojiUrl(custom.emoji) : null;

  return (
    <section className="profile">
      <div className="avatar" data-status={status}>
        {data ? <img src={avatarUrl(data.discord_user)} alt="" /> : null}
      </div>

      <h1 className="name">{config.heading}</h1>

      <p className="presence">
        <span className="dot" data-status={status} />
        {STATUS_LABEL[status]}
        {status !== "offline" && data ? where(data) : ""}
      </p>

      {custom && (
        <p className="custom">
          {custom.emoji &&
            (emojiSrc ? <img src={emojiSrc} alt={custom.emoji.name} /> : custom.emoji.name + " ")}
          {custom.state}
        </p>
      )}

      {badges.length > 0 && (
        <ul className="badges">
          {badges.map((b) => (
            <li key={b.icon}>
              <img src={b.icon} alt={b.label} title={b.label} />
            </li>
          ))}
        </ul>
      )}

      {state === "missing" && !data && (
        <p className="notice">
          Lanyard can't see this account. Join discord.gg/lanyard with it and check the ID in
          src/config.ts. Add ?demo to the URL to preview.
        </p>
      )}
      {state === "connecting" && !data && <p className="notice">Connecting to Discord.</p>}
    </section>
  );
}
