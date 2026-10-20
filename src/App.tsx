import { useEffect } from "react";
import { config } from "./config";
import { useLanyard } from "./hooks/useLanyard";
import { ProfileCard } from "./components/ProfileCard";

export default function App() {
  const { data, state } = useLanyard(config.discordId);

  useEffect(() => {
    document.documentElement.dataset.status = data?.discord_status ?? "offline";
  }, [data?.discord_status]);

  return (
    <main className="page">
      <ProfileCard data={data} state={state} />

      <section className="block">
        <h2>About</h2>
        {config.about.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <ul className="stack">
          {config.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="block">
        <h2>Projects</h2>
        <ul className="projects">
          {config.projects.map((p) => (
            <li key={p.name}>
              <div className="project-main">
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noreferrer">
                    {p.name}
                  </a>
                ) : (
                  <span className="project-name">{p.name}</span>
                )}
                <p>{p.description}</p>
              </div>
              <ul className="tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="block">
        <h2>Elsewhere</h2>
        <ul className="links">
          {config.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
