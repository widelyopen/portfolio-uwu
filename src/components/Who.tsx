import { config } from "../config";
import type { ConnectionState } from "../hooks/useLanyard";
import type { Badge } from "../hooks/useProfile";
import { STATUS_LABEL, avatarUrl, emojiUrl, type LanyardData } from "../lib/lanyard";

function where(d: LanyardData): string {
  const list = [
    d.active_on_discord_desktop && "desktop",
    d.active_on_discord_mobile && "mobile",
    d.active_on_discord_web && "web",
  ].filter(Boolean);
  return list.length ? ` on ${list.join(" and ")}` : "";
}

export function Who({
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
    <aside className="who">
      <div className="who-top">
        <div className="avatar" data-status={status}>
          {data ? <img src={avatarUrl(data.discord_user)} alt="" /> : null}
        </div>
        <div>
          <p className="presence">
            <span className="dot" data-status={status} />
            {STATUS_LABEL[status].toLowerCase()}
            {status !== "offline" && data ? where(data) : ""}
          </p>
          {custom && (
            <p className="custom">
              {custom.emoji &&
                (emojiSrc ? <img src={emojiSrc} alt={custom.emoji.name} /> : custom.emoji.name + " ")}
              {custom.state}
            </p>
          )}
        </div>
      </div>

      <h1 className="name">{data?.discord_user.global_name ?? config.name}</h1>
      <p className="tagline">{config.tagline}</p>

      {state === "missing" && !data && (
        <p className="notice">
          Lanyard can't see this account. Join discord.gg/lanyard with it and check the ID in
          src/config.ts. Add ?demo to the URL to preview the layout.
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

      {config.about.map((p) => (
        <p className="about" key={p}>
          {p}
        </p>
      ))}

      <p className="stack">{config.stack.join(", ")}</p>

      <ul className="links">
        {config.links.map((l) => (
          <li key={l.label}>
            <a href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
