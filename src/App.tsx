import { useEffect } from "react";
import { config } from "./config";
import { useLanyard } from "./hooks/useLanyard";
import { useBadges } from "./hooks/useProfile";
import { flagBadges } from "./lib/badges";
import { Profile } from "./components/Profile";
import { Music } from "./components/Music";

export default function App() {
  const { data, state } = useLanyard(config.discordId);
  const profileBadges = useBadges(config.discordId);
  const badges = profileBadges.length
    ? profileBadges
    : flagBadges(data?.discord_user.public_flags ?? 0);

  useEffect(() => {
    document.documentElement.dataset.status = data?.discord_status ?? "offline";
  }, [data?.discord_status]);

  return (
    <>
      <main className="stage">
        <Profile data={data} state={state} badges={badges} />
        <a className="scroll-hint" href="#music">
          <span>scroll</span>
          <span aria-hidden="true">↓</span>
        </a>
      </main>
      <Music />
    </>
  );
}