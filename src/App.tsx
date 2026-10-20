import { useEffect } from "react";
import { config } from "./config";
import { useLanyard } from "./hooks/useLanyard";
import { useProfile } from "./hooks/useProfile";
import { Backdrop } from "./components/Backdrop";
import { GridBackground } from "./components/GridBackground";
import { Who } from "./components/Who";
import { Now } from "./components/Now";

export default function App() {
  const { data, state } = useLanyard(config.discordId);
  const profile = useProfile(config.discordId, config.banner);

  useEffect(() => {
    document.documentElement.dataset.status = data?.discord_status ?? "offline";
  }, [data?.discord_status]);

  const art = data?.listening_to_spotify ? (data.spotify?.album_art_url ?? null) : null;

  return (
    <>
      <Backdrop banner={profile.banner} art={art} />
      <GridBackground />
      <main className="layout">
        <Who data={data} state={state} badges={profile.badges} />
        <div className="feed">
          <Now data={data} />
          <section className="work">
            <h2>// projects</h2>
            <ul>
              {config.projects.map((p) => {
                const inner = (
                  <>
                    <span className="work-name">{p.name}</span>
                    <span className="work-desc">{p.description}</span>
                    <span className="work-tags muted small">{p.tags.join(", ")}</span>
                  </>
                );
                return (
                  <li key={p.name}>
                    {p.href ? (
                      <a className="work-row" href={p.href} target="_blank" rel="noreferrer">
                        {inner}
                      </a>
                    ) : (
                      <div className="work-row">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
