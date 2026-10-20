import { ChevronIcon, DiscordIcon, TelegramIcon, WspIcon } from "../components/icons";
import { socials, type SocialLink } from "../lib/social";
import "../components/social.css";

function IconFor({ name }: { name: string }) {
  if (name === "Discord") return <DiscordIcon width="22" height="22" />;
  if (name === "Telegram") return <TelegramIcon width="22" height="22" />;
  return <WspIcon width="22" height="22" />;
}

function SocialCard({ s }: { s: SocialLink }) {
  return (
    <a className="social-link" href={s.url} target="_blank" rel="noreferrer">
      <span className="social-ico" aria-hidden="true">
        <IconFor name={s.name} />
      </span>
      <span className="social-meta">
        <p className="social-name">{s.name}</p>
        <p className="social-handle">{s.handle}</p>
        <p className="social-desc">{s.description}</p>
      </span>
      <ChevronIcon className="social-arrow" width="18" height="18" />
    </a>
  );
}

export function Social() {
  return (
    <div className="social-page">
      <section className="social-inner">
        <p className="social-eyebrow">elsewhere</p>
        <h2 className="social-title">social</h2>
        <p className="social-sub">find me around the web</p>

        <div className="social-list">
          {socials.map((s) => (
            <SocialCard key={s.url} s={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
