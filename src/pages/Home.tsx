import { Profile } from "../components/Profile";
import type { ConnectionState } from "../hooks/useLanyard";
import type { Badge } from "../lib/badges";
import type { LanyardData } from "../lib/lanyard";

export function Home({
  data,
  state,
  badges,
}: {
  data: LanyardData | null;
  state: ConnectionState;
  badges: Badge[];
}) {
  return (
    <main className="stage">
      <Profile data={data} state={state} badges={badges} />
    </main>
  );
}
