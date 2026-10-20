import { useEffect, useState } from "react";
import { ChevronIcon, DiscordIcon, TelegramIcon, WspIcon } from "../components/icons";
import { useSocialBanner } from "../hooks/useSocialBanner";
import { socials, type SocialLink } from "../lib/social";
import "../components/social.css";

function IconFor({ name }: { name: string }) {
  if (name === "Discord") return <DiscordIcon width="26" height="26" />;
  if (name === "Telegram") return <TelegramIcon width="26" height="26" />;
  return <WspIcon width="26" height="26" />;
}

function SocialCard({ s }: { s: SocialLink }) {
  const banner = useSocialBanner(s);
  const [broken, setBroken] = useState(false);
  const showImg = banner && !broken;

  useEffect(() => {
    setBroken(false);
  }, [banner?.url]);

  return (
    <article className="social-card">
      <div
        className="social-shot"
        data-accent={s.accent}
        data-fit={showImg ? banner.fit : undefined}
      >
        {showImg ? (
          <img src={banner.url} alt="" loading="lazy" onError={() => setBroken(true)} />
        ) : (
          <div className="social-shot-ph" aria-hidden="true">
            {s.name}
          </div>
        )}
      </div>

      <div className="social-info">
        <h3 className="social-card-title">
          <IconFor name={s.name} />
          {s.name}
        </h3>
        <p className="social-card-handle">{s.handle}</p>
        <p className="social-card-desc">{s.description}</p>
        <div className="social-card-links">
          <a className="social-open" href={s.url} target="_blank" rel="noreferrer">
            open
            <ChevronIcon width="16" height="16" />
          </a>
        </div>
      </div>
    </article>
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
          {socials.map((link) => (
            <SocialCard key={link.url} s={link} />
          ))}
        </div>
      </section>
    </div>
  );
}
