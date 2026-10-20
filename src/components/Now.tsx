import type { LanyardData } from "../lib/lanyard";
import { ActivityRow, SpotifyBlock } from "./Activities";

export function Now({ data }: { data: LanyardData | null }) {
  const others =
    data?.activities.filter((a) => a.type !== 4 && !(a.type === 2 && a.name === "Spotify")) ?? [];
  const spotify = data?.listening_to_spotify ? data.spotify : null;
  const empty = !spotify && others.length === 0;

  return (
    <section className="now">
      <h2>// right now</h2>
      {spotify && <SpotifyBlock spotify={spotify} />}
      {others.map((a) => (
        <ActivityRow key={a.id} activity={a} />
      ))}
      {empty && <p className="muted">Nothing playing, nothing running.</p>}
    </section>
  );
}
